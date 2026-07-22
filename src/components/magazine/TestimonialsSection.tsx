"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Focus Magazine has become my go-to resource for staying current with pediatric vision research. The myopia management articles alone have transformed how I approach young patients.",
    name: "Dr. Sarah Chen",
    designation: "Pediatric Optometrist, Singapore",
  },
  {
    quote:
      "The depth of clinical content is unmatched. From glaucoma management to practice growth strategies, every issue delivers actionable insights I implement immediately.",
    name: "Dr. James Okafor",
    designation: "Clinical Director, Lagos",
  },
  {
    quote:
      "As a contact lens specialist, I appreciate the detailed coverage of new materials and fitting techniques. The peer-reviewed quality gives me confidence in applying new methods.",
    name: "Dr. Maria Santos",
    designation: "Contact Lens Specialist, São Paulo",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px bg-background/20 flex-1" />
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight whitespace-nowrap">
            What Our Readers Say
          </h2>
          <div className="h-px bg-background/20 flex-1" />
        </div>
        <p className="text-center text-background/60 mb-12 max-w-2xl mx-auto">
          Trusted by optometrists and vision scientists across 60+ countries.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 * i }}
              className="bg-background/5 border border-background/10 rounded-xl p-6 md:p-8 flex flex-col"
            >
              {/* Quote Icon */}
              <svg
                className="w-8 h-8 mb-4 text-background/20 shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M11 7.05C7.21 7.54 4 11 4 15v4h6v-4H7.5c0-2.48 1.35-4.64 3.5-5.77V7.05zM18 7.05C14.21 7.54 11 11 11 15v4h6v-4h-2.5c0-2.48 1.35-4.64 3.5-5.77V7.05z" />
              </svg>

              {/* Quote Text */}
              <p className="text-lg leading-relaxed mb-6 flex-1 text-background/90">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Star Rating */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Author Info */}
              <div>
                <p className="font-bold">{t.name}</p>
                <p className="text-sm text-background/60">{t.designation}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}