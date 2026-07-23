"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Send, Bot, User, Loader2, LogOut,
  ChevronDown, Copy, Check, Trash2, RotateCcw,
  Zap, MessageSquare, Sparkles,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  model?: string;
  timestamp: number;
}

interface Model {
  id: string;
  owned_by?: string;
}

interface Props {
  models: Model[];
  onLogout: () => void;
}

export default function ChatInterface({ models, onLogout }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(models[0]?.id || "gpt-4o-mini");
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [useResponsesApi, setUseResponsesApi] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 200) + "px";
    }
  }, [input]);

  useEffect(() => {
    if (models.length > 0 && !models.find(m => m.id === selectedModel)) {
      setSelectedModel(models[0].id);
    }
  }, [models, selectedModel]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
      timestamp: Date.now(),
    };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    const assistantId = crypto.randomUUID();
    setMessages(prev => [...prev, {
      id: assistantId, role: "assistant", content: "",
      model: selectedModel, timestamp: Date.now(),
    }]);

    abortRef.current = new AbortController();
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: selectedModel,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          stream: true, useResponsesApi,
        }),
        signal: abortRef.current.signal,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Request failed" }));
        throw new Error(err.error || `HTTP ${res.status}`);
      }
      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response body");
      const decoder = new TextDecoder();
      let accumulated = "";
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              accumulated += delta;
              setMessages(prev =>
                prev.map(m => m.id === assistantId ? { ...m, content: accumulated } : m)
              );
            }
            if (parsed.type === "response.output_text.delta" && parsed.delta) {
              accumulated += parsed.delta;
              setMessages(prev =>
                prev.map(m => m.id === assistantId ? { ...m, content: accumulated } : m)
              );
            }
            if (parsed.type === "response.completed" && parsed.response?.output) {
              for (const item of parsed.response.output) {
                if (item.type === "message" && item.content) {
                  const text = item.content
                    .filter((c: any) => c.type === "output_text")
                    .map((c: any) => c.text)
                    .join("");
                  if (text) {
                    accumulated = text;
                    setMessages(prev =>
                      prev.map(m => m.id === assistantId ? { ...m, content: text } : m)
                    );
                  }
                }
              }
            }
          } catch {}
        }
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        const errMsg = (err as Error).message || "Something went wrong";
        setMessages(prev =>
          prev.map(m => m.id === assistantId ? { ...m, content: `Error: ${errMsg}` } : m)
        );
      }
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  };

  const handleStop = () => { abortRef.current?.abort(); setIsLoading(false); };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => { if (!isLoading) setMessages([]); };

  const handleRegenerate = (msgId: string) => {
    if (isLoading) return;
    const idx = messages.findIndex(m => m.id === msgId);
    if (idx === -1) return;
    const newMsgs = messages.slice(0, idx);
    setMessages(newMsgs);
    const lastUserMsg = [...newMsgs].reverse().find(m => m.role === "user");
    if (lastUserMsg) setInput(lastUserMsg.content);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const getModelName = (id: string) => id.replace(/^(gpt|o[0-9]|codex)-/, "").replace(/-/g, " ");

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            AI Free
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowModelPicker(!showModelPicker)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="max-w-[200px] truncate">{getModelName(selectedModel)}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {showModelPicker && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-[#1a1a2e] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                <div className="p-2 border-b border-white/10">
                  <p className="text-xs text-white/50 px-2">Select Model</p>
                </div>
                <div className="max-h-80 overflow-y-auto p-1">
                  {models.map(model => (
                    <button
                      key={model.id}
                      onClick={() => { setSelectedModel(model.id); setShowModelPicker(false); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                        selectedModel === model.id ? "bg-violet-500/20 text-violet-300" : "hover:bg-white/5 text-white/80"
                      }`}
                    >
                      <Zap className={`w-3.5 h-3.5 flex-shrink-0 ${selectedModel === model.id ? "text-violet-400" : "text-white/30"}`} />
                      <div className="min-w-0">
                        <p className="truncate">{model.id}</p>
                        {model.owned_by && <p className="text-xs text-white/30">{model.owned_by}</p>}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="p-2 border-t border-white/10">
                  <button
                    onClick={() => setUseResponsesApi(!useResponsesApi)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-white/5 transition-all"
                  >
                    <span className="text-white/60">Use Responses API</span>
                    <div className={`w-9 h-5 rounded-full transition-colors relative ${useResponsesApi ? "bg-violet-500" : "bg-white/20"}`}>
                      <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${useResponsesApi ? "left-[18px]" : "left-0.5"}`} />
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
          <button onClick={handleClear} disabled={isLoading} className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-all disabled:opacity-30" title="Clear chat">
            <Trash2 className="w-4 h-4" />
          </button>
          <button onClick={onLogout} className="p-2 rounded-lg hover:bg-red-500/20 text-white/50 hover:text-red-400 transition-all" title="Sign out">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-violet-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Free AI with your ChatGPT Account</h2>
            <p className="text-white/40 text-center max-w-md mb-8">
              Use your existing ChatGPT account (free or paid) to access GPT models
              through an OpenAI-compatible interface. No API key needed.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl w-full">
              {[
                { icon: <Zap className="w-4 h-4" />, title: "No API Key", desc: "Uses your ChatGPT login" },
                { icon: <MessageSquare className="w-4 h-4" />, title: "All Models", desc: "GPT-4o, GPT-5, o3, and more" },
                { icon: <Bot className="w-4 h-4" />, title: "Open Source", desc: "Apache-2.0 Licensed" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-all">
                  <div className="text-violet-400 mb-2">{item.icon}</div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-white/40 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div className={`group relative max-w-[85%] ${msg.role === "user" ? "order-first" : ""}`}>
                  <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-violet-500/20 border border-violet-500/20 rounded-tr-md"
                      : "bg-white/[0.04] border border-white/[0.06] rounded-tl-md"
                  }`}>
                    {msg.content || (
                      <span className="flex items-center gap-2 text-white/40">
                        <Loader2 className="w-4 h-4 animate-spin" /> Thinking...
                      </span>
                    )}
                  </div>
                  {msg.role === "assistant" && msg.content && !isLoading && (
                    <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleCopy(msg.id, msg.content)} className="p-1 rounded hover:bg-white/10 text-white/30 hover:text-white/60 transition-all" title="Copy">
                        {copiedId === msg.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button onClick={() => handleRegenerate(msg.id)} className="p-1 rounded hover:bg-white/10 text-white/30 hover:text-white/60 transition-all" title="Regenerate">
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {/* Input */}
      <div className="border-t border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-end gap-2 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-4 py-2 focus-within:border-violet-500/30 transition-all">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message AI Free..."
              rows={1}
              className="flex-1 bg-transparent text-sm resize-none outline-none max-h-[200px] py-1 placeholder:text-white/25"
            />
            {isLoading ? (
              <button onClick={handleStop} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/60 transition-all" title="Stop">
                <div className="w-4 h-4 rounded-sm bg-white/60" />
              </button>
            ) : (
              <button onClick={handleSend} disabled={!input.trim()} className="p-2 rounded-xl bg-violet-500 hover:bg-violet-600 disabled:opacity-20 disabled:hover:bg-violet-500 text-white transition-all" title="Send">
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>
          <p className="text-[10px] text-white/20 text-center mt-2">
            AI Free uses your ChatGPT account via OpenAI OAuth. Not affiliated with OpenAI. For personal use only.
          </p>
        </div>
      </div>

      {showModelPicker && <div className="fixed inset-0 z-40" onClick={() => setShowModelPicker(false)} />}
    </div>
  );
}
