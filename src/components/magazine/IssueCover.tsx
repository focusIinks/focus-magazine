"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { articles } from "@/lib/magazine-data";

interface IssueCoverProps {
  onArticleOpen: (id: string) => void;
}

const issueArticles = articles.slice(0, 6);

const coverStories = [
  "Advances in Myopia Control",
  "The Future of OCT Angiography",
  "Pediatric Vision Screening",
  "Neuro-Optometry Breakthroughs",
];

export default function IssueCover({ onArticleOpen }: IssueCoverProps) {
  return (
    <section className="w-full bg-background py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT — Magazine Cover Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-start"
            style={{ perspective: "800px" }}
          >
            <div className="relative w-full max-w-[380px] group">
              {/* Surface shadow — suggests the cover lies on a table */}
              <div className="absolute -bottom-4 left-[8%] right-[8%] h-8 bg-black/15 blur-xl rounded-[2px]" />
              <div className="absolute -bottom-2 left-[4%] right-[4%] h-4 bg-black/20 blur-lg rounded-[1px]" />

              {/* The cover itself */}
              <div
                className="relative aspect-[3/4] rounded-[2px] bg-gradient-to-br from-teal-800 via-teal-900 to-teal-950 overflow-hidden flex flex-col transition-all duration-700 ease-out group-hover:rotate-y-3 group-hover:rotate-x-1 group-hover:scale-[1.02] group-hover:shadow-2xl shadow-xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Paper texture noise overlay */}
                <div
                  className="absolute inset-0 z-10 pointer-events-none opacity-[0.06]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: "128px 128px",
                    mixBlendMode: "overlay",
                  }}
                />

                {/* Subtle light reflection at top */}
                <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-white/[0.04] via-transparent to-transparent" />

                {/* Gold border frame */}
                <div className="absolute inset-3 border border-amber-400/30 rounded-[1px] z-20 pointer-events-none" />

                {/* Cover content */}
                <div className="relative z-30 flex flex-col h-full p-8">
                  {/* Watermark Issue Number */}
                  <span className="absolute top-6 right-6 text-7xl font-black text-white/[0.06] select-none leading-none tracking-tighter">
                    47
                  </span>

                  {/* Title Block */}
                  <div className="mb-auto">
                    <h3 className="font-editorial text-6xl font-black text-white tracking-tight leading-[0.9]">
                      FOCUS
                    </h3>
                    <p className="text-xs tracking-[0.4em] text-amber-300/80 uppercase mt-2 font-medium">
                      MAGAZINE
                    </p>
                  </div>

                  {/* Gold Separator */}
                  <div className="w-12 h-[2px] bg-gradient-to-r from-amber-400/80 to-amber-400/20 mb-5" />

                  {/* Cover Stories with elegant numbering */}
                  <div className="space-y-3.5 mb-6">
                    {coverStories.map((title, i) => (
                      <div key={title} className="flex items-start gap-3">
                        <span className="text-amber-400/50 text-[11px] font-mono tabular-nums shrink-0 mt-0.5 tracking-wider">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[13px] text-white/85 font-medium leading-snug tracking-wide">
                          {title}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom: Barcode + Issue info */}
                  <div className="mt-auto flex items-end justify-between">
                    <div className="flex items-end gap-[3px]">
                      {[24, 32, 18, 28, 14, 22, 10, 26, 16, 20, 12, 30, 8, 24, 18, 28, 14, 10, 22, 16].map((h, i) => (
                        <div
                          key={i}
                          className="rounded-[0.5px]"
                          style={{
                            width: i % 3 === 0 ? "3px" : "2px",
                            height: `${h}px`,
                            backgroundColor: "rgba(255,255,255,0.12)",
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-[9px] tracking-[0.2em] text-white/30 uppercase font-mono">
                      ISSUE 47 · JULY 2026
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Thin vertical rule (visible on lg) */}
          <div className="hidden lg:block absolute left-1/2 top-12 bottom-12 w-px bg-border/40" />

          {/* RIGHT — Editorial Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="flex flex-col"
          >
            <span className="editorial-badge text-xs font-semibold tracking-widest text-primary uppercase mb-3">
              Current Issue
            </span>

            <h2 className="font-editorial text-4xl md:text-5xl font-bold text-foreground mb-6 leading-[1.1]">
              July 2026
            </h2>

            <p className="font-body text-base leading-relaxed text-muted-foreground mb-8 max-w-xl">
              This issue explores the convergence of clinical innovation and
              technological disruption in optometry. From AI-enhanced OCT
              angiography to next-generation myopia control, our contributors
              examine the tools and techniques redefining patient care.
            </p>

            {/* In This Issue */}
            <div className="mb-10">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-5">
                In This Issue
              </h3>
              <ul className="space-y-3.5">
                {issueArticles.map((article) => (
                  <li key={article.id}>
                    <button
                      type="button"
                      onClick={() => onArticleOpen(article.id)}
                      className="flex items-start gap-3 text-left group cursor-pointer w-full"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2 group-hover:bg-primary transition-colors duration-200" />
                      <span className="text-sm text-foreground/70 group-hover:text-primary transition-colors duration-200 leading-snug group-hover:underline underline-offset-2 decoration-primary/30">
                        {article.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Button
                variant="default"
                className="rounded-none px-8 py-3 h-auto text-sm font-semibold tracking-[0.1em] uppercase bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => onArticleOpen(issueArticles[0].id)}
              >
                Read Full Issue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}