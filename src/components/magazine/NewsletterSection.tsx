"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle, Shield, Heart } from "lucide-react";
import { toast } from "sonner";

const features = [
  { icon: CheckCircle, text: "Weekly Digest" },
  { icon: Shield, text: "Zero Spam" },
  { icon: Heart, text: "Free Forever" },
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
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section
      id="newsletter"
      className="py-20 md:py-28 magazine-gradient relative overflow-hidden"
    >
      {/* Watermark */}
      <div className="absolute -right-20 -bottom-10 text-[15rem] font-black text-white/[0.03] tracking-tighter select-none leading-none pointer-events-none">
        FOCUS
      </div>

      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-5 h-5 text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Focused
          </h2>

          {/* Description */}
          <p className="text-white/70 text-lg leading-relaxed mb-8">
            Weekly curated insights on clinical optometry, practice growth, and
            the future of eye care. Trusted by 12,000+ professionals.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {features.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-white/80 text-xs"
              >
                <Icon className="w-3.5 h-3.5 text-white/90 shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* Email Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/15 border border-white/20 text-white placeholder:text-white/40 h-12 px-5 focus-visible:ring-white/30 focus-visible:border-white/40 rounded-none"
            />
            <button
              type="submit"
              disabled={submitted}
              className="bg-white text-teal-900 font-bold text-sm uppercase tracking-wider px-6 h-12 hover:bg-white/90 transition-colors disabled:opacity-70 rounded-none shrink-0"
            >
              {submitted ? "Subscribed" : "Subscribe"}
            </button>
          </form>

          {/* Success Animation */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="mt-6 flex justify-center"
              >
                <div className="w-14 h-14 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                  <motion.svg
                    viewBox="0 0 24 24"
                    className="w-7 h-7 text-white"
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
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Privacy Note */}
          <p className="text-white/40 text-xs mt-4">
            By subscribing you agree to our Privacy Policy
          </p>
        </motion.div>
      </div>
    </section>
  );
}