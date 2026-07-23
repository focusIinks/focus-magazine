import { NextResponse } from "next/server";
import { loadTokens, isTokenExpired, getSessionInfo } from "@/lib/openai-oauth";

export async function GET() {
  try {
    const tokens = loadTokens();
    if (!tokens) return NextResponse.json({ authenticated: false });
    if (isTokenExpired()) return NextResponse.json({ authenticated: false, expired: true });
    const session = await getSessionInfo().catch(() => ({}));
    return NextResponse.json({ authenticated: true, session });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
