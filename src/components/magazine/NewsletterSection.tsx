"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Mail,
  ArrowRight,
  CheckCircle,
  Shield,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

const features = [
  { icon: CheckCircle, text: "Weekly curated content" },
  { icon: Shield, text: "No spam, ever" },
  { icon: XCircle, text: "Unsubscribe anytime" },
];

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
    toast.success(
      "Welcome aboard! You've been subscribed to Focus Magazine."
    );
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="py-16 md:py-24 magazine-gradient relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 800 400" fill="none">
          <circle
            cx="700"
            cy="50"
            r="180"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-white/20"
          />
          <circle
            cx="100"
            cy="350"
            r="120"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-white/15"
          />
          <ellipse
            cx="400"
            cy="200"
            rx="100"
            ry="50"
            stroke="currentColor"
            strokeWidth="0.3"
            className="text-white/10"
          />
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

          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{
              background: "linear-gradient(to right, #ffffff, #99f6e4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Stay Focused
          </h2>
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            Get the latest in optometry delivered to your inbox. Weekly
            curated content covering clinical advances, practice tips, and
            industry insights.
          </p>

          {/* Feature bullet points */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
            {features.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 text-white/70 text-sm"
              >
                <Icon className="w-4 h-4 text-white/90 shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/50 border-white/30 text-foreground placeholder:text-foreground/40 h-12 px-5 focus-visible:ring-white/30"
            />
            <div className="flex items-center gap-2 shrink-0">
              <Button
                type="submit"
                disabled={submitted}
                className="bg-white text-teal-900 hover:bg-white/90 h-12 px-6 font-semibold shadow-lg"
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
              {/* Animated checkmark after submit */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                    className="w-10 h-10 rounded-full bg-green-500/20 border border-green-400/40 flex items-center justify-center"
                  >
                    <motion.svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-green-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                    >
                      <motion.path d="M5 13l4 4L19 7" />
                    </motion.svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>

          {/* Social proof */}
          <p className="text-white/50 text-xs mt-4">
            Join 12,000+ optometrists &middot; No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}