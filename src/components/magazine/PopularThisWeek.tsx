"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Eye, Clock } from "lucide-react";
import { articles } from "@/lib/magazine-data";

interface PopularThisWeekProps {
  onArticleOpen: (id: string) => void;
}

export function PopularThisWeek({ onArticleOpen }: PopularThisWeekProps) {
  const popular = [...articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const topArticle = popular[0];
  const restArticles = popular.slice(1);

  const formatViews = (n: number) => {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return n.toString();
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px bg-primary flex-1" />
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight whitespace-nowrap">
            Popular This Week
          </h2>
          <div className="h-px bg-primary flex-1" />
        </div>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          The most-read articles our community is engaging with right now.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* #1 Featured Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              className={`bg-gradient-to-br ${topArticle.imageGradient} rounded-xl p-6 md:p-8 min-h-[300px] h-full flex flex-col justify-end relative overflow-hidden cursor-pointer group/feat hover:shadow-xl transition-all duration-300`}
              onClick={() => onArticleOpen(topArticle.id)}
            >
              <div className="absolute inset-0 bg-black/30 group-hover/feat:bg-black/20 transition-colors" />
              <div className="relative z-10">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs mb-4">
                  {topArticle.category}
                </Badge>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-snug group-hover/feat:underline decoration-white/40 underline-offset-4 transition-all">
                  {topArticle.title}
                </h3>
                <div className="flex items-center gap-4 text-white/80 text-sm">
                  <span className="font-medium">
                    {topArticle.author.name}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span>{topArticle.date}</span>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {topArticle.views.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* #2–#5 Stacked List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-xl border border-border overflow-hidden"
          >
            {restArticles.map((article, i) => (
              <div
                key={article.id}
                className={`flex items-start gap-4 p-5 cursor-pointer group/item hover:bg-accent transition-colors duration-200 ${
                  i < restArticles.length - 1 ? "border-b border-border/60" : ""
                }`}
                onClick={() => onArticleOpen(article.id)}
              >
                <span className="text-3xl font-bold text-primary/20 group-hover/item:text-primary/40 transition-colors leading-none mt-0.5 shrink-0 w-10 text-right">
                  {i + 2}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm leading-snug group-hover/item:text-primary transition-colors line-clamp-2 mb-1.5">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="font-medium truncate max-w-[140px]">
                      {article.author.name.replace("Dr. ", "")}
                    </span>
                    <span className="flex items-center gap-1 shrink-0">
                      <Eye className="w-3 h-3" />
                      {formatViews(article.views)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}