"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { articles } from "@/lib/magazine-data";
import type { Article } from "@/lib/magazine-data";

interface LatestArticlesProps {
  onArticleOpen: (id: string) => void;
}

const displayedArticles = articles.slice(3, 9);

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function ArticleCard({
  article,
  onOpen,
}: {
  article: Article;
  onOpen: (id: string) => void;
}) {
  return (
    <motion.article
      variants={cardVariants}
      className="group cursor-pointer bg-white border border-border/60 hover:border-border hover:shadow-lg transition-shadow duration-300"
      onClick={() => onOpen(article.id)}
    >
      {/* Image */}
      <div className="overflow-hidden">
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt={article.imageCaption || article.title}
            className="w-full aspect-[16/10] object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
        ) : (
          <div
            className={`w-full aspect-[16/10] bg-gradient-to-br ${article.imageGradient} group-hover:scale-[1.03] transition-transform duration-500`}
          />
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category Badge */}
        <span className="inline-block text-[10px] font-bold tracking-[0.14em] uppercase text-primary mb-2.5">
          {article.category}
        </span>

        {/* Title */}
        <h3 className="font-editorial font-bold text-base leading-snug mb-2 group-hover:underline decoration-primary/60 underline-offset-2 transition-all duration-200 line-clamp-2">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-1 mb-3">
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/80">
            {article.author.name.replace("Dr. ", "")}
          </span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>{article.date}</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function LatestArticles({ onArticleOpen }: LatestArticlesProps) {
  return (
    <section className="py-16 md:py-24 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-14"
        >
          <h2 className="font-editorial text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            Latest Stories
          </h2>
          <div className="w-12 h-0.5 bg-primary" />
        </motion.div>

        {/* Article Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {displayedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onOpen={onArticleOpen}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}