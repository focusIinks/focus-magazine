"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { articles } from "@/lib/magazine-data";

interface EditorsPicksProps {
  onArticleOpen: (id: string) => void;
}

export function EditorsPicks({ onArticleOpen }: EditorsPicksProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const editorsPicks = articles.filter((a) => !a.featured).slice(0, 5);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-muted/30">
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
            Editor&apos;s Picks
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Curated for You</h2>
        </motion.div>

        {/* Carousel container */}
        <div className="relative">
          {/* Left arrow - always visible */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-white border border-border shadow-lg w-11 h-11 rounded-full flex items-center justify-center hover:bg-accent transition-colors hidden lg:flex"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right arrow - always visible */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-white border border-border shadow-lg w-11 h-11 rounded-full flex items-center justify-center hover:bg-accent transition-colors hidden lg:flex"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {editorsPicks.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className="min-w-[300px] w-72 shrink-0 snap-start"
              >
                <div
                  className="group/card cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
                  onClick={() => onArticleOpen(article.id)}
                >
                  {/* Gradient header */}
                  <div
                    className={`h-44 bg-gradient-to-br ${article.imageGradient} relative overflow-hidden shrink-0`}
                  >
                    {/* Frosted glass overlay at bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-black/20 backdrop-blur-sm" />
                    {/* Category badge */}
                    <span className="absolute bottom-3 left-4 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 border border-white/20">
                      {article.category}
                    </span>
                    {/* PICK badge */}
                    <span className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5">
                      PICK
                    </span>
                  </div>

                  {/* Body */}
                  <div className="px-5 py-4 flex flex-col flex-1">
                    <h3 className="font-bold text-sm leading-snug line-clamp-2 mb-2 group-hover/card:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
                        {article.author.initials}
                      </div>
                      <span className="font-medium truncate">{article.author.name.replace("Dr. ", "")}</span>
                      <span className="ml-auto shrink-0">{article.date}</span>
                    </div>
                    {/* Read more link */}
                    <div className="border-t border-border/50 mt-3 pt-3">
                      <span className="text-xs text-primary font-semibold group-hover/card:underline underline-offset-2">
                        Read More →
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}