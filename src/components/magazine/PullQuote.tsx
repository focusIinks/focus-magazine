"use client";

import { motion } from "framer-motion";

export default function PullQuote() {
  return (
    <section className="py-20 md:py-28 bg-muted/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-3xl mx-auto"
        >
          {/* Decorative horizontal rule — top */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-px bg-border/60 mx-auto origin-left"
          />

          <div className="py-12 md:py-16">
            {/* Large decorative opening quote mark */}
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="block text-center font-editorial text-8xl md:text-9xl text-primary/20 leading-none select-none -mt-8 mb-2"
              aria-hidden="true"
            >
              &ldquo;
            </motion.span>

            {/* Quote text */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="text-center px-4"
            >
              <p className="font-editorial text-2xl md:text-3xl lg:text-4xl font-medium leading-snug text-foreground">
                The future of optometry lies not just in treating refractive
                error, but in detecting systemic disease through the eye — the
                only organ where we can directly visualize blood vessels and nerve
                tissue in a living patient.
              </p>
            </motion.blockquote>
          </div>

          {/* Attribution with magazine-rule above */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col items-center"
          >
            {/* Thin magazine rule */}
            <div className="w-10 h-px bg-border/60 mb-6" />

            {/* Editorial byline */}
            <p className="font-editorial text-sm tracking-wide uppercase text-muted-foreground">
              — Dr. Priya Sharma
            </p>
            <p className="font-editorial text-xs tracking-wider uppercase text-muted-foreground/70 mt-1">
              Editor-in-Chief, Focus Magazine
            </p>
          </motion.div>

          {/* Decorative horizontal rule — bottom */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-px bg-border/60 mx-auto origin-right mt-8"
          />
        </motion.div>
      </div>
    </section>
  );
}