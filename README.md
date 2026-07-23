# AI Free

Free AI with your ChatGPT account. No API key needed. No browser extension required.

## How It Works

AI Free reverse-engineers the OpenAI OAuth flow used by Codex CLI to let you use your ChatGPT account (free or paid) to access GPT models through a beautiful web interface.

Based on [openai-oauth](https://github.com/EvanZhouDev/openai-oauth) by EvanZhou.

## Key Difference

Unlike the original `openai-oauth`, **AI Free requires NO browser extension**. It runs as a local web app and handles the entire OAuth flow server-side.

## Quick Start

```bash
# Clone the repo
git clone https://github.com/focusIinks/focus-magazine.git
cd focus-magazine

# Install dependencies
bun install

# Start the app
bun dev
```

Then open **http://localhost:3000** in your browser.

## Features

- Sign in with your ChatGPT account (OAuth)
- Access all models available through Codex (GPT-4o, o3, GPT-5, etc.)
- Chat streaming with real-time responses
- Model selector with all available models
- Chat Completions API and Responses API support
- Copy messages, regenerate responses
- Dark theme, beautiful UI
- No API key needed
- No browser extension needed
- Token auto-refresh

## How to Use

1. Run `bun dev` to start the local server
2. Open http://localhost:3000 in your browser
3. Click "Continue with ChatGPT" to sign in
4. Authorize with your ChatGPT account
5. Start chatting with any available model!

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/auth/login` | Start OAuth flow |
| `GET /api/auth/status` | Check auth status |
| `POST /api/auth/logout` | Sign out |
| `GET /api/models` | List available models |
| `POST /api/chat` | Send a chat message (streaming) |
| `POST /api/refresh` | Manually refresh token |

## OpenAI-Compatible

The `/api/chat` endpoint accepts standard OpenAI chat completion format:

```json
{
  "model": "gpt-4o-mini",
  "messages": [{"role": "user", "content": "Hello!"}],
  "stream": true
}
```

You can use it with any OpenAI-compatible client by setting the base URL to `http://localhost:3000/api`.

## Disclaimer

AI Free is an unofficial, community project not affiliated with, endorsed by, or sponsored by OpenAI.

- Uses your ChatGPT credentials — treat them like passwords
- Each person must use their own account
- Do not share or redistribute access tokens
- Comply with OpenAI's Terms of Use and Usage Policies
- OpenAI may change or disable the underlying services at any time

## License

Apache-2.0
