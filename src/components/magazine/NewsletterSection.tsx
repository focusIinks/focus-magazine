"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubmitted(true);
    toast.success("Welcome aboard! You've been subscribed to Focus Magazine.");
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-16 md:py-24 magazine-gradient relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 800 400" fill="none">
          <circle cx="700" cy="50" r="180" stroke="currentColor" strokeWidth="0.5" className="text-white/20" />
          <circle cx="100" cy="350" r="120" stroke="currentColor" strokeWidth="0.5" className="text-white/15" />
          <ellipse cx="400" cy="200" rx="100" ry="50" stroke="currentColor" strokeWidth="0.3" className="text-white/10" />
        </svg>
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Focused
          </h2>
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            Get the latest in optometry delivered to your inbox. Weekly curated
            content covering clinical advances, practice tips, and industry insights.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12 px-5 focus-visible:ring-white/30"
            />
            <Button
              type="submit"
              disabled={submitted}
              className="bg-white text-teal-900 hover:bg-white/90 h-12 px-6 font-semibold shadow-lg shrink-0"
            >
              {submitted ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Subscribed
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <p className="text-white/50 text-xs mt-4">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}