import { NextRequest } from "next/server";
import { proxyChatRequest, proxyResponsesRequest } from "@/lib/openai-oauth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { model, messages, stream, temperature, max_tokens, useResponsesApi } = body;

    if (!model || !messages) {
      return new Response(JSON.stringify({ error: "model and messages required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    let upstream: Response;

    if (useResponsesApi) {
      upstream = await proxyResponsesRequest({
        model,
        input: messages,
        stream: stream ?? true,
        temperature,
        max_output_tokens: max_tokens,
      });
    } else {
      upstream = await proxyChatRequest({
        model,
        messages,
        stream: stream ?? true,
        temperature,
        max_tokens,
      });
    }

    // If upstream is not OK, return error
    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => "Unknown error");
      return new Response(
        JSON.stringify({ error: errText, status: upstream.status }),
        { status: upstream.status, headers: { "Content-Type": "application/json" } }
      );
    }

    // Stream the response back
    if (stream) {
      return new Response(upstream.body, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    // Non-streaming
    const data = await upstream.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Internal server error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
