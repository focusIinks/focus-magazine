"use client";

import { motion } from "framer-motion";
import { Eye, ArrowRight } from "lucide-react";

export default function EditorialBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full relative overflow-hidden bg-primary text-primary-foreground py-12"
    >
      {/* Decorative eye icon — large, semi-transparent */}
      <Eye
        className="absolute right-0 top-0 w-64 h-64 text-primary-foreground/[0.15] -translate-y-1/3 translate-x-1/4 pointer-events-none select-none"
        strokeWidth={1}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Statement */}
          <p className="text-xl md:text-2xl font-semibold max-w-2xl leading-snug">
            The eye is the window to systemic health. Every comprehensive eye
            exam is a potential life-saving event.
          </p>

          {/* CTA Link */}
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide shrink-0 group hover:underline underline-offset-4"
          >
            Explore Clinical Optometry
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </motion.section>
  );
}