import { NextResponse } from "next/server";
import { fetchModels } from "@/lib/openai-oauth";

export async function GET() {
  try {
    const models = await fetchModels();
    return NextResponse.json({ data: models });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to fetch models";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
