'use client';

import { breakingNews } from '@/lib/magazine-data';

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

const headlines = breakingNews.length > 0 ? breakingNews : fallbackHeadlines;

export default function BreakingNewsTicker() {
  return (
    <>
      <style>{`
        @keyframes ticker-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .ticker-track {
          animation: ticker-scroll 40s linear infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="w-full h-10 flex items-center bg-foreground text-background overflow-hidden">
        <span className="shrink-0 bg-red-600 text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1">
          LATEST
        </span>
        <div className="overflow-hidden flex-1 scrollbar-hide">
          <div className="ticker-track flex whitespace-nowrap">
            {[...headlines, ...headlines].map((headline, index) => (
              <span
                key={index}
                className="text-sm text-background/70"
              >
                {headline}
                {index < headlines.length * 2 - 1 && (
                  <span className="text-red-500 mx-4">●</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}