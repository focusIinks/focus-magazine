"use client";

import { motion } from "framer-motion";
import {
  Eye,
  Circle,
  TrendingUp,
  Activity,
  Baby,
  Pill,
  Scan,
  Accessibility,
  Briefcase,
  Cpu,
  Monitor,
  Aperture,
  Brain,
  Globe,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { categories } from "@/lib/magazine-data";

const iconMap: Record<string, LucideIcon> = {
  Eye,
  Circle,
  TrendingUp,
  Activity,
  Baby,
  Pill,
  Scan,
  Accessibility,
  Briefcase,
  Cpu,
  Monitor,
  Aperture,
  Brain,
  Globe,
};

function CategoryCard({
  cat,
  index,
}: {
  cat: (typeof categories)[number];
  index: number;
}) {
  const Icon = iconMap[cat.icon] || Eye;

  // Parse the color string: "bg-teal-500/10 text-teal-700 dark:text-teal-400"
  const bgClass = cat.color.split(" ").find((c) => c.startsWith("bg-")) || "bg-primary/10";
  const textClasses = cat.color
    .split(" ")
    .filter((c) => c.startsWith("text-"))
    .join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.04 * index }}
    >
      <div className="group bg-card rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-5 flex flex-col items-center text-center cursor-pointer relative overflow-hidden">
        {/* Icon container */}
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center ${bgClass}`}
        >
          <Icon className={`w-6 h-6 ${textClasses}`} />
        </div>

        {/* Category name */}
        <h3 className="font-bold text-sm mt-3">{cat.name}</h3>

        {/* Article count pill */}
        <span className="mt-2 bg-muted text-muted-foreground text-[11px] rounded-full px-2.5 py-0.5 font-medium">
          {cat.count} articles
        </span>

        {/* Bottom accent line - grows on hover */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-primary transition-all duration-300" />
      </div>
    </motion.div>
  );
}

export function CategorySection() {
  return (
    <section id="categories" className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Left-aligned editorial */}
        <div className="mb-12">
          <span className="text-xs tracking-[0.2em] text-primary font-semibold uppercase">
            Topics
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Explore Specialties
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.name} cat={cat} index={i} />
          ))}
        </div>

        {/* View All Topics link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-200">
            View All Topics
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}