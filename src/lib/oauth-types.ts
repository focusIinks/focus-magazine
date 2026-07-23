// Shared types — safe for client & server

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
}

export interface SessionInfo {
  accountId?: string;
  email?: string;
  plan?: string;
}

export interface ModelInfo {
  id: string;
  name?: string;
  created?: number;
  object?: string;
  owned_by?: string;
}

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export const OAUTH_CONFIG = {
  clientId: "app_EMoamEEZ73f0CkXaXp7hrann",
  tokenUrl: "https://auth.openai.com/oauth/token",
  authorizeUrl: "https://auth.openai.com/authorize",
  codexBaseUrl: "https://chatgpt.com/backend-api/codex",
  scope: "openid profile email offline_access",
  audience: "https://api.openai.com/v1",
} as const;
