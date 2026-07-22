"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
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
    const amount = direction === "left" ? -340 : 340;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px bg-primary flex-1" />
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight whitespace-nowrap">
            Editor&apos;s Picks
          </h2>
          <div className="h-px bg-primary flex-1" />
        </div>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Hand-selected articles our editorial team believes every optometrist should read.
        </p>

        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 bg-card border border-border shadow-md rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-accent"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 bg-card border border-border shadow-md rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-accent"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
          >
            {editorsPicks.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className="min-w-[320px] w-80 shrink-0 snap-start"
              >
                <div
                  className="group/card cursor-pointer bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
                  onClick={() => onArticleOpen(article.id)}
                >
                  {/* Gradient Header */}
                  <div
                    className={`h-48 bg-gradient-to-br ${article.imageGradient} relative overflow-hidden shrink-0`}
                  >
                    <div className="absolute inset-0 bg-black/10 group-hover/card:bg-black/5 transition-colors" />
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs">
                        {article.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold mb-2 group-hover/card:text-primary transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-3 border-t border-border/50">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                          {article.author.initials}
                        </div>
                        <span className="font-medium truncate max-w-[120px]">
                          {article.author.name.replace("Dr. ", "")}
                        </span>
                      </div>
                      <span>{article.date}</span>
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