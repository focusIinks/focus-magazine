"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

// Map category names to a shadow color for the glow effect
const categoryGlowMap: Record<string, string> = {
  "Clinical Refraction": "0 8px 30px rgba(20,184,166,0.3)",
  "Contact Lenses": "0 8px 30px rgba(16,185,129,0.3)",
  "Myopia Management": "0 8px 30px rgba(6,182,212,0.3)",
  Glaucoma: "0 8px 30px rgba(245,158,11,0.3)",
  "Pediatric Optometry": "0 8px 30px rgba(244,63,94,0.3)",
  "Ocular Pharmacology": "0 8px 30px rgba(139,92,246,0.3)",
  "Binocular Vision": "0 8px 30px rgba(249,115,22,0.3)",
  "Low Vision": "0 8px 30px rgba(14,165,233,0.3)",
  "Practice Management": "0 8px 30px rgba(132,204,22,0.3)",
  Technology: "0 8px 30px rgba(217,70,239,0.3)",
  Teleoptometry: "0 8px 30px rgba(99,102,241,0.3)",
  "Anterior Segment": "0 8px 30px rgba(239,68,68,0.3)",
  "Neuro-Ophthalmology": "0 8px 30px rgba(168,85,247,0.3)",
  "Public Health": "0 8px 30px rgba(20,184,166,0.3)",
};

function CategoryCard({
  cat,
  index,
}: {
  cat: (typeof categories)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = iconMap[cat.icon] || Eye;
  const glowShadow = categoryGlowMap[cat.name] || "0 8px 30px rgba(20,184,166,0.3)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.04 * index }}
    >
      <Card
        className="group cursor-pointer border-0 shadow-sm transition-all duration-300 hover:-translate-y-1 h-full relative overflow-visible"
        style={{
          boxShadow: hovered ? glowShadow : undefined,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Article count badge */}
        <span className="absolute -top-1.5 -right-1.5 z-10 bg-primary/10 text-primary text-[11px] font-bold rounded-full px-2 py-0.5 pointer-events-none">
          {cat.count}
        </span>
        <CardContent className="p-6 flex flex-col items-center text-center h-full">
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center mb-3 ${cat.color} group-hover:scale-110 transition-transform relative`}
          >
            {/* Subtle background pattern */}
            <div
              className="absolute inset-0 rounded-xl opacity-[0.15]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
                backgroundSize: "8px 8px",
              }}
            />
            <Icon className="w-7 h-7 relative z-[1]" />
          </div>
          <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
            {cat.name}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed mb-2 line-clamp-2">
            {cat.description}
          </p>
          <span className="text-[11px] text-muted-foreground/70 font-medium mt-auto">
            {cat.count} articles
          </span>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function CategorySection() {
  return (
    <section id="categories" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px bg-primary flex-1" />
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight whitespace-nowrap">
            Explore by Category
          </h2>
          <div className="h-px bg-primary flex-1" />
        </div>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Dive into specialized topics across the full spectrum of optometric
          care and vision science.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.name} cat={cat} index={i} />
          ))}
        </div>

        {/* View All Categories */}
        <div className="text-center mt-10">
          <Button variant="outline" className="px-6 group">
            View All Categories
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}