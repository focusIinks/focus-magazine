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

/* ── Color utilities ─────────────────────────────────────────── */

function extractHue(colorStr: string): string {
  const match = colorStr.match(/(?:bg|text)-([a-z]+)-\d/);
  return match ? match[1] : "primary";
}

const hueBorderMap: Record<string, string> = {
  teal: "border-l-teal-500/60",
  emerald: "border-l-emerald-500/60",
  cyan: "border-l-cyan-500/60",
  amber: "border-l-amber-500/60",
  rose: "border-l-rose-500/60",
  violet: "border-l-violet-500/60",
  orange: "border-l-orange-500/60",
  sky: "border-l-sky-500/60",
  lime: "border-l-lime-500/60",
  fuchsia: "border-l-fuchsia-500/60",
  indigo: "border-l-indigo-500/60",
  red: "border-l-red-500/60",
  purple: "border-l-purple-500/60",
};

const hueAccentBgMap: Record<string, string> = {
  teal: "bg-teal-500/8",
  emerald: "bg-emerald-500/8",
  cyan: "bg-cyan-500/8",
  amber: "bg-amber-500/8",
  rose: "bg-rose-500/8",
  violet: "bg-violet-500/8",
  orange: "bg-orange-500/8",
  sky: "bg-sky-500/8",
  lime: "bg-lime-500/8",
  fuchsia: "bg-fuchsia-500/8",
  indigo: "bg-indigo-500/8",
  red: "bg-red-500/8",
  purple: "bg-purple-500/8",
};

const hueIconMap: Record<string, string> = {
  teal: "text-teal-600 dark:text-teal-400 group-hover:text-teal-700 dark:group-hover:text-teal-300",
  emerald: "text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300",
  cyan: "text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300",
  amber: "text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300",
  rose: "text-rose-600 dark:text-rose-400 group-hover:text-rose-700 dark:group-hover:text-rose-300",
  violet: "text-violet-600 dark:text-violet-400 group-hover:text-violet-700 dark:group-hover:text-violet-300",
  orange: "text-orange-600 dark:text-orange-400 group-hover:text-orange-700 dark:group-hover:text-orange-300",
  sky: "text-sky-600 dark:text-sky-400 group-hover:text-sky-700 dark:group-hover:text-sky-300",
  lime: "text-lime-600 dark:text-lime-400 group-hover:text-lime-700 dark:group-hover:text-lime-300",
  fuchsia: "text-fuchsia-500 dark:text-fuchsia-400 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-300",
  indigo: "text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300",
  red: "text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300",
  purple: "text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300",
};

const hueHoverBorderMap: Record<string, string> = {
  teal: "group-hover:border-l-teal-500",
  emerald: "group-hover:border-l-emerald-500",
  cyan: "group-hover:border-l-cyan-500",
  amber: "group-hover:border-l-amber-500",
  rose: "group-hover:border-l-rose-500",
  violet: "group-hover:border-l-violet-500",
  orange: "group-hover:border-l-orange-500",
  sky: "group-hover:border-l-sky-500",
  lime: "group-hover:border-l-lime-500",
  fuchsia: "group-hover:border-l-fuchsia-500",
  indigo: "group-hover:border-l-indigo-500",
  red: "group-hover:border-l-red-500",
  purple: "group-hover:border-l-purple-500",
};

/* ── Animation ──────────────────────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

/* ── Large horizontal card ──────────────────────────────────── */

function LargeCard({ cat }: { cat: (typeof categories)[number] }) {
  const Icon = iconMap[cat.icon] || Eye;
  const hue = extractHue(cat.color);
  const borderClass = hueBorderMap[hue] || "border-l-primary/60";
  const accentBg = hueAccentBgMap[hue] || "bg-primary/8";
  const iconColor = hueIconMap[hue] || "text-primary";
  const hoverBorder = hueHoverBorderMap[hue] || "";

  return (
    <motion.div variants={itemVariants} className="group">
      <div
        className={[
          "flex items-stretch gap-5 p-5 transition-all duration-300",
          "hover:bg-muted/50 cursor-pointer",
          "border-l-[3px]",
          borderClass,
          hoverBorder,
        ].join(" ")}
      >
        <div
          className={`w-14 h-14 shrink-0 flex items-center justify-center transition-colors duration-300 ${accentBg}`}
        >
          <Icon className={`w-6 h-6 transition-colors duration-300 ${iconColor}`} />
        </div>

        <div className="flex-1 min-w-0 py-0.5">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h3 className="font-editorial text-xl font-bold tracking-tight">
              {cat.name}
            </h3>
            <span className="text-[11px] font-medium text-muted-foreground bg-muted px-2 py-0.5">
              {cat.count} articles
            </span>
          </div>
          {cat.description && (
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-1">
              {cat.description}
            </p>
          )}
        </div>

        <ArrowRight className="w-4 h-4 text-muted-foreground/30 self-center shrink-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-muted-foreground" />
      </div>
    </motion.div>
  );
}

/* ── Compact vertical card ──────────────────────────────────── */

function CompactCard({ cat }: { cat: (typeof categories)[number] }) {
  const Icon = iconMap[cat.icon] || Eye;
  const hue = extractHue(cat.color);
  const borderClass = hueBorderMap[hue] || "border-l-primary/60";
  const accentBg = hueAccentBgMap[hue] || "bg-primary/8";
  const iconColor = hueIconMap[hue] || "text-primary";
  const hoverBorder = hueHoverBorderMap[hue] || "";

  return (
    <motion.div variants={itemVariants} className="group">
      <div
        className={[
          "flex flex-col items-center text-center p-5 border border-border/60 transition-all duration-300",
          "hover:-translate-y-0.5 cursor-pointer",
          "border-l-[3px]",
          borderClass,
          hoverBorder,
        ].join(" ")}
      >
        <div
          className={`w-10 h-10 flex items-center justify-center transition-colors duration-300 ${accentBg}`}
        >
          <Icon className={`w-5 h-5 transition-colors duration-300 ${iconColor}`} />
        </div>
        <h4 className="mt-3 font-semibold text-sm tracking-tight">{cat.name}</h4>
        <span className="mt-1.5 text-[11px] text-muted-foreground font-medium">
          {cat.count} articles
        </span>
      </div>
    </motion.div>
  );
}

/* ── Main section ───────────────────────────────────────────── */

export function CategorySection() {
  const large1 = categories.slice(0, 2);
  const compact1 = categories.slice(2, 6);
  const large2 = categories.slice(6, 8);
  const compact2 = categories.slice(8, 14);

  return (
    <section id="categories" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 flex items-baseline gap-4 flex-wrap">
          <span className="editorial-badge text-[11px] tracking-[0.18em] font-semibold uppercase text-muted-foreground">
            Explore
          </span>
          <h2 className="font-editorial text-3xl md:text-4xl font-bold tracking-tight">
            Topics
          </h2>
          <div className="flex-1 h-px bg-border/60 min-w-[2rem]" />
        </div>

        {/* Row 1 — Two large horizontal cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 border border-border/60 border-b-0 md:divide-x divide-border/60"
        >
          {large1.map((cat) => (
            <LargeCard key={cat.name} cat={cat} />
          ))}
        </motion.div>

        {/* Row 2 — Four compact cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 sm:grid-cols-4 border border-t-0 border-border/60 divide-x divide-border/60 sm:divide-y-0 divide-y border-b-0"
        >
          {compact1.map((cat) => (
            <CompactCard key={cat.name} cat={cat} />
          ))}
        </motion.div>

        {/* Row 3 — Two more large horizontal cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 border border-t-0 border-border/60 border-b-0 md:divide-x divide-border/60"
        >
          {large2.map((cat) => (
            <LargeCard key={cat.name} cat={cat} />
          ))}
        </motion.div>

        {/* Row 4 — Remaining compact cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 sm:grid-cols-3 border border-t-0 border-border/60 divide-x divide-border/60 sm:divide-y-0 divide-y"
        >
          {compact2.map((cat) => (
            <CompactCard key={cat.name} cat={cat} />
          ))}
        </motion.div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="mt-10 flex justify-center"
        >
          <button className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 group">
            <span className="w-6 h-px bg-current" />
            View all topics
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}