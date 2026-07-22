"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/magazine-data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < rating
              ? "w-3.5 h-3.5 fill-amber-400 text-amber-400"
              : "w-3.5 h-3.5 fill-none text-white/20"
          }
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  return (
    <motion.div
      variants={cardVariants}
      className="border-t border-white/10 pt-8 flex flex-col"
    >
      {/* Large decorative opening quote */}
      <span className="font-editorial text-6xl leading-none text-white/15 select-none">
        &ldquo;
      </span>

      {/* Quote text */}
      <p className="font-body text-base leading-relaxed text-white/90 mt-2 flex-1">
        {testimonial.content}
      </p>

      {/* Star rating */}
      <div className="mt-6">
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Author */}
      <div className="mt-4">
        <p className="font-semibold text-white text-sm tracking-wide">
          {testimonial.name}
        </p>
        <p className="text-white/60 text-sm mt-0.5">
          {testimonial.role}, {testimonial.location}
        </p>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="relative py-24 md:py-32 bg-foreground text-background overflow-hidden">
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 md:mb-20">
          <span className="inline-block text-[11px] tracking-[0.2em] font-semibold uppercase bg-white/20 text-white px-3 py-1">
            What Readers Say
          </span>
        </div>

        {/* Testimonial cards — three columns with vertical dividers */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-white/10"
        >
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </motion.div>

        {/* Bottom decorative rule */}
        <div className="mt-16 border-t border-white/10" />
      </div>
    </section>
  );
}