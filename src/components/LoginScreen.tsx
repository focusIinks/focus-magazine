"use client";

import { useState } from "react";
import {
  Sparkles,
  ExternalLink,
  Shield,
  Zap,
  MessageSquare,
  Bot,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";

interface LoginScreenProps {
  onLogin: () => void;
  error?: string | null;
  success?: boolean;
}

export default function LoginScreen({ onLogin, error, success }: LoginScreenProps) {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      window.location.href = "/api/auth/login";
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 mb-6 shadow-2xl shadow-violet-500/20">
            <Sparkles className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              AI Free
            </span>
          </h1>
          <p className="text-white/40 text-lg">Free AI with your ChatGPT account</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-300 font-medium">Sign in failed</p>
              <p className="text-xs text-red-400/60 mt-1">{decodeURIComponent(error)}</p>
            </div>
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-green-300 font-medium">Successfully signed in!</p>
              <p className="text-xs text-green-400/60 mt-1">Redirecting to chat...</p>
            </div>
          </div>
        )}

        {/* Login card */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold mb-1">Sign in with ChatGPT</h2>
            <p className="text-sm text-white/40">
              Use your existing ChatGPT account to get started
            </p>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 disabled:opacity-50 text-white font-medium transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-violet-500/20"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364l2.0201-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4091-.6765zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0974-2.3616l2.603-1.5018 2.6032 1.5018v3.0036l-2.6032 1.5018-2.603-1.5018z" />
                </svg>
                Continue with ChatGPT
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="mt-6 flex items-center gap-2 text-xs text-white/25">
            <Shield className="w-3.5 h-3.5" />
            <span>Your credentials are stored locally and never shared</span>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {[
            { icon: <Zap className="w-5 h-5" />, title: "No API Key", desc: "Uses OAuth login" },
            { icon: <MessageSquare className="w-5 h-5" />, title: "All Models", desc: "GPT-4o, o3, and more" },
            { icon: <Bot className="w-5 h-5" />, title: "No Extension", desc: "Works in any browser" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] mb-2 text-violet-400">
                {item.icon}
              </div>
              <p className="text-xs font-medium text-white/70">{item.title}</p>
              <p className="text-[10px] text-white/30 mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <a
            href="https://github.com/EvanZhouDev/openai-oauth"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-white/20 hover:text-white/40 transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            Based on openai-oauth by EvanZhou
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
