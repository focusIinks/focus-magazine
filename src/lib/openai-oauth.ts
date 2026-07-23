// ============================================================
// AI Free — OpenAI OAuth Server Library
// SERVER-ONLY: Import only from route.ts files
// ============================================================

import { saveTokens, loadTokens, clearTokens, isTokenExpired } from "./oauth-server";
import { OAUTH_CONFIG } from "./oauth-types";
import type { TokenResponse, SessionInfo, ModelInfo, ChatMessage } from "./oauth-types";

export type { TokenResponse, SessionInfo, ModelInfo, ChatMessage };
export { loadTokens, clearTokens, isTokenExpired };

export function buildAuthorizationUrl(redirectUri: string, state: string): string {
  const params = new URLSearchParams({
    client_id: OAUTH_CONFIG.clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: OAUTH_CONFIG.scope,
    audience: OAUTH_CONFIG.audience,
    state,
    prompt: "login",
  });
  return `${OAUTH_CONFIG.authorizeUrl}?${params.toString()}`;
}

export async function exchangeCodeForTokens(code: string, redirectUri: string): Promise<TokenResponse> {
  const res = await fetch(OAUTH_CONFIG.tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: OAUTH_CONFIG.clientId,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Token exchange failed (${res.status}): ${err}`);
  }
  const data = await res.json();
  const tokens: TokenResponse = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: data.expires_in ? Math.floor(Date.now() / 1000) + data.expires_in : undefined,
  };
  saveTokens(tokens);
  return tokens;
}

export async function refreshAccessToken(): Promise<TokenResponse> {
  const tokens = loadTokens();
  if (!tokens?.refresh_token) throw new Error("No refresh token. Please sign in again.");
  const res = await fetch(OAUTH_CONFIG.tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "refresh_token",
      refresh_token: tokens.refresh_token,
      client_id: OAUTH_CONFIG.clientId,
    }),
  });
  if (!res.ok) {
    clearTokens();
    throw new Error(`Token refresh failed (${res.status}). Please sign in again.`);
  }
  const data = await res.json();
  const newTokens: TokenResponse = {
    access_token: data.access_token,
    refresh_token: data.refresh_token || tokens.refresh_token,
    expires_at: data.expires_in ? Math.floor(Date.now() / 1000) + data.expires_in : undefined,
  };
  saveTokens(newTokens);
  return newTokens;
}

export async function getValidAccessToken(): Promise<string> {
  if (isTokenExpired()) {
    await refreshAccessToken();
  }
  const tokens = loadTokens();
  if (!tokens?.access_token) throw new Error("Not signed in");
  return tokens.access_token;
}

export async function getSessionInfo(): Promise<SessionInfo> {
  const token = await getValidAccessToken();
  try {
    const res = await fetch(`${OAUTH_CONFIG.codexBaseUrl}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) return await res.json();
  } catch {}
  return {};
}

export async function fetchModels(): Promise<ModelInfo[]> {
  const token = await getValidAccessToken();
  const res = await fetch(`${OAUTH_CONFIG.codexBaseUrl}/models`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Failed to fetch models (${res.status})`);
  const data = await res.json();
  return data.data || [];
}

export async function proxyChatRequest(req: {
  model: string;
  messages: ChatMessage[];
  stream?: boolean;
  temperature?: number;
  max_tokens?: number;
}): Promise<Response> {
  const token = await getValidAccessToken();
  const res = await fetch(`${OAUTH_CONFIG.codexBaseUrl}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(req),
  });
  if (res.status === 401) {
    try {
      await refreshAccessToken();
      const newToken = loadTokens()?.access_token;
      return fetch(`${OAUTH_CONFIG.codexBaseUrl}/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${newToken}` },
        body: JSON.stringify(req),
      });
    } catch { clearTokens(); }
  }
  return res;
}

export async function proxyResponsesRequest(req: {
  model: string;
  input: ChatMessage[] | string;
  stream?: boolean;
  temperature?: number;
  max_output_tokens?: number;
}): Promise<Response> {
  const token = await getValidAccessToken();
  const body: Record<string, unknown> = {
    model: req.model,
    input: req.input,
    stream: req.stream ?? false,
  };
  if (req.temperature !== undefined) body.temperature = req.temperature;
  if (req.max_output_tokens !== undefined) body.max_output_tokens = req.max_output_tokens;
  const res = await fetch(`${OAUTH_CONFIG.codexBaseUrl}/responses`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  if (res.status === 401) {
    try {
      await refreshAccessToken();
      const newToken = loadTokens()?.access_token;
      return fetch(`${OAUTH_CONFIG.codexBaseUrl}/responses`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${newToken}` },
        body: JSON.stringify(body),
      });
    } catch { clearTokens(); }
  }
  return res;
}
