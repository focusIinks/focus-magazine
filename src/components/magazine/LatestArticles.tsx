"use client";

import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bookmark, ArrowDown } from "lucide-react";
import { articles, categories } from "@/lib/magazine-data";

interface LatestArticlesProps {
  onArticleOpen: (id: string) => void;
}

export function LatestArticles({ onArticleOpen }: LatestArticlesProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showCount, setShowCount] = useState(6);
  const [sortBy, setSortBy] = useState("newest");

  const allCategories = ["All", ...categories.map((c) => c.name)];

  const filtered = useMemo(() => {
    const base =
      activeCategory === "All"
        ? [...articles]
        : articles.filter((a) => a.category === activeCategory);

    switch (sortBy) {
      case "popular":
        return base.sort((a, b) => b.views - a.views);
      case "alphabetical":
        return base.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return base;
    }
  }, [activeCategory, sortBy]);

  const displayed = filtered.slice(0, showCount);

  return (
    <section id="articles" className="py-20 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="text-left mb-10">
          <p className="text-xs tracking-[0.2em] text-primary font-semibold uppercase mb-2">
            FROM THE ARCHIVE
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">All Articles</h2>
        </div>

        {/* Category Filter Tabs + Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setShowCount(6);
                }}
                className={`shrink-0 px-4 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-foreground text-background"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="shrink-0 sm:ml-auto">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger size="sm" className="w-[160px] text-xs">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="alphabetical">A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((article) => (
            <article
              key={article.id}
              className="group cursor-pointer bg-card border border-border/50 rounded-xl p-5 hover:editorial-shadow hover:-translate-y-1 transition-all"
              onClick={() => onArticleOpen(article.id)}
            >
              {/* Category Tag */}
              <p className="text-[11px] font-semibold text-primary tracking-wider uppercase mb-3">
                {article.category}
              </p>

              {/* Title */}
              <h3 className="font-bold text-base leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {article.excerpt}
              </p>

              {/* Divider */}
              <div className="h-px bg-border mb-4" />

              {/* Bottom Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-[10px] font-bold text-primary flex items-center justify-center">
                    {article.author.initials}
                  </div>
                  <span className="text-xs text-muted-foreground font-medium truncate max-w-[120px]">
                    {article.author.name.replace("Dr. ", "")}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">
                    {article.date}
                  </span>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="text-muted-foreground/40 hover:text-primary transition-colors"
                    aria-label="Bookmark article"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        {showCount < filtered.length && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowCount((c) => c + 6)}
              className="text-sm font-semibold text-primary inline-flex items-center gap-1.5 border-b-2 border-primary pb-0.5 hover:opacity-80 transition-opacity"
            >
              Load More
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No articles found in this category.</p>
            <button
              onClick={() => setActiveCategory("All")}
              className="text-primary hover:underline mt-2 text-sm"
            >
              View all articles
            </button>
          </div>
        )}
      </div>
    </section>
  );
}