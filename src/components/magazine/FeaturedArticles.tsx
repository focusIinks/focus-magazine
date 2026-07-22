"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { articles } from "@/lib/magazine-data";

interface FeaturedArticlesProps {
  onArticleOpen: (id: string) => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export function FeaturedArticles({ onArticleOpen }: FeaturedArticlesProps) {
  const featured = articles.filter((a) => a.featured).slice(0, 3);
  const main = featured[0];
  const side = featured.slice(1);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          className="mb-10 md:mb-14"
        >
          <div className="w-10 h-0.5 bg-teal-500 mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Featured Stories
          </h2>
        </motion.div>

        {/* Asymmetric grid: 7 + 5 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          {/* ── Large card — 7 cols ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUp}
            className="lg:col-span-7"
          >
            <article
              className="group cursor-pointer h-full rounded-none overflow-hidden border border-border/60 hover:shadow-lg transition-shadow duration-300"
              onClick={() => onArticleOpen(main.id)}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={main.imageUrl}
                  alt={main.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Body */}
              <div className="p-5 md:p-7">
                <span className="inline-block bg-amber-500 text-white text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-none mb-3">
                  {main.category}
                </span>

                <h3 className="text-xl md:text-2xl font-bold leading-snug text-foreground mb-2 group-hover:underline decoration-1 underline-offset-4 transition-all line-clamp-2">
                  {main.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                  {main.excerpt}
                </p>

                {/* Author row */}
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-semibold text-muted-foreground shrink-0">
                    {main.author.initials}
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">
                    {main.author.name}
                  </span>
                  <span className="text-muted-foreground/30">·</span>
                  <span className="text-xs text-muted-foreground">{main.date}</span>
                  <span className="text-muted-foreground/30">·</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {main.readTime}
                  </span>
                </div>
              </div>
            </article>
          </motion.div>

          {/* ── Smaller cards — 5 cols ── */}
          <div className="lg:col-span-5 flex flex-col gap-5 lg:gap-6">
            {side.map((article) => (
              <motion.article
                key={article.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                className="group cursor-pointer flex flex-col sm:flex-row lg:flex-col rounded-none overflow-hidden border border-border/60 hover:shadow-lg transition-shadow duration-300"
                onClick={() => onArticleOpen(article.id)}
              >
                {/* Image */}
                <div className="relative w-full sm:w-40 sm:shrink-0 lg:w-full aspect-[16/10] sm:aspect-auto lg:aspect-[16/9] overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                {/* Body */}
                <div className="flex-1 p-4 md:p-5">
                  <span className="inline-block bg-amber-500 text-white text-[10px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-none mb-2">
                    {article.category}
                  </span>

                  <h4 className="text-base font-bold leading-snug text-foreground mb-1.5 group-hover:underline decoration-1 underline-offset-4 transition-all line-clamp-2">
                    {article.title}
                  </h4>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>

                  {/* Author row */}
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[9px] font-semibold text-muted-foreground shrink-0">
                      {article.author.initials}
                    </div>
                    <span className="text-[11px] text-muted-foreground font-medium">
                      {article.author.name}
                    </span>
                    <span className="text-muted-foreground/30">·</span>
                    <span className="text-[11px] text-muted-foreground">{article.date}</span>
                    <span className="text-muted-foreground/30">·</span>
                    <span className="flex items-center gap-0.5 text-[11px] text-muted-foreground">
                      <Clock className="w-2.5 h-2.5" />
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}