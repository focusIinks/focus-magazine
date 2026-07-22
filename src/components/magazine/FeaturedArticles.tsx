"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { articles } from "@/lib/magazine-data";

interface FeaturedArticlesProps {
  onArticleOpen: (id: string) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function FeaturedArticles({ onArticleOpen }: FeaturedArticlesProps) {
  const featured = articles.filter((a) => a.featured);
  const main = featured[0];
  const side = featured.slice(1, 3);

  return (
    <section className="py-20 md:py-24 bg-background">
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
            Featured
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Cover Stories</h2>
        </motion.div>

        {/* Asymmetric magazine grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* Main story - col-span-7, row-span-2 */}
          <motion.div variants={item} className="lg:col-span-7 lg:row-span-2">
            <div
              className="group cursor-pointer relative rounded-xl overflow-hidden h-full min-h-[480px] transition-all duration-500 hover:brightness-110 hover:scale-[1.005]"
              onClick={() => onArticleOpen(main.id)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${main.imageGradient}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-amber-500 text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1">
                    {main.category}
                  </span>
                  <span className="text-white/50 text-[10px] font-bold tracking-wider uppercase">
                    Cover Story
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3">
                  {main.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-2 max-w-xl">
                  {main.excerpt}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xs font-bold">
                    {main.author.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-medium">
                      {main.author.name}
                    </span>
                    <span className="text-white/50 text-xs">
                      {main.date} · {main.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Side stories - col-span-5 */}
          {side.map((article, i) => (
            <motion.div
              key={article.id}
              variants={item}
              className="lg:col-span-5"
            >
              <div
                className="group cursor-pointer relative rounded-xl overflow-hidden bg-white transition-all duration-300 hover:border-l-4 hover:border-l-primary hover:shadow-lg h-full border border-border"
                onClick={() => onArticleOpen(article.id)}
              >
                <span className="absolute top-4 right-4 z-10 text-6xl font-black text-primary/10 select-none leading-none">
                  {String(i + 2).padStart(2, "0")}
                </span>
                <div
                  className={`h-44 bg-gradient-to-br ${article.imageGradient} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/10" />
                  <span className="absolute bottom-3 left-4 bg-amber-500 text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1">
                    {article.category}
                  </span>
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="font-medium">{article.author.name}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                    <span>{article.date}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}