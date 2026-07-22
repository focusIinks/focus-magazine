"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { articles } from "@/lib/magazine-data";
import { Share2, Bookmark, MessageCircle } from "lucide-react";
/* ─── Animation Variants ─── */
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── Gradient Fallback Map ─── */
const gradientMap: Record<string, string> = {
  "from-amber-600 to-orange-700": "#d97706",
  "from-rose-500 to-pink-600": "#f43f5e",
  "from-emerald-600 to-teal-700": "#0d9488",
  "from-teal-500 to-emerald-600": "#14b8a6",
  "from-purple-600 to-violet-700": "#9333ea",
  "from-teal-600 to-cyan-700": "#0d9488",
};

const fallbackGradients = [
  "linear-gradient(135deg, #0f172a 0%, #134e4a 50%, #064e3b 100%)",
  "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #1e3a5f 100%)",
  "linear-gradient(135deg, #1c1917 0%, #44403c 50%, #292524 100%)",
];

/* ─── Props ─── */
interface HeroSectionProps {
  onArticleOpen: (id: string) => void;
}

export function HeroSection({ onArticleOpen }: HeroSectionProps) {
  const featured = articles.find((a) => a.featured) || articles[0];
  const otherFeatured = articles.filter((a) => a.featured && a.id !== featured.id).slice(0, 3);

  // Pad if fewer than 3
  while (otherFeatured.length < 3) {
    const next = articles.find(
      (a) => !otherFeatured.includes(a) && a.id !== featured.id
    );
    if (next) otherFeatured.push(next);
    else break;
  }

  const firstWord = featured.title.split(" ")[0];
  const restTitle = featured.title.split(" ").slice(1).join(" ");

  const hasImage = !!(featured as Record<string, unknown>).imageUrl;

  /* ─── Parallax mouse tracking ─── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bgX = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), { stiffness: 40, damping: 30 });
  const bgY = useSpring(useTransform(mouseY, [0, 1], [-8, 8]), { stiffness: 40, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      className="relative min-h-screen w-full flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* ════════════════ BACKGROUND LAYER ════════════════ */}
      {/* Real image background with parallax */}
      {hasImage ? (
        <motion.div
          style={{ x: bgX, y: bgY }}
          className="absolute inset-[-40px] z-0 scale-110"
        >
          <Image
            src={(featured as Record<string, unknown>).imageUrl as string}
            alt={featured.title}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
      ) : (
        <motion.div
          style={{ x: bgX, y: bgY }}
          className="absolute inset-[-40px] z-0 scale-110"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                (featured as Record<string, unknown>).imageGradient
                  ? undefined
                  : fallbackGradients[0],
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-teal-950/80 to-slate-950" />
        </motion.div>
      )}

      {/* Dark gradient overlays for text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/85 via-black/60 to-black/40" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-transparent to-black/40" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/30 via-transparent to-black/20" />

      {/* Subtle dot grid pattern overlay */}
      <div className="absolute inset-0 z-[2] opacity-[0.04]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.7" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dots)" />
        </svg>
      </div>

      {/* ════════════════ AMBIENT GLOW CIRCLES ════════════════ */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -25, 15, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[5%] w-[420px] h-[420px] bg-teal-500/[0.07] rounded-full blur-[120px] z-[2] pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -25, 20, 0],
          y: [0, 20, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-amber-400/[0.06] rounded-full blur-[100px] z-[2] pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, 15, -10, 0],
          y: [0, -15, 25, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[50%] left-[45%] w-[280px] h-[280px] bg-cyan-400/[0.04] rounded-full blur-[90px] z-[2] pointer-events-none"
      />

      {/* ════════════════ MAIN CONTENT ════════════════ */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-32 pb-24 lg:pb-0">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-center"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* ──── LEFT COLUMN (60%) ──── */}
          <div className="flex flex-col gap-5">
            {/* ISSUE 47 badge */}
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <span className="editorial-badge inline-flex items-center gap-2 tracking-[0.3em] text-[11px] uppercase text-amber-300 font-semibold border border-amber-400/30 bg-amber-400/[0.08] backdrop-blur-sm px-4 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                Issue 47 &middot; July 2026
              </span>
            </motion.div>

            {/* Editorial gold marker */}
            <motion.div variants={fadeUp} className="w-16 h-[2px] bg-gradient-to-r from-amber-400 to-amber-400/0" />

            {/* Main headline — first word in accent */}
            <motion.h1
              variants={fadeUp}
              className="font-editorial text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight"
            >
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-teal-400 bg-clip-text text-transparent">
                {firstWord}
              </span>
              <br className="hidden sm:block" />{" "}
              <span className="text-white">{restTitle}</span>
            </motion.h1>

            {/* Thin horizontal rule (magazine-rule) */}
            <motion.div
              variants={fadeUp}
              className="magazine-rule w-full max-w-xl h-[1px] bg-gradient-to-r from-white/40 via-white/15 to-transparent"
            />

            {/* Excerpt */}
            <motion.p
              variants={fadeUp}
              className="font-body text-lg text-white/80 leading-relaxed max-w-xl"
            >
              {featured.excerpt}
            </motion.p>

            {/* Author byline */}
            <motion.div
              variants={fadeUp}
              className="editorial-byline flex items-center gap-3.5 mt-1"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400/30 to-teal-500/30 border border-white/20 text-white font-bold text-sm flex items-center justify-center shrink-0 backdrop-blur-sm">
                {featured.author.initials}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-white font-semibold text-sm tracking-wide">
                  {featured.author.name}
                </span>
                <span className="text-white/50 text-xs font-medium tracking-wide">
                  {featured.author.specialty} &middot; {featured.date}
                </span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mt-3">
              <button
                onClick={() => onArticleOpen(featured.id)}
                className="group relative bg-white text-slate-900 font-semibold text-sm tracking-wide px-7 py-3.5 rounded-none hover:bg-white/90 transition-all duration-200 cursor-pointer uppercase"
              >
                <span className="relative z-10">Read Cover Story</span>
              </button>
              <button className="border border-white/25 text-white font-medium text-sm tracking-wide px-7 py-3.5 rounded-none hover:bg-white/10 hover:border-white/40 transition-all duration-200 cursor-pointer uppercase backdrop-blur-sm">
                Browse This Issue
              </button>
            </motion.div>
          </div>

          {/* ──── RIGHT COLUMN (40%) — Sidebar Story Cards ──── */}
          <motion.div
            variants={stagger}
            className="flex flex-col gap-3 lg:pl-4"
          >
            <motion.div variants={slideInRight} className="flex items-center gap-2 mb-1">
              <div className="w-6 h-[2px] bg-white/30" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">
                Also in this issue
              </span>
            </motion.div>

            {otherFeatured.map((article, idx) => (
              <motion.div
                key={article.id}
                variants={slideInRight}
                custom={idx}
                onClick={() => onArticleOpen(article.id)}
                className="group relative flex gap-0 bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] px-5 py-4 hover:bg-white/10 hover:border-white/[0.12] transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Thin left border accent (3px) */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] transition-colors duration-300"
                  style={{
                    backgroundColor: gradientMap[article.imageGradient] || "#0d9488",
                  }}
                />

                <div className="flex flex-col gap-2 min-w-0 pl-3">
                  {/* Category label */}
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold group-hover:text-amber-400/70 transition-colors duration-300">
                    {article.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-editorial text-[15px] font-semibold text-white/90 line-clamp-2 leading-snug group-hover:text-amber-300 transition-colors duration-300">
                    {article.title}
                  </h3>

                  {/* Author + date */}
                  <span className="text-[11px] text-white/40 font-medium tracking-wide group-hover:text-white/60 transition-colors duration-300">
                    {article.author.name} &middot; {article.date}
                  </span>
                </div>

                {/* Hover arrow indicator */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/0 group-hover:text-white/40 transition-all duration-300 group-hover:translate-x-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ════════════════ BOTTOM BAR ════════════════ */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 h-14 bg-black/30 backdrop-blur-md border-t border-white/[0.06] flex items-center justify-between px-6 lg:px-12 z-20"
      >
        <div className="flex items-center gap-4">
          <span className="text-[11px] text-white/40 font-medium tracking-wide uppercase">
            Published by Focuslinks
          </span>
          <span className="hidden sm:inline text-white/10">|</span>
          <span className="hidden sm:inline text-[11px] text-white/30 font-medium tracking-wide">
            Vol. 12 &middot; No. 47
          </span>
        </div>

        <div className="flex items-center gap-1">
          {[
            { icon: Share2, label: "Share" },
            { icon: Bookmark, label: "Bookmark" },
            { icon: MessageCircle, label: "Comment" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              aria-label={label}
              className="group p-2.5 text-white/40 hover:text-white/80 transition-all duration-200 cursor-pointer"
            >
              <Icon className="w-[18px] h-[18px]" />
            </button>
          ))}
        </div>
      </motion.div>

      {/* ════════════════ IMAGE CAPTION (bottom-left) ════════════════ */}
      {(featured as Record<string, unknown>).imageCaption && (
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.0 }}
          className="absolute bottom-16 left-6 lg:left-12 z-20 max-w-md"
        >
          <p className="text-[10px] text-white/30 tracking-wide leading-relaxed italic">
            {(featured as Record<string, unknown>).imageCaption as string}
          </p>
        </motion.div>
      )}
    </section>
  );
}