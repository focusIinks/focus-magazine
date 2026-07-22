"use client";

import { motion } from "framer-motion";
import { Bookmark, Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { articles } from "@/lib/magazine-data";

interface MasonryGridProps {
  onArticleOpen: (id: string) => void;
}

const displayArticles = articles.slice(0, 7);

export default function MasonryGrid({ onArticleOpen }: MasonryGridProps) {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header — Left Aligned */}
        <div className="mb-12 md:mb-16">
          <span className="block text-xs font-semibold tracking-widest text-primary uppercase mb-2">
            Latest
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Stories
          </h2>
          <p className="text-muted-foreground max-w-lg text-base leading-relaxed">
            Curated insights from the forefront of optometric science — clinical
            breakthroughs, emerging technologies, and expert perspectives shaping
            the future of eye care.
          </p>
        </div>

        {/* Magazine-Style Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {displayArticles.map((article, index) => {
            if (index === 0) {
              return (
                <LargeCard
                  key={article.id}
                  article={article}
                  index={index}
                  onOpen={onArticleOpen}
                />
              );
            }
            if (index === 1) {
              return (
                <FeaturedCard
                  key={article.id}
                  article={article}
                  index={index}
                  onOpen={onArticleOpen}
                />
              );
            }
            return (
              <RegularCard
                key={article.id}
                article={article}
                index={index}
                onOpen={onArticleOpen}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Large Card (spans 2 rows on lg) ─── */
function LargeCard({
  article,
  index,
  onOpen,
}: {
  article: (typeof displayArticles)[0];
  index: number;
  onOpen: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="lg:row-span-2"
    >
      <button
        type="button"
        onClick={() => onOpen(article.id)}
        className={`w-full min-h-[500px] lg:min-h-[600px] rounded-xl overflow-hidden bg-gradient-to-br ${article.imageGradient} flex flex-col justify-end p-6 md:p-8 text-left group cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
      >
        <Badge className="w-fit bg-white/20 text-white backdrop-blur-sm border-0 mb-4 hover:bg-white/30">
          {article.category}
        </Badge>
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:underline decoration-white/40 underline-offset-4">
          {article.title}
        </h3>
        <p className="text-sm text-white/80 line-clamp-3 mb-5">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-4 text-xs text-white/70">
          <span className="flex items-center gap-1.5">
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-semibold text-white">
              {article.author.initials}
            </span>
            {article.author.name}
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
      </button>
    </motion.div>
  );
}

/* ─── Featured Card (gradient header + white body, border-l accent) ─── */
function FeaturedCard({
  article,
  index,
  onOpen,
}: {
  article: (typeof displayArticles)[0];
  index: number;
  onOpen: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
    >
      <button
        type="button"
        onClick={() => onOpen(article.id)}
        className="w-full bg-card rounded-xl border border-border overflow-hidden text-left group cursor-pointer transition-all duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-l-4 border-l-primary"
      >
        {/* Gradient header */}
        <div
          className={`h-48 bg-gradient-to-br ${article.imageGradient} relative`}
        >
          <Badge className="absolute top-4 left-4 bg-white text-foreground border-0 shadow-sm">
            {article.category}
          </Badge>
        </div>
        {/* White content area */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:underline decoration-primary/30 underline-offset-4">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-semibold text-primary">
              {article.author.initials}
            </span>
            <span className="font-medium text-foreground">
              {article.author.name}
            </span>
            <span>{article.date}</span>
            <span className="ml-auto flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

/* ─── Regular Card (clean white, dot + category, bookmark) ─── */
function RegularCard({
  article,
  index,
  onOpen,
}: {
  article: (typeof displayArticles)[0];
  index: number;
  onOpen: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
    >
      <div className="bg-card rounded-xl border border-border p-5 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group">
        {/* Top: dot + category */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-3 h-3 rounded-full bg-primary shrink-0" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {article.category}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onOpen(article.id)}
            className="text-left w-full cursor-pointer"
          >
            <h3 className="font-bold text-foreground mb-2 group-hover:underline decoration-primary/30 underline-offset-4 line-clamp-2">
              {article.title}
            </h3>
          </button>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {article.excerpt}
          </p>
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
            <span className="text-[11px] text-muted-foreground">
              {article.date}
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="ml-auto p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-primary"
            aria-label={`Bookmark ${article.title}`}
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}