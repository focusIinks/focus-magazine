"use client";

import { motion } from "framer-motion";
import { Eye, ArrowRight } from "lucide-react";

export default function EditorialBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full relative overflow-hidden bg-primary text-primary-foreground py-16 md:py-20"
    >
      {/* Subtle diagonal lines pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            currentColor 10px,
            currentColor 11px
          )`,
        }}
      />

      {/* Refined eye icon watermark — right side */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="absolute right-0 top-0 pointer-events-none select-none"
      >
        <Eye
          className="w-72 h-72 md:w-80 md:h-80 text-primary-foreground/[0.07] -translate-y-[20%] translate-x-[15%]"
          strokeWidth={0.75}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">
          {/* Large decorative opening quote mark — left side */}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-editorial text-8xl md:text-9xl text-white/10 leading-none select-none shrink-0"
            aria-hidden="true"
          >
            &ldquo;
          </motion.span>

          {/* Statement */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-editorial text-2xl md:text-3xl font-medium leading-snug max-w-2xl"
          >
            The eye is the window to systemic health. Every comprehensive eye
            exam is a potential life-saving event.
          </motion.p>

          {/* CTA Link */}
          <motion.a
            href="#"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
            className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wide shrink-0 group"
          >
            <span className="relative">
              Explore Clinical Optometry
              <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-current transition-all duration-300 ease-out group-hover:w-full" />
            </span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
}