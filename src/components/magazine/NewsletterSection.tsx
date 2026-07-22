"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Check, Mail } from "lucide-react";
import { toast } from "sonner";

const features = [
  "Weekly curated clinical digest",
  "Peer-reviewed insights only",
  "Unsubscribe in one click",
];

const avatarSeeds = ["dr-chen", "dr-patel", "dr-sanchez", "dr-okonkwo"];

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
      className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-primary to-teal-950"
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Heading */}
          <h2 className="font-editorial text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Informed
          </h2>

          {/* Subheading */}
          <p className="text-white/70 font-body text-lg leading-relaxed mb-8 max-w-lg mx-auto">
            Every week, the most important developments in optometry — distilled,
            contextualized, and delivered to your inbox.
          </p>

          {/* Email form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-8"
          >
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border border-white/20 text-white placeholder:text-white/50 h-12 px-5 focus-visible:ring-white/30 focus-visible:border-white/40 focus-visible:ring-offset-0 rounded-none flex-1"
            />
            <button
              type="submit"
              disabled={submitted}
              className="bg-white text-primary-foreground font-semibold text-sm uppercase tracking-wider px-8 h-12 hover:bg-white/90 transition-colors duration-200 disabled:opacity-70 rounded-none shrink-0"
            >
              {submitted ? "Subscribed" : "Subscribe"}
            </button>
          </form>

          {/* Success animation */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="flex justify-center mb-4"
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

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="flex -space-x-2">
              {avatarSeeds.map((seed) => (
                <div
                  key={seed}
                  className="w-8 h-8 rounded-full border-2 border-primary bg-white/15 flex items-center justify-center overflow-hidden"
                >
                  <span className="text-[10px] font-bold text-white/80 uppercase">
                    {seed.split("-")[1]?.[0] ?? "D"}
                  </span>
                </div>
              ))}
            </div>
            <span className="text-white/60 text-sm font-body">
              Joined by{" "}
              <span className="text-white/90 font-semibold">15,000+</span>{" "}
              optometrists
            </span>
          </motion.div>

          {/* Feature bullets */}
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-white/70 text-sm font-body"
          >
            {features.map((text) => (
              <li key={text} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white/50 shrink-0" />
                <span>{text}</span>
              </li>
            ))}
          </motion.ul>

          {/* Privacy note */}
          <p className="text-white/30 text-xs font-body mt-8">
            By subscribing you agree to our Privacy Policy
          </p>
        </motion.div>
      </div>
    </section>
  );
}