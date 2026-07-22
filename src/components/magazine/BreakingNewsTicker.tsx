'use client';

export default function BreakingNewsTicker() {
  const headlines = [
    'WHO Updates Myopia Guidelines for 2026',
    'New ROCK Inhibitor Receives FDA Approval',
    'AI-Based Retinal Screening Now Covered by Insurance',
    'Scleral Lens Market Projected to Hit $5B by 2028',
    'Teleoptometry Legislation Advances in 12 States',
    'Novel Gene Therapy Shows Promise for Inherited Retinal Disease',
    'Low Vision Devices Market Sees 40% Growth',
    'Ortho-K Safety Data Reassures Practitioners',
  ];

  const separator = ' \u2022 ';

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
          animation: ticker-scroll 30s linear infinite;
        }
      `}</style>
      <div className="w-full h-9 flex items-center bg-primary/5 dark:bg-primary/10 border-b border-border overflow-hidden">
        <span className="shrink-0 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded ml-4 mr-3">
          BREAKING
        </span>
        <div className="overflow-hidden flex-1">
          <div className="ticker-track flex whitespace-nowrap">
            {[...headlines, ...headlines].map((headline, index) => (
              <span
                key={index}
                className="text-sm text-muted-foreground"
              >
                {headline}
                {index < headlines.length * 2 - 1 ? separator : ''}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}