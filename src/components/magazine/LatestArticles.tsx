"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, ArrowDown, Clock, ChevronDown } from "lucide-react";
import { articles, categories } from "@/lib/magazine-data";
import type { Article } from "@/lib/magazine-data";

interface LatestArticlesProps {
  onArticleOpen: (id: string) => void;
}

type SortOption = "latest" | "most-read" | "editors-choice";

const sortLabels: Record<SortOption, string> = {
  latest: "Latest",
  "most-read": "Most Read",
  "editors-choice": "Editor's Choice",
};

const listContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const listItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const listItemExit = {
  opacity: 0,
  y: -8,
  transition: { duration: 0.2 },
};

function formatViews(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

function ArticleCard({
  article,
  index,
  onOpen,
}: {
  article: Article;
  index: number;
  onOpen: (id: string) => void;
}) {
  const [bookmarked, setBookmarked] = useState(false);
  const isAlternating = index % 3 === 0 && index > 0;

  if (isAlternating) {
    return (
      <motion.div variants={listItem} layout>
        <div
          className="group cursor-pointer py-8"
          onClick={() => onOpen(article.id)}
        >
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            {/* Image */}
            <div className="w-full sm:w-56 h-48 sm:h-auto shrink-0 overflow-hidden">
              {(article as Record<string, unknown>).imageUrl ? (
                <img
                  src={(article as Record<string, unknown>).imageUrl as string}
                  alt={
                    (article as Record<string, unknown>).imageCaption as string ||
                    article.title
                  }
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div
                  className={`w-full h-full min-h-[200px] bg-gradient-to-br ${article.imageGradient}`}
                />
              )}
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              {/* Tags */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary">
                  {article.category}
                </span>
                {(article as Record<string, unknown>).tags &&
                  Array.isArray((article as Record<string, unknown>).tags) &&
                  ((article as Record<string, unknown>).tags as string[])
                    .slice(0, 2)
                    .map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] tracking-wider uppercase text-muted-foreground font-medium"
                      >
                        {tag}
                      </span>
                    ))}
              </div>

              <h3 className="font-editorial font-bold text-xl md:text-2xl leading-tight mb-3 group-hover:text-primary transition-colors duration-300">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-5">
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary/10 text-[9px] font-bold text-primary flex items-center justify-center">
                    {article.author.initials}
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">
                    {article.author.name.replace("Dr. ", "")}
                  </span>
                  <span className="w-1 h-1 bg-border" />
                  <span className="text-xs text-muted-foreground">
                    {article.date}
                  </span>
                  <span className="w-1 h-1 bg-border" />
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setBookmarked(!bookmarked);
                  }}
                  className="text-muted-foreground/40 hover:text-primary transition-colors p-1"
                  aria-label="Bookmark article"
                >
                  <Bookmark
                    className={`w-4 h-4 ${bookmarked ? "fill-primary text-primary" : ""}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr className="magazine-rule" />
      </motion.div>
    );
  }

  return (
    <motion.div variants={listItem} layout>
      <div
        className="group cursor-pointer py-6"
        onClick={() => onOpen(article.id)}
      >
        <div className="flex gap-5">
          {/* Thumbnail */}
          <div className="w-24 h-24 shrink-0 overflow-hidden">
            {(article as Record<string, unknown>).imageUrl ? (
              <img
                src={(article as Record<string, unknown>).imageUrl as string}
                alt={
                  (article as Record<string, unknown>).imageCaption as string ||
                  article.title
                }
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div
                className={`w-full h-full bg-gradient-to-br ${article.imageGradient}`}
              />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            {/* Tags row */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-primary">
                {article.category}
              </span>
              {(article as Record<string, unknown>).tags &&
                Array.isArray((article as Record<string, unknown>).tags) &&
                ((article as Record<string, unknown>).tags as string[])
                  .slice(0, 1)
                  .map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] tracking-wider uppercase text-muted-foreground/70 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
            </div>

            <h3 className="font-editorial font-bold text-base leading-snug mb-1.5 group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {article.title}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {article.excerpt}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground font-medium">
                {article.author.name.replace("Dr. ", "")}
              </span>
              <span className="w-1 h-1 bg-border" />
              <span className="text-xs text-muted-foreground">
                {article.date}
              </span>
              <span className="w-1 h-1 bg-border" />
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </span>
              <span className="ml-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setBookmarked(!bookmarked);
                  }}
                  className="text-muted-foreground/30 hover:text-primary transition-colors p-0.5"
                  aria-label="Bookmark article"
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${bookmarked ? "fill-primary text-primary" : ""}`}
                  />
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <hr className="magazine-rule" />
    </motion.div>
  );
}

export function LatestArticles({ onArticleOpen }: LatestArticlesProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showCount, setShowCount] = useState(8);
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [sortOpen, setSortOpen] = useState(false);

  const allCategories = ["All", ...categories.map((c) => c.name)];

  const filtered = useMemo(() => {
    const base =
      activeCategory === "All"
        ? [...articles]
        : articles.filter((a) => a.category === activeCategory);

    switch (sortBy) {
      case "most-read":
        return base.sort((a, b) => b.views - a.views);
      case "editors-choice":
        return base.sort((a, b) => {
          const featuredScore = (a.featured ? 1 : 0) - (b.featured ? 1 : 0);
          if (featuredScore !== 0) return -featuredScore;
          return b.views - a.views;
        });
      default:
        return base;
    }
  }, [activeCategory, sortBy]);

  const displayed = filtered.slice(0, showCount);

  return (
    <section id="articles" className="py-20 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
        >
          <div className="flex items-baseline gap-3">
            <span className="editorial-badge text-primary">Latest</span>
            <h2 className="font-editorial text-3xl md:text-4xl font-bold">
              Articles
            </h2>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              onBlur={() => setTimeout(() => setSortOpen(false), 150)}
              className="flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors px-3 py-2 border border-border hover:border-foreground/30"
            >
              {sortLabels[sortBy]}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  sortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-1 bg-card border border-border z-50 py-1 min-w-[170px]"
                >
                  {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSortBy(key);
                        setSortOpen(false);
                        setShowCount(8);
                      }}
                      className={`block w-full text-left px-4 py-2 text-xs tracking-wide uppercase transition-colors ${
                        sortBy === key
                          ? "text-foreground font-semibold bg-accent/50"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                      }`}
                    >
                      {sortLabels[key]}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Category Filter Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-10"
        >
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setShowCount(8);
                }}
                className={`shrink-0 transition-all duration-200 ${
                  activeCategory === cat
                    ? "editorial-badge text-foreground border-foreground"
                    : "px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Article List ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${sortBy}`}
            variants={listContainer}
            initial="hidden"
            animate="show"
          >
            {displayed.map((article, i) => (
              <ArticleCard
                key={article.id}
                article={article}
                index={i}
                onOpen={onArticleOpen}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Load More ── */}
        {showCount < filtered.length && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <button
              onClick={() => setShowCount((c) => c + 8)}
              className="text-sm font-semibold text-primary inline-flex items-center gap-1.5 border-b-2 border-primary pb-0.5 hover:opacity-80 transition-opacity font-editorial"
            >
              Load More
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}

        {/* ── Empty State ── */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="font-editorial text-lg mb-2">No articles found</p>
            <p className="text-sm">in this category.</p>
            <button
              onClick={() => setActiveCategory("All")}
              className="text-primary hover:underline mt-4 text-xs tracking-wide uppercase font-semibold"
            >
              View all articles
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
