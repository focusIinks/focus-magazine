"use client";

import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { articles } from "@/lib/magazine-data";

interface PopularThisWeekProps {
  onArticleOpen: (id: string) => void;
}

const formatViews = (n: number) => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k reads`;
  return `${n} reads`;
};

const listContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const listItem = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function PopularThisWeek({ onArticleOpen }: PopularThisWeekProps) {
  const popular = [...articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 6);

  const topArticle = popular[0];
  const restArticles = popular.slice(1);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left-aligned editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-xs tracking-[0.2em] text-primary font-semibold uppercase">
            Most Read
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Trending Now</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT - Large editorial card for #1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <div
              className="group cursor-pointer relative rounded-xl overflow-hidden min-h-[400px] h-full transition-all duration-500 hover:shadow-xl"
              onClick={() => onArticleOpen(topArticle.id)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${topArticle.imageGradient}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-8">
                <span className="text-7xl font-black text-white/10 absolute top-4 left-5 leading-none select-none">
                  01
                </span>
                <span className="text-[10px] font-bold tracking-wider uppercase text-white/50 mb-3 relative z-10">
                  Most Read
                </span>
                <h3 className="text-2xl font-bold text-white mb-3 leading-snug">
                  {topArticle.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3">
                  {topArticle.excerpt}
                </p>
                <div className="flex items-center gap-4 text-white/70 text-xs">
                  <span className="font-medium text-white/90">
                    {topArticle.author.name}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {formatViews(topArticle.views)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT - Numbered list #2-#6 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <h3 className="text-lg font-bold mb-6">Most Read This Week</h3>
            <motion.div
              variants={listContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {restArticles.map((article, i) => (
                <motion.div
                  key={article.id}
                  variants={listItem}
                  className="flex items-center gap-5 py-4 px-3 -mx-3 rounded-lg cursor-pointer hover:bg-accent/50 transition-colors duration-200 border-b border-border/50 last:border-b-0"
                  onClick={() => onArticleOpen(article.id)}
                >
                  <span className="text-3xl font-black text-primary/10 leading-none shrink-0 w-10 text-right select-none">
                    {String(i + 2).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm leading-snug mb-1.5 line-clamp-1 group-hover:text-primary transition-colors">
                      {article.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="font-medium truncate max-w-[180px]">
                        {article.author.name}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/40 shrink-0" />
                      <span className="flex items-center gap-1 shrink-0">
                        <Eye className="w-3 h-3" />
                        {formatViews(article.views)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}