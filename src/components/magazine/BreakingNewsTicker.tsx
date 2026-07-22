'use client';

import { breakingNews } from '@/lib/magazine-data';
import { motion } from 'framer-motion';

const fallbackHeadlines = [
  'WHO Updates Myopia Guidelines for 2026 — Recommends Annual Screening for Children Under 12',
  'New ROCK Inhibitor Sustained-Release Implant Receives FDA Breakthrough Designation',
  'AI-Based Retinal Screening Now Covered by Major Insurance Providers in the US',
  'Global Scleral Lens Market Projected to Reach $5.2 Billion by 2028',
  'Teleoptometry Legislation Advances in 12 US States — AOA Advocacy Campaign Shows Results',
  'Novel Gene Therapy for Inherited Retinal Disease Shows Promise in Phase II Trials',
  'Low Vision Assistive Technology Market Sees 40% Year-over-Year Growth',
  'Ortho-K Long-Term Safety Data: 20-Year Follow-Up Study Published in Ophthalmology',
];

const categorizedHeadlines = breakingNews.length > 0
  ? breakingNews.map((item) => ({ category: item.category, title: item.title }))
  : fallbackHeadlines.map((h) => {
      const dashIdx = h.indexOf('—');
      const colonIdx = h.indexOf(':');
      let cat = 'LATEST';
      if (dashIdx > 0 && dashIdx < 50) cat = h.slice(0, dashIdx).trim();
      else if (colonIdx > 0 && colonIdx < 50) cat = h.slice(0, colonIdx).trim();
      return { category: cat, title: h };
    });

export default function BreakingNewsTicker() {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-10 flex items-center bg-foreground text-background overflow-hidden border-l-[3px] border-amber-500"
    >
      {/* BREAKING label with pulsing dot */}
      <div className="shrink-0 flex items-center gap-2 px-3.5 border-r border-white/10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
        </span>
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-amber-400 select-none">
          Breaking
        </span>
      </div>

      {/* Scrolling content */}
      <div className="overflow-hidden flex-1">
        <div className="ticker-track flex whitespace-nowrap">
          {[...categorizedHeadlines, ...categorizedHeadlines].map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center text-xs tracking-wider uppercase"
            >
              <span className="text-amber-400/90 font-semibold mr-2">
                {item.category}
              </span>
              <span className="text-white/90 font-light">
                {item.title}
              </span>
              {index < categorizedHeadlines.length * 2 - 1 && (
                <span className="text-white/20 mx-4 text-[8px]">◆</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}