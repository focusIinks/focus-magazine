"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Layers, PenTool } from "lucide-react";

const stats = [
  { label: "Active Readers", value: "50K+", icon: Users, desc: "Optometrists & eye care professionals worldwide" },
  { label: "Published Articles", value: "200+", icon: BookOpen, desc: "Peer-reviewed clinical and practice content" },
  { label: "Specialty Categories", value: "18", icon: Layers, desc: "Comprehensive coverage across optometry" },
  { label: "Expert Authors", value: "100+", icon: PenTool, desc: "Leading clinicians and researchers" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px bg-primary flex-1" />
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight whitespace-nowrap">
            About Focus Magazine
          </h2>
          <div className="h-px bg-primary flex-1" />
        </div>

        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-muted-foreground leading-relaxed text-lg"
          >
            Focus Magazine is the premier digital publication dedicated to advancing the science and
            practice of optometry. Founded with a mission to bridge the gap between clinical research and
            everyday practice, we deliver evidence-based content covering the full spectrum of eye care —
            from cutting-edge diagnostic technology and myopia management breakthroughs to practice growth
            strategies and regulatory updates. Our editorial team curates content from over 100 leading
            optometric clinicians, researchers, and industry experts to ensure that every article provides
            actionable insights for today&apos;s eye care professional.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="bg-card rounded-xl border border-border p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="font-semibold text-sm mb-1">{stat.label}</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}