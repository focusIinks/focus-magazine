import { NextResponse } from "next/server";
import { refreshAccessToken, loadTokens } from "@/lib/openai-oauth";

export async function POST() {
  try {
    const tokens = await refreshAccessToken();
    return NextResponse.json({ success: true, expires_at: tokens.expires_at });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Refresh failed";
    return NextResponse.json({ error: msg }, { status: 401 });
  }
}
