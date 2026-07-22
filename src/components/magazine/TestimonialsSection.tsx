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

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.12 * index }}
      className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm relative overflow-hidden flex flex-col"
    >
      {/* Opening quote mark */}
      <span className="text-5xl text-primary/30 font-serif leading-none select-none">
        &ldquo;
      </span>

      {/* Quote text */}
      <p className="text-base leading-relaxed text-white/80 italic mt-3 flex-1">
        {testimonial.quote}
      </p>

      {/* Divider */}
      <div className="w-8 h-px bg-white/20 my-5" />

      {/* Star rating */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, si) => (
          <Star
            key={si}
            className="w-4 h-4 fill-amber-400 text-amber-400"
          />
        ))}
      </div>

      {/* Author info */}
      <div>
        <p className="font-bold text-white">{testimonial.name}</p>
        <p className="text-sm text-white/50">{testimonial.designation}</p>
      </div>

      {/* Large decorative closing quote mark */}
      <span className="absolute bottom-2 right-4 text-8xl text-white/5 font-serif leading-none select-none rotate-180">
        &ldquo;
      </span>
    </motion.div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Left-aligned editorial */}
        <div className="mb-12">
          <span className="text-xs tracking-[0.2em] text-background/40 font-semibold uppercase">
            Reviewers
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            What Our Readers Say
          </h2>
        </div>

        {/* Testimonial cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}