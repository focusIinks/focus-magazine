"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { articles } from "@/lib/magazine-data";
import { ArrowRight } from "lucide-react";

/* ─── Animation ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const, delay },
  }),
};

/* ─── Props ─── */
interface HeroSectionProps {
  onArticleOpen: (id: string) => void;
}

export function HeroSection({ onArticleOpen }: HeroSectionProps) {
  const featured = articles.find((a) => a.featured) || articles[0];
  const hasImage = Boolean(featured.imageUrl);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* ════════ BACKGROUND IMAGE ════════ */}
      {hasImage ? (
        <Image
          src={featured.imageUrl}
          alt={featured.title}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-slate-900 to-neutral-950" />
      )}

      {/* ════════ SINGLE GRADIENT OVERLAY ════════ */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* ════════ CONTENT ════════ */}
      <div className="relative z-10 flex h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex-col">
        {/* ── Masthead ── */}
        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="pt-8 sm:pt-12 text-[11px] sm:text-xs font-semibold tracking-[0.35em] uppercase text-white/70"
        >
          Focus Magazine
        </motion.span>

        {/* ── Spacer pushes content to bottom-center ── */}
        <div className="flex-1" />

        {/* ── Main Content Block ── */}
        <div className="pb-20 sm:pb-24 lg:pb-28 max-w-3xl">
          {/* Category */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-white/50 mb-4"
          >
            {featured.category}
          </motion.p>

          {/* Title */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6"
          >
            {featured.title}
          </motion.h1>

          {/* Thin Rule */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.35}
            className="w-12 h-[1.5px] bg-white/40 mb-6"
          />

          {/* Excerpt */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="font-body text-base sm:text-lg text-white/75 leading-relaxed max-w-2xl mb-8"
          >
            {featured.excerpt}
          </motion.p>

          {/* Meta: Author · Date · Read Time */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="flex items-center gap-3 text-white/50 text-xs sm:text-sm tracking-wide mb-10"
          >
            <span className="font-semibold text-white/70">{featured.author.name}</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>{featured.date}</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>{featured.readTime}</span>
          </motion.div>

          {/* Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.6}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => onArticleOpen(featured.id)}
              className="group inline-flex items-center gap-2.5 bg-white text-neutral-900 font-semibold text-sm tracking-wide px-7 py-3.5 transition-colors duration-200 hover:bg-white/90 cursor-pointer"
            >
              Read Story
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            <button
              onClick={() => {
                document
                  .getElementById("articles")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 border border-white/30 text-white font-medium text-sm tracking-wide px-7 py-3.5 transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer backdrop-blur-sm"
            >
              Browse All Articles
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}