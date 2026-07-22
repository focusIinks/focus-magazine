"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
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
          Dive into specialized topics across the full spectrum of optometric care and vision science.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Eye;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.04 * i }}
              >
                <Card className="group cursor-pointer border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <CardContent className="p-5 flex flex-col items-center text-center h-full">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${cat.color} group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
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
          })}
        </div>
      </div>
    </section>
  );
}