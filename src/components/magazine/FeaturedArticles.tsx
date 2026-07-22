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
        {/* Editorial section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-2">
            <span className="editorial-badge text-xs tracking-[0.25em] text-primary font-bold uppercase">
              Featured
            </span>
          </div>
          <h2 className="font-editorial text-3xl md:text-4xl font-bold text-foreground">
            Cover Stories
          </h2>
          <div className="magazine-rule mt-4 h-px w-full bg-gradient-to-r from-foreground via-foreground/40 to-transparent" />
        </motion.div>

        {/* Asymmetric magazine grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-6"
        >
          {/* ── Main story — col-span-7 ── */}
          <motion.div variants={item} className="lg:col-span-7 lg:row-span-2">
            <div
              className="group cursor-pointer relative rounded-none overflow-hidden h-full min-h-[520px] md:min-h-[580px] transition-all duration-700"
              onClick={() => onArticleOpen(main.id)}
            >
              {/* Image or gradient fallback */}
              {main.imageUrl ? (
                <img
                  src={main.imageUrl}
                  alt={main.imageCaption || main.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${main.imageGradient}`}
                />
              )}

              {/* Editorial overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-amber-500 text-white text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-none">
                    {main.category}
                  </span>
                  <span className="text-white/50 text-[10px] font-bold tracking-[0.15em] uppercase">
                    Cover Story
                  </span>
                </div>

                <h3 className="font-editorial text-2xl md:text-4xl font-bold text-white leading-[1.1] mb-3 max-w-2xl">
                  {main.title}
                </h3>

                <p className="text-white/65 text-sm md:text-base leading-relaxed mb-5 line-clamp-2 max-w-xl">
                  {main.excerpt}
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white text-xs font-bold">
                    {main.author.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-medium">
                      {main.author.name}
                    </span>
                    <span className="text-white/45 text-xs tracking-wide">
                      {main.date} &middot; {main.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Side stories — col-span-5 ── */}
          {side.map((article, i) => (
            <motion.div
              key={article.id}
              variants={item}
              className="lg:col-span-5 mt-6 lg:mt-0"
            >
              <div
                className="group cursor-pointer relative rounded-none overflow-hidden bg-white border border-border border-l-4 border-l-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 h-full"
                onClick={() => onArticleOpen(article.id)}
              >
                {/* Large number watermark */}
                <span className="absolute top-4 right-6 z-10 text-7xl md:text-8xl font-black text-primary/[0.06] select-none leading-none pointer-events-none">
                  {String(i + 2).padStart(2, "0")}
                </span>

                {/* Top image area */}
                <div className="relative h-48 overflow-hidden">
                  {article.imageUrl ? (
                    <img
                      src={article.imageUrl}
                      alt={article.imageCaption || article.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${article.imageGradient}`}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-3 left-4 bg-amber-500 text-white text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-none">
                    {article.category}
                  </span>
                </div>

                {/* Card body */}
                <div className="p-5 md:p-6">
                  <h4 className="font-editorial font-bold text-base md:text-lg leading-snug mb-2 text-foreground group-hover:underline decoration-primary decoration-2 underline-offset-4 transition-all line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-4 line-clamp-2">
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