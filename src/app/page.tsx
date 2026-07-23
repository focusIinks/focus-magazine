"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LoginScreen from "@/components/LoginScreen";
import ChatInterface from "@/components/ChatInterface";
import { Loader2 } from "lucide-react";

interface Model { id: string; owned_by?: string; }

function AppContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const success = searchParams.get("success") === "true";

  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => { checkAuth(); }, [success]);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/status");
      const data = await res.json();
      if (data.authenticated) {
        setAuthenticated(true);
        try {
          const modelsRes = await fetch("/api/models");
          const modelsData = await modelsRes.json();
          if (modelsData.data) setModels(modelsData.data);
        } catch {
          setModels([{ id: "gpt-4o-mini", owned_by: "openai" }, { id: "gpt-4o", owned_by: "openai" }]);
        }
      } else {
        setAuthenticated(false);
      }
    } catch { setAuthenticated(false); }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuthenticated(false);
    setModels([]);
  };

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-violet-400" />
      </div>
    );
  }

  if (!authenticated) {
    return <LoginScreen onLogin={() => {}} error={error} success={success} />;
  }

  return <ChatInterface models={models} onLogout={handleLogout} />;
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-violet-400" />
      </div>
    }>
      <AppContent />
    </Suspense>
  );
}
