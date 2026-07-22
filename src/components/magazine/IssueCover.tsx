"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { articles } from "@/lib/magazine-data";

interface IssueCoverProps {
  onArticleOpen: (id: string) => void;
}

const issueArticles = articles.slice(0, 6);

const coverTitles = [
  "Advances in Myopia Control",
  "The Future of OCT Angiography",
  "Pediatric Vision Screening",
];

export default function IssueCover({ onArticleOpen }: IssueCoverProps) {
  return (
    <section className="w-full bg-muted/50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT — Magazine Cover Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[380px] transition-all duration-500 hover:rotate-0 hover:shadow-xl rotate-1 shadow-2xl">
              {/* Cover */}
              <div className="aspect-[3/4] rounded-md bg-gradient-to-br from-teal-800 to-teal-950 relative overflow-hidden flex flex-col p-8">
                {/* Watermark Issue Number */}
                <span className="absolute top-6 right-6 text-6xl font-black text-white/10 select-none leading-none">
                  47
                </span>

                {/* Title Block */}
                <div className="mb-auto">
                  <h3 className="text-5xl font-black text-white tracking-tight leading-none">
                    FOCUS
                  </h3>
                  <p className="text-sm tracking-[0.3em] text-teal-300 uppercase mt-2">
                    MAGAZINE
                  </p>
                </div>

                {/* Gold Separator */}
                <div className="w-16 h-0.5 bg-amber-400 mb-6" />

                {/* Date */}
                <p className="text-xs tracking-widest text-amber-400 uppercase mb-6">
                  July 2026
                </p>

                {/* Article List */}
                <div className="space-y-3 mb-8">
                  {coverTitles.map((title, i) => (
                    <div key={title} className="flex items-start gap-3">
                      <span className="text-amber-400/60 text-sm font-mono shrink-0 mt-0.5">
                        0{i + 1}
                      </span>
                      <span className="text-sm text-white/90 font-medium leading-snug">
                        {title}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Barcode decoration */}
                <div className="flex items-end gap-1">
                  {[24, 32, 18, 28, 14, 22, 10, 26].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 rounded-sm"
                      style={{ height: `${h}px`, backgroundColor: "rgba(255,255,255,0.1)" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Editorial Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="flex flex-col"
          >
            <span className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">
              Current Issue
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              July 2026
            </h2>

            <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-xl">
              This issue explores the convergence of clinical innovation and
              technological disruption in optometry. From AI-enhanced OCT
              angiography to next-generation myopia control, our contributors
              examine the tools and techniques redefining patient care.
            </p>

            {/* In This Issue */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                In This Issue
              </h3>
              <ul className="space-y-3">
                {issueArticles.map((article) => (
                  <li key={article.id}>
                    <button
                      type="button"
                      onClick={() => onArticleOpen(article.id)}
                      className="flex items-start gap-3 text-left group cursor-pointer w-full"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                      <span className="text-sm text-foreground/80 group-hover:text-primary transition-colors leading-snug group-hover:underline underline-offset-2 decoration-primary/30">
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
                className="rounded-none px-8 py-3 h-auto text-sm font-semibold tracking-wide uppercase"
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