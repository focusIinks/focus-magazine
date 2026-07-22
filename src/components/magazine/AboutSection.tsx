"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Layers, PenTool } from "lucide-react";

const stats = [
  {
    label: "Active Readers",
    value: "50K+",
    icon: Users,
    desc: "Optometrists & eye care professionals worldwide",
  },
  {
    label: "Published Articles",
    value: "200+",
    icon: BookOpen,
    desc: "Peer-reviewed clinical and practice content",
  },
  {
    label: "Specialty Categories",
    value: "18",
    icon: Layers,
    desc: "Comprehensive coverage across optometry",
  },
  {
    label: "Expert Authors",
    value: "100+",
    icon: PenTool,
    desc: "Leading clinicians and researchers",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Label */}
        <span className="text-xs tracking-[0.2em] text-primary font-semibold uppercase">
          Our Mission
        </span>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mt-2"
        >
          About Focus Magazine
        </motion.h2>

        {/* Decorative line */}
        <div className="w-16 h-0.5 bg-primary mx-auto mt-4 mb-6" />

        {/* Main paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto"
        >
          Focus Magazine is the premier digital publication dedicated to
          advancing the science and practice of optometry. Founded with a
          mission to bridge the gap between clinical research and everyday
          practice, we deliver evidence-based content covering the full spectrum
          of eye care — from cutting-edge diagnostic technology and myopia
          management breakthroughs to practice growth strategies and regulatory
          updates. Our editorial team curates content from over 100 leading
          optometric clinicians, researchers, and industry experts to ensure
          that every article provides actionable insights for today&apos;s eye
          care professional.
        </motion.p>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="bg-card rounded-xl p-6 shadow-sm text-center"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              {/* Number */}
              <div className="text-3xl font-bold text-primary">{stat.value}</div>
              {/* Label */}
              <div className="text-sm font-semibold mt-1">{stat.label}</div>
              {/* Description */}
              <p className="text-xs text-muted-foreground mt-1">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}