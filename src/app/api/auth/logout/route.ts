import { NextResponse } from "next/server";
import { clearTokens } from "@/lib/openai-oauth";

export async function POST() {
  clearTokens();
  const response = NextResponse.json({ success: true });
  response.cookies.set("oauth_state", "", { path: "/", maxAge: 0 });
  return response;
}
