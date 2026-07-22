"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, ArrowRight, Bookmark } from "lucide-react";
import { articles, categories, trendingTopics } from "@/lib/magazine-data";

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

  const getCategoryCount = (cat: string) =>
    cat === "All"
      ? articles.length
      : articles.filter((a) => a.category === cat).length;

  return (
    <section id="articles" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px bg-primary flex-1" />
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight whitespace-nowrap">
            Latest Articles
          </h2>
          <div className="h-px bg-primary flex-1" />
        </div>

        {/* Category Tabs + Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-10">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setShowCount(6);
                }}
                className={`shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card text-muted-foreground hover:text-foreground hover:bg-accent border border-border"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="ml-1.5 text-xs opacity-80">
                    ({getCategoryCount(cat)})
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="shrink-0 sm:ml-auto">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger size="sm" className="w-[170px] text-xs">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="alphabetical">Alphabetical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Articles Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayed.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                >
                  <Card
                    className="group cursor-pointer overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full"
                    onClick={() => onArticleOpen(article.id)}
                  >
                    <div
                      className={`h-44 bg-gradient-to-br ${article.imageGradient} relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                      <div className="absolute bottom-3 left-3">
                        <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs">
                          {article.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-5 flex flex-col flex-1 relative">
                      {/* Bookmark icon - visual only */}
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-all duration-200"
                        aria-label="Bookmark article"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>

                      <h3 className="font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug text-sm pr-8">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2 flex-1">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-3 border-t border-border/50">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                            {article.author.initials}
                          </div>
                          <span className="font-medium truncate max-w-[100px]">
                            {article.author.name.replace("Dr. ", "")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>{article.date}</span>
                          <Clock className="w-3 h-3 shrink-0" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {showCount < filtered.length && (
              <div className="text-center mt-10">
                <Button
                  variant="outline"
                  onClick={() => setShowCount((c) => c + 6)}
                  className="px-8"
                >
                  Load More Articles
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

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

          {/* Trending Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-5 flex items-center gap-2">
                  <div className="w-1 h-5 bg-primary rounded-full" />
                  Trending Now
                </h3>
                <div className="space-y-1">
                  {trendingTopics.map((topic, i) => (
                    <div
                      key={i}
                      className="flex gap-3 group cursor-pointer rounded-md p-2 -m-2 transition-colors hover:bg-accent/50"
                    >
                      <span className="text-2xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors leading-none mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-sm font-medium leading-snug group-hover:text-primary transition-colors">
                          {topic.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {topic.views.toLocaleString()} views
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}