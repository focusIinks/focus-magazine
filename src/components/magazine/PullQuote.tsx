"use client";

import { motion } from "framer-motion";

export default function PullQuote() {
  return (
    <section className="py-16 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative py-8"
        >
          {/* Top divider */}
          <div className="w-16 h-px bg-border mx-auto mb-10" />

          {/* Decorative opening quote mark */}
          <span className="absolute top-4 left-1/2 -translate-x-[120%] md:left-[calc(50%-18rem)] md:translate-x-0 text-8xl text-primary/15 font-serif leading-none select-none pointer-events-none">
            &ldquo;
          </span>

          {/* Quote text */}
          <blockquote className="relative max-w-3xl mx-auto text-center px-4">
            <p className="text-2xl md:text-3xl lg:text-4xl font-light italic text-foreground leading-snug">
              The future of optometry lies not just in treating refractive
              error, but in detecting systemic disease through the eye — the
              only organ where we can directly visualize blood vessels and nerve
              tissue in a living patient.
            </p>
          </blockquote>

          {/* Decorative closing quote mark */}
          <span className="absolute bottom-4 right-1/2 translate-x-[80%] md:right-[calc(50%-18rem)] md:translate-x-0 text-8xl text-primary/15 font-serif leading-none select-none pointer-events-none">
            &rdquo;
          </span>

          {/* Attribution */}
          <p className="text-center text-sm font-semibold text-primary mt-8">
            — Dr. Priya Sharma, Editor-in-Chief, Focus Magazine
          </p>

          {/* Bottom divider */}
          <div className="w-16 h-px bg-border mx-auto mt-10" />
        </motion.div>
      </div>
    </section>
  );
}