import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens } from "@/lib/openai-oauth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(new URL(`/?error=${encodeURIComponent(error)}`, request.url));
  }

  if (!code || !state) {
    return NextResponse.redirect(new URL("/?error=missing_params", request.url));
  }

  // Verify state to prevent CSRF
  const storedState = request.cookies.get("oauth_state")?.value;
  if (!storedState || storedState !== state) {
    return NextResponse.redirect(new URL("/?error=invalid_state", request.url));
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
  const redirectUri = `${baseUrl}/auth/callback`;

  try {
    await exchangeCodeForTokens(code, redirectUri);
    const response = NextResponse.redirect(new URL("/?success=true", request.url));
    response.cookies.set("oauth_state", "", { path: "/", maxAge: 0 });
    return response;
  } catch (err) {
    const msg = err instanceof Error ? err.message : "auth_failed";
    return NextResponse.redirect(new URL(`/?error=${encodeURIComponent(msg)}`, request.url));
  }
}
