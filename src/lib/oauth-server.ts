import { writeFileSync, readFileSync, unlinkSync, existsSync } from "fs";
import type { TokenResponse } from "./oauth-types";

let tokenStore: TokenResponse | null = null;
const TOKEN_FILE = "/tmp/ai-free-tokens.json";

export function saveTokens(tokens: TokenResponse) {
  const stored: TokenResponse = {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    expires_at: tokens.expires_at || Math.floor(Date.now() / 1000) + 3500,
  };
  tokenStore = stored;
  try { writeFileSync(TOKEN_FILE, JSON.stringify(stored)); } catch {}
}

export function loadTokens(): TokenResponse | null {
  if (tokenStore) return tokenStore;
  try {
    if (!existsSync(TOKEN_FILE)) return null;
    const data = readFileSync(TOKEN_FILE, "utf-8");
    tokenStore = JSON.parse(data);
    return tokenStore;
  } catch { return null; }
}

export function clearTokens() {
  tokenStore = null;
  try { if (existsSync(TOKEN_FILE)) unlinkSync(TOKEN_FILE); } catch {}
}

export function isTokenExpired(): boolean {
  const tokens = loadTokens();
  if (!tokens) return true;
  const expiresAt = tokens.expires_at || 0;
  return Date.now() / 1000 > (expiresAt - 300);
}
