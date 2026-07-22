"use client";

import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { trendingTopics, articles } from "@/lib/magazine-data";

const listContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const listItem = {
  hidden: { opacity: 0, x: 16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

function formatViews(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

function getCategoryForTopic(title: string): string | null {
  const firstWord = title.split(":")[0].split(" ")[0].toLowerCase();
  const match = articles.find((a) =>
    a.title.toLowerCase().includes(firstWord)
  );
  return match ? match.category : null;
}

export default function TrendingSidebar() {
  return (
    <aside className="bg-card border border-border p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex items-baseline gap-3 mb-6"
      >
        <span className="editorial-badge text-primary">Trending</span>
        <h3 className="font-editorial text-xl font-semibold">Now</h3>
      </motion.div>

      {/* Numbered List */}
      <motion.ol
        variants={listContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-0"
      >
        {trendingTopics.map((topic, i) => {
          const rank = i + 1;
          const category = getCategoryForTopic(topic.title);
          const isTop = rank === 1;

          return (
            <motion.li key={i} variants={listItem} className="group">
              <div className="flex items-start gap-3 py-4 cursor-pointer">
                {/* Rank Number */}
                <span
                  className={`text-lg font-black leading-none mt-0.5 tabular-nums w-6 shrink-0 text-right select-none transition-colors duration-200 ${
                    isTop
                      ? "text-amber-600 group-hover:text-amber-700"
                      : "text-muted-foreground/25 group-hover:text-muted-foreground/50"
                  }`}
                >
                  {String(rank).padStart(2, "0")}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm leading-snug mb-1.5 line-clamp-2 transition-colors duration-200 ${
                      isTop
                        ? "font-editorial font-semibold text-foreground group-hover:text-amber-700"
                        : "font-editorial font-medium text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {topic.title}
                  </p>
                  <div className="flex items-center gap-2">
                    {category && (
                      <span
                        className={`text-[9px] font-bold tracking-[0.15em] uppercase px-1.5 py-0.5 border ${
                          isTop
                            ? "border-amber-600/30 text-amber-700 bg-amber-50"
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        {category}
                      </span>
                    )}
                    <span className="text-[11px] text-muted-foreground/70 flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {formatViews(topic.views)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rule separator (not after last item) */}
              {rank < trendingTopics.length && (
                <hr className="magazine-rule ml-9" />
              )}
            </motion.li>
          );
        })}
      </motion.ol>
    </aside>
  );
}