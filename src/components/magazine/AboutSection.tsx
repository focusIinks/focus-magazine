"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "50K+", label: "Readers Worldwide" },
  { value: "200+", label: "Expert Contributors" },
  { value: "20+", label: "Clinical Specialties" },
  { value: "47", label: "Issues Published" },
];

function StatCounter({
  value,
  label,
  isLast,
}: {
  value: string;
  label: string;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="flex items-center gap-6 sm:gap-8 md:gap-10 flex-1 justify-center">
      <motion.div
        ref={ref}
        className="flex flex-col items-center text-center px-2"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <span className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold text-primary leading-none">
          {value}
        </span>
        <span className="font-body text-sm sm:text-base text-muted-foreground mt-2 tracking-wide">
          {label}
        </span>
      </motion.div>

      {!isLast && (
        <div className="magazine-rule-vertical h-14 sm:h-16 shrink-0" />
      )}
    </div>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="section-padding-lg"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="editorial-badge text-primary mb-3 block">
            About
          </span>
          <h2
            id="about-heading"
            className="editorial-headline text-3xl sm:text-4xl md:text-5xl text-foreground"
          >
            About Focus Magazine
          </h2>
          <div className="magazine-divider mx-auto mt-5" />
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: 0.15,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="max-w-3xl mx-auto mb-14 md:mb-20 space-y-5"
        >
          <p className="font-body text-base sm:text-lg leading-relaxed text-foreground/80 text-balance">
            Focus Magazine is the leading independent publication for
            optometrists and vision scientists committed to evidence-based
            clinical practice. Since our first issue, we have provided a
            rigorously curated space where peer-reviewed research, expert
            commentary, and real-world case studies converge to advance the
            standard of eye care worldwide.
          </p>
          <p className="font-body text-base sm:text-lg leading-relaxed text-foreground/80 text-balance">
            Every article is reviewed by practicing clinicians and active
            researchers, ensuring that the content we publish is not merely
            informative but immediately applicable. From myopia management and
            advanced diagnostic imaging to ocular disease and patient-centered
            care, Focus Magazine bridges the gap between laboratory discovery
            and the exam room.
          </p>
        </motion.div>

        {/* Stat Counters */}
        <div className="bg-card border border-border p-6 sm:p-8 md:p-10">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center">
            {stats.map((stat, i) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                label={stat.label}
                isLast={i === stats.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
