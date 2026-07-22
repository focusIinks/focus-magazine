"use client";

import { motion } from "framer-motion";
import { articles } from "@/lib/magazine-data";
import { Share2, Bookmark, MessageCircle } from "lucide-react";

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const gradientMap: Record<string, string> = {
  "from-amber-600 to-orange-700": "#d97706",
  "from-rose-500 to-pink-600": "#f43f5e",
  "from-emerald-600 to-teal-700": "#0d9488",
  "from-teal-500 to-emerald-600": "#14b8a6",
  "from-purple-600 to-violet-700": "#9333ea",
  "from-teal-600 to-cyan-700": "#0d9488",
};

interface HeroSectionProps {
  onArticleOpen: (id: string) => void;
}

export function HeroSection({ onArticleOpen }: HeroSectionProps) {
  const featured = articles.find((a) => a.featured) || articles[0];
  const otherFeatured = articles.filter((a) => a.featured && a.id !== featured.id).slice(0, 3);

  // Pad if fewer than 3 other featured
  while (otherFeatured.length < 3) {
    const next = articles.find((a) => !otherFeatured.includes(a) && a.id !== featured.id);
    if (next) otherFeatured.push(next);
    else break;
  }

  const firstWord = featured.title.split(" ")[0];
  const restTitle = featured.title.split(" ").slice(1).join(" ");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-bleed gradient background */}
      <div className="absolute inset-0 magazine-gradient" />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.06]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-amber-400/8 rounded-full blur-3xl" />

      {/* Main content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:pb-0">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* LEFT COLUMN */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {/* Issue label */}
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <span className="tracking-[0.25em] text-xs uppercase text-white/60 font-medium">
                Issue 47 &middot; July 2026
              </span>
            </motion.div>

            {/* Gold editorial marker */}
            <motion.div variants={fadeUp} className="w-12 h-0.5 bg-amber-400" />

            {/* Large editorial headline */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight text-balance"
            >
              <span className="text-white/70">{firstWord}</span>
              <br className="hidden sm:block" />{" "}
              <span>{restTitle}</span>
            </motion.h1>

            {/* Divider */}
            <motion.div variants={fadeUp} className="w-full max-w-xl h-px bg-white/20" />

            {/* Excerpt */}
            <motion.p
              variants={fadeUp}
              className="text-lg text-white/70 leading-relaxed max-w-xl"
            >
              {featured.excerpt}
            </motion.p>

            {/* Author info */}
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 text-white font-bold text-sm flex items-center justify-center shrink-0">
                {featured.author.initials}
              </div>
              <div className="flex flex-col">
                <span className="text-white font-medium text-sm">
                  {featured.author.name}
                </span>
                <span className="text-white/50 text-xs">
                  {featured.author.specialty} &middot; {featured.date}
                </span>
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mt-2">
              <button
                onClick={() => onArticleOpen(featured.id)}
                className="bg-white text-teal-900 font-semibold px-6 py-3 rounded-none hover:bg-white/90 transition-colors duration-200 cursor-pointer"
              >
                Read Cover Story
              </button>
              <button className="border border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-none transition-colors duration-200 cursor-pointer">
                Browse Issue
              </button>
            </motion.div>

            {/* Stat pills */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mt-4">
              {["15 Articles", "8 Authors", "6 Categories"].map((stat) => (
                <span
                  key={stat}
                  className="bg-white/10 rounded-full px-4 py-2 text-white/80 text-sm whitespace-nowrap"
                >
                  {stat}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {otherFeatured.map((article) => (
              <motion.div
                key={article.id}
                variants={fadeUp}
                onClick={() => onArticleOpen(article.id)}
                className="flex gap-3 bg-white/5 border border-white/10 px-4 py-3 hover:bg-white/10 transition-colors duration-200 cursor-pointer group"
              >
                {/* Colored bar */}
                <div
                  className="w-[3px] shrink-0 rounded-full"
                  style={{
                    backgroundColor: gradientMap[article.imageGradient] || "#0d9488",
                  }}
                />
                <div className="flex flex-col gap-1.5 min-w-0">
                  <span className="text-[10px] uppercase tracking-widest text-white/50 font-medium">
                    {article.category}
                  </span>
                  <h3 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-amber-300 transition-colors duration-200">
                    {article.title}
                  </h3>
                  <span className="text-xs text-white/50">
                    {article.author.name} &middot; {article.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 h-14 bg-black/20 backdrop-blur-sm flex items-center justify-between px-6 z-20">
        <span className="text-xs text-white/50">Published by Focuslinks</span>
        <div className="flex items-center gap-1">
          {[
            { icon: Share2, label: "Share" },
            { icon: Bookmark, label: "Bookmark" },
            { icon: MessageCircle, label: "Comment" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              aria-label={label}
              className="p-2 text-white/50 hover:text-white/80 transition-colors duration-200 cursor-pointer"
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}