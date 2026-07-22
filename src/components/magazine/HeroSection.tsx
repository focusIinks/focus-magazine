"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, User } from "lucide-react";
import { articles } from "@/lib/magazine-data";

interface HeroSectionProps {
  onArticleOpen: (id: string) => void;
}

export function HeroSection({ onArticleOpen }: HeroSectionProps) {
  const featured = articles.find((a) => a.featured) || articles[0];

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 magazine-gradient" />
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 800 600" fill="none">
          <circle cx="650" cy="100" r="200" stroke="currentColor" strokeWidth="0.5" className="text-white/20" />
          <circle cx="650" cy="100" r="250" stroke="currentColor" strokeWidth="0.3" className="text-white/10" />
          <circle cx="650" cy="100" r="300" stroke="currentColor" strokeWidth="0.2" className="text-white/5" />
          <circle cx="150" cy="500" r="150" stroke="currentColor" strokeWidth="0.5" className="text-white/15" />
          <circle cx="150" cy="500" r="200" stroke="currentColor" strokeWidth="0.3" className="text-white/8" />
          {/* Eye shape */}
          <ellipse cx="400" cy="300" rx="120" ry="60" stroke="currentColor" strokeWidth="0.4" className="text-white/10" />
          <circle cx="400" cy="300" r="30" stroke="currentColor" strokeWidth="0.5" className="text-white/15" />
          <circle cx="400" cy="300" r="12" fill="currentColor" className="text-white/8" />
          {/* Grid lines */}
          <line x1="0" y1="200" x2="800" y2="200" stroke="currentColor" strokeWidth="0.2" className="text-white/5" />
          <line x1="0" y1="400" x2="800" y2="400" stroke="currentColor" strokeWidth="0.2" className="text-white/5" />
          <line x1="200" y1="0" x2="200" y2="600" stroke="currentColor" strokeWidth="0.2" className="text-white/5" />
          <line x1="600" y1="0" x2="600" y2="600" stroke="currentColor" strokeWidth="0.2" className="text-white/5" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Badge
              variant="secondary"
              className="mb-6 bg-white/15 text-white/90 border-white/20 hover:bg-white/20"
            >
              Featured Story
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6"
          >
            {featured.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl"
          >
            {featured.excerpt}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 text-white/70 text-sm mb-10"
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{featured.author.name}</span>
            </div>
            <span className="text-white/30">|</span>
            <span>{featured.date}</span>
            <span className="text-white/30">|</span>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{featured.readTime}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button
              size="lg"
              onClick={() => onArticleOpen(featured.id)}
              className="bg-white text-teal-900 hover:bg-white/90 font-semibold shadow-lg shadow-black/10"
            >
              Read Featured Article
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}