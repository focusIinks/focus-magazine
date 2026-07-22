"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { articles, type Article } from "@/lib/magazine-data";

interface EditorsPicksProps {
  onArticleOpen: (id: string) => void;
}

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.08 * i, ease: "easeOut" as const },
  }),
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export function EditorsPicks({ onArticleOpen }: EditorsPicksProps) {
  const editorsPicks = articles.filter((a) => !a.featured).slice(0, 6);

  /* Embla setup */
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="py-20 md:py-28 bg-muted/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <motion.div
          variants={headerVariants}
          className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <span className="editorial-badge text-primary mb-3 inline-block">
              Editor&apos;s Picks
            </span>
            <p className="text-sm text-muted-foreground mt-3 max-w-md font-body">
              Hand-selected stories our editors believe will shape the
              conversation in optometry and vision science.
            </p>
          </div>

          {/* Arrow navigation */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="Previous"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center transition-colors duration-200 hover:border-primary hover:text-primary disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label="Next"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center transition-colors duration-200 hover:border-primary hover:text-primary disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* ── Embla Carousel ── */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {editorsPicks.map((article, i) => (
                <CarouselCard
                  key={article.id}
                  article={article}
                  index={i}
                  onOpen={onArticleOpen}
                />
              ))}
            </div>
          </div>

          {/* ── Dot Indicators ── */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {editorsPicks.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  idx === selectedIndex
                    ? "w-6 h-2 bg-primary"
                    : "w-2 h-2 bg-border hover:bg-muted-foreground/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/*  Card sub-component                                                 */
/* ------------------------------------------------------------------ */
interface CardProps {
  article: Article;
  index: number;
  onOpen: (id: string) => void;
}

function CarouselCard({ article, index, onOpen }: CardProps) {
  /* Access new fields — cast via `any` to avoid TS errors if data file
     hasn't been updated yet.  Falls back gracefully.                */
  const a = article as Article & {
    imageUrl?: string;
    imageCaption?: string;
    tags?: string[];
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      className="w-80 md:w-96 shrink-0"
    >
      <div
        onClick={() => onOpen(a.id)}
        className="group/card cursor-pointer bg-card border border-border flex flex-col h-full transition-all duration-300 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)] hover:border-primary/30"
      >
        {/* ── Image ── */}
        <div className="relative h-56 overflow-hidden shrink-0 bg-muted">
          {a.imageUrl ? (
            <img
              src={a.imageUrl}
              alt={a.imageCaption ?? a.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-[1.04]"
            />
          ) : (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${a.imageGradient}`}
            />
          )}

          {/* Category badge */}
          <span className="absolute top-3 left-3 text-[10px] font-bold tracking-[0.15em] uppercase bg-background/80 backdrop-blur-sm px-2.5 py-1 text-foreground">
            {a.category}
          </span>

          {/* Tags row */}
          {a.tags && a.tags.length > 0 && (
            <div className="absolute bottom-3 left-3 flex gap-1.5">
              {a.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] tracking-wider uppercase font-semibold bg-foreground/60 backdrop-blur-sm text-background px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Image caption overlay */}
          {a.imageCaption && (
            <span className="absolute bottom-3 right-3 text-[9px] text-background/70 font-body hidden group-hover/card:block">
              {a.imageCaption}
            </span>
          )}
        </div>

        {/* ── Content ── */}
        <div className="flex flex-col flex-1 p-5">
          {/* Category (mobile) + title */}
          <h3 className="font-editorial text-xl font-bold leading-tight line-clamp-2 mb-2 group-hover/card:text-primary transition-colors duration-200">
            {a.title}
          </h3>

          <p className="font-body text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
            {a.excerpt}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <span className="font-medium">{a.author.name}</span>
            <span className="text-border">·</span>
            <span>{a.date}</span>
            <span className="text-border">·</span>
            <Clock className="w-3 h-3 inline-block mr-0.5" />
            <span>{a.readTime}</span>
          </div>

          {/* Divider + Read More */}
          <div className="border-t border-border/60 pt-3">
            <span className="text-xs font-semibold text-primary tracking-wide uppercase group-hover/card:underline underline-offset-4 transition-all">
              Read More &rarr;
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}