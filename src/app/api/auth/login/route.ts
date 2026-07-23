import { NextResponse } from "next/server";
import { buildAuthorizationUrl } from "@/lib/openai-oauth";

function generateState(): string {
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
  const redirectUri = `${baseUrl}/auth/callback`;
  const state = generateState();

  const response = NextResponse.redirect(buildAuthorizationUrl(redirectUri, state));
  response.cookies.set("oauth_state", state, {
    path: "/",
    httpOnly: true,
    maxAge: 600,
    sameSite: "lax",
  });

  return response;
}
