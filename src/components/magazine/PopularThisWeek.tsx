"use client";

import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { articles, type Article } from "@/lib/magazine-data";

interface PopularThisWeekProps {
  onArticleOpen: (id: string) => void;
}

const formatViews = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M views`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K views`;
  return `${n} views`;
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const featuredVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function getCategoryColor(category: string): string {
  const map: Record<string, string> = {
    "Clinical Refraction": "bg-teal-500/10 text-teal-700 dark:text-teal-400",
    "Contact Lenses": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    "Myopia Management": "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400",
    "Glaucoma": "bg-amber-500/10 text-amber-700 dark:text-amber-400",
    "Pediatric Optometry": "bg-rose-500/10 text-rose-700 dark:text-rose-400",
    "Ocular Pharmacology": "bg-violet-500/10 text-violet-700 dark:text-violet-400",
    "Binocular Vision": "bg-orange-500/10 text-orange-700 dark:text-orange-400",
    "Low Vision": "bg-sky-500/10 text-sky-700 dark:text-sky-400",
    "Practice Management": "bg-lime-500/10 text-lime-700 dark:text-lime-400",
    "Technology": "bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-400",
    "Teleoptometry": "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400",
    "Anterior Segment": "bg-red-500/10 text-red-700 dark:text-red-400",
    "Neuro-Ophthalmology": "bg-purple-500/10 text-purple-700 dark:text-purple-400",
    "Public Health": "bg-teal-500/10 text-teal-700 dark:text-teal-400",
  };
  return map[category] || "bg-muted text-muted-foreground";
}

function FeaturedCard({ article, onOpen }: { article: Article; onOpen: () => void }) {
  return (
    <motion.div
      variants={featuredVariants}
      className="group relative cursor-pointer overflow-hidden rounded-sm h-full min-h-[480px] lg:min-h-[560px]"
      onClick={onOpen}
    >
      {/* Background: gradient only (no imageUrl in data) */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${article.imageGradient} transition-transform duration-700 ease-out group-hover:scale-105`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
      </div>

      {/* Watermark number */}
      <span className="absolute top-6 right-6 text-[8rem] font-black text-white/[0.04] leading-none select-none font-editorial">
        01
      </span>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-8 lg:p-10">
        <span
          className={`inline-block self-start text-[10px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-sm mb-4 ${getCategoryColor(article.category)}`}
        >
          {article.category}
        </span>

        <h3 className="font-editorial font-bold text-2xl lg:text-[1.75rem] text-white leading-tight mb-3 max-w-lg">
          {article.title}
        </h3>

        <p className="text-white/60 text-sm leading-relaxed mb-5 line-clamp-3 max-w-md">
          {article.excerpt}
        </p>

        <div className="flex items-center gap-3 text-white/70 text-xs">
          <span className="font-semibold text-white/90">{article.author.name}</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            {formatViews(article.views)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function RankedItem({
  article,
  rank,
  isFirst,
  onOpen,
}: {
  article: Article;
  rank: number;
  isFirst: boolean;
  onOpen: () => void;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="group cursor-pointer"
      onClick={onOpen}
    >
      <div
        className={`flex items-start gap-4 lg:gap-5 py-4 lg:py-5 px-3 -mx-3 rounded-sm transition-colors duration-200 hover:bg-muted/50 ${
          isFirst ? "pt-0" : ""
        }`}
      >
        {/* Rank number */}
        <span
          className={`shrink-0 w-9 text-right leading-none font-editorial tabular-nums select-none ${
            isFirst
              ? "text-4xl lg:text-5xl font-bold text-primary"
              : "text-3xl lg:text-[2rem] font-bold text-muted-foreground/40"
          }`}
        >
          {rank}
        </span>

        {/* Content */}
        <div className="flex-1 min-w-0 pt-1 lg:pt-1.5">
          <span
            className={`inline-block text-[9px] font-bold tracking-[0.16em] uppercase px-2 py-0.5 rounded-sm mb-2 ${getCategoryColor(article.category)}`}
          >
            {article.category}
          </span>

          <h4
            className={`font-editorial font-bold leading-snug mb-1.5 transition-colors duration-200 group-hover:text-primary line-clamp-2 ${
              isFirst ? "text-lg lg:text-xl" : "text-base lg:text-lg"
            }`}
          >
            {article.title}
          </h4>

          <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
            <span className="font-medium truncate max-w-[160px]">{article.author.name}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30 shrink-0" />
            <span className="flex items-center gap-1 shrink-0">
              <Eye className="w-3 h-3" />
              {formatViews(article.views)}
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal rule separator */}
      {rank < 5 && <hr className="magazine-rule" />}
    </motion.div>
  );
}

export function PopularThisWeek({ onArticleOpen }: PopularThisWeekProps) {
  const popular = [...articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const topArticle = popular[0];
  const rankedArticles = popular;

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 flex items-baseline gap-4"
        >
          <span className="editorial-badge text-primary">MOST READ</span>
          <h2 className="font-editorial text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            This Week
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT — Ranked list #1–#5 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-7"
          >
            {rankedArticles.map((article, i) => (
              <RankedItem
                key={article.id}
                article={article}
                rank={i + 1}
                isFirst={i === 0}
                onOpen={() => onArticleOpen(article.id)}
              />
            ))}
          </motion.div>

          {/* RIGHT — Featured #1 card */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
            className="lg:col-span-5"
          >
            <FeaturedCard
              article={topArticle}
              onOpen={() => onArticleOpen(topArticle.id)}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}