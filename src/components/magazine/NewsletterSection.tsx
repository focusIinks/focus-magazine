"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    // Simulate a brief delay for the subscription request
    await new Promise((resolve) => setTimeout(resolve, 800));

    setLoading(false);
    setEmail("");
    toast.success("You're subscribed! Welcome to Focus Magazine.");
  }

  return (
    <section className="bg-primary/5 py-16 md:py-20">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-5 w-5 text-primary" />
        </div>

        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Subscribe to Focus Magazine
        </h2>

        <p className="mt-3 text-muted-foreground">
          Get the latest in optometry research, clinical insights, and practice
          management delivered to your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
        >
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 flex-1 bg-background sm:max-w-xs"
            aria-label="Email address"
            disabled={loading}
          />
          <Button type="submit" size="lg" disabled={loading}>
            {loading ? "Subscribing…" : "Subscribe"}
          </Button>
        </form>

        <p className="mt-4 text-xs text-muted-foreground/70">
          Join 50,000+ optometry professionals. No spam, unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}