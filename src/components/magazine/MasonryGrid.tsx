"use client";

import { motion } from "framer-motion";
import { Bookmark, Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { articles } from "@/lib/magazine-data";
import type { Article } from "@/lib/magazine-data";

interface MasonryGridProps {
  onArticleOpen: (id: string) => void;
}

const displayArticles = articles.slice(0, 7);

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function MasonryGrid({ onArticleOpen }: MasonryGridProps) {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div className="mb-14 md:mb-20">
          <span className="editorial-badge text-primary mb-4 block w-fit">
            Latest
          </span>
          <h2 className="font-editorial text-4xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight mb-4">
            Stories
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Curated insights from the forefront of optometric science — clinical
            breakthroughs, emerging technologies, and expert perspectives shaping
            the future of eye care.
          </p>
        </div>

        {/* ── Asymmetric Editorial Grid ── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Article 0 — LARGE: col-span-2, row-span-2 */}
          <motion.div
            variants={fadeUp}
            className="md:col-span-2 md:row-span-2"
          >
            <LargeCard article={displayArticles[0]} onOpen={onArticleOpen} />
          </motion.div>

          {/* Article 1 — Featured: top-right */}
          <motion.div variants={fadeUp}>
            <FeaturedCard article={displayArticles[1]} onOpen={onArticleOpen} />
          </motion.div>

          {/* Article 2 — Featured: second row right */}
          <motion.div variants={fadeUp}>
            <FeaturedCard article={displayArticles[2]} onOpen={onArticleOpen} />
          </motion.div>

          {/* Articles 3–6 — Regular cards */}
          {displayArticles.slice(3).map((article) => (
            <motion.div key={article.id} variants={fadeUp}>
              <RegularCard article={article} onOpen={onArticleOpen} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── LARGE CARD — Hero image with overlay ─── */
function LargeCard({
  article,
  onOpen,
}: {
  article: Article;
  onOpen: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(article.id)}
      className="relative w-full min-h-[420px] md:min-h-[540px] lg:min-h-full rounded-none overflow-hidden group cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {/* Image */}
      {article.imageUrl ? (
        <img
          src={article.imageUrl}
          alt={article.imageCaption || article.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div
          className={`absolute inset-0 w-full h-full bg-gradient-to-br ${article.imageGradient}`}
        />
      )}

      {/* Editorial overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-8 lg:p-10">
        <Badge
          variant="secondary"
          className="w-fit bg-white/15 text-white backdrop-blur-md border border-white/20 mb-5 hover:bg-white/25 transition-colors"
        >
          {article.category}
        </Badge>

        <h3 className="font-editorial text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.15] mb-3 max-w-xl group-hover:underline decoration-white/40 underline-offset-4 decoration-2">
          {article.title}
        </h3>

        <p className="font-body text-sm md:text-base text-white/80 line-clamp-3 mb-6 max-w-lg">
          {article.excerpt}
        </p>

        <div className="flex items-center gap-4 text-xs text-white/60">
          <span className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-[10px] font-semibold text-white">
              {article.author.initials}
            </span>
            <span className="font-medium text-white/80">
              {article.author.name}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {article.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
        </div>
      </div>

      {/* Hover shadow elevation */}
      <div className="absolute inset-0 rounded-none shadow-none transition-shadow duration-500 group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] pointer-events-none" />
    </button>
  );
}

/* ─── FEATURED CARD — Image top, white bottom, border-l accent ─── */
function FeaturedCard({
  article,
  onOpen,
}: {
  article: Article;
  onOpen: (id: string) => void;
}) {
  return (
    <div className="bg-card rounded-none border border-border border-l-4 border-l-primary overflow-hidden flex flex-col h-full transition-shadow duration-300 hover:shadow-lg group">
      {/* Image top */}
      <div className="relative h-48 shrink-0 overflow-hidden">
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt={article.imageCaption || article.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={`absolute inset-0 w-full h-full bg-gradient-to-br ${article.imageGradient}`}
          />
        )}
        <Badge className="absolute top-3 left-3 bg-white text-foreground border-0 shadow-sm text-[11px]">
          {article.category}
        </Badge>
      </div>

      {/* Content bottom */}
      <div className="p-5 flex flex-col flex-1">
        <button
          type="button"
          onClick={() => onOpen(article.id)}
          className="text-left w-full cursor-pointer"
        >
          <h3 className="font-editorial text-lg font-bold text-foreground mb-2 leading-snug group-hover:underline decoration-primary/30 underline-offset-4 line-clamp-2">
            {article.title}
          </h3>
        </button>
        <p className="font-body text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground pt-3 border-t border-border/60">
          <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-semibold text-primary shrink-0">
            {article.author.initials}
          </span>
          <span className="font-medium text-foreground truncate">
            {article.author.name}
          </span>
          <span className="ml-auto flex items-center gap-1 shrink-0">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── REGULAR CARD — Clean white, dot + category, bookmark ─── */
function RegularCard({
  article,
  onOpen,
}: {
  article: Article;
  onOpen: (id: string) => void;
}) {
  return (
    <div className="bg-card rounded-none border border-border p-5 flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group">
      {/* Top: dot + category */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
          <Badge
            variant="outline"
            className="text-[11px] font-medium uppercase tracking-wider px-1.5 py-0 border-border"
          >
            {article.category}
          </Badge>
        </div>

        <button
          type="button"
          onClick={() => onOpen(article.id)}
          className="text-left w-full cursor-pointer"
        >
          <h3 className="font-editorial text-base font-bold text-foreground mb-2 leading-snug group-hover:underline decoration-primary/30 underline-offset-4 line-clamp-2">
            {article.title}
          </h3>
        </button>

        <p className="font-body text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {article.excerpt}
        </p>

        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-muted-foreground/70 font-medium uppercase tracking-wider"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom: author + date + bookmark */}
      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-border/60">
        <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-semibold text-primary shrink-0">
          {article.author.initials}
        </span>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-foreground truncate">
            {article.author.name}
          </span>
          <span className="text-[11px] text-muted-foreground">{article.date}</span>
        </div>
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className="ml-auto p-1.5 rounded-sm hover:bg-muted transition-colors text-muted-foreground hover:text-primary"
          aria-label={`Bookmark ${article.title}`}
        >
          <Bookmark className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}