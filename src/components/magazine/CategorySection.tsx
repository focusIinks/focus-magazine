"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/magazine-data";
import type { Category } from "@/lib/magazine-data";

/* ── Filter to the 8 required topics ─────────────────────────── */

const REQUIRED_NAMES = [
  "Clinical Optometry",
  "Myopia Management",
  "Contact Lenses",
  "Glaucoma",
  "Technology",
  "Practice Management",
  "Retina",
  "Cornea",
] as const;

/** Find a matching category from the data, or create a fallback */
function resolveCategories(): Category[] {
  // Map of loose name → canonical data name for known close-matches
  const aliasMap: Record<string, string> = {
    "Clinical Optometry": "Clinical Refraction",
    Retina: "Diagnostic Technology",
    Cornea: "Anterior Segment",
  };

  return REQUIRED_NAMES.map((name) => {
    const exact = categories.find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );
    if (exact) return exact;

    const alias = aliasMap[name];
    const aliased = alias
      ? categories.find((c) => c.name === alias)
      : undefined;
    if (aliased) return { ...aliased, name };

    // Final fallback
    return {
      name,
      icon: "Eye",
      count: 0,
      description: "",
      color: "teal",
    };
  });
}

const displayCategories = resolveCategories();

/* ── Color mapping ───────────────────────────────────────────── */

const colorBgMap: Record<string, string> = {
  teal: "bg-teal-500/10 group-hover:bg-teal-500/20",
  emerald: "bg-emerald-500/10 group-hover:bg-emerald-500/20",
  cyan: "bg-cyan-500/10 group-hover:bg-cyan-500/20",
  amber: "bg-amber-500/10 group-hover:bg-amber-500/20",
  rose: "bg-rose-500/10 group-hover:bg-rose-500/20",
  violet: "bg-violet-500/10 group-hover:bg-violet-500/20",
  orange: "bg-orange-500/10 group-hover:bg-orange-500/20",
  sky: "bg-sky-500/10 group-hover:bg-sky-500/20",
  indigo: "bg-indigo-500/10 group-hover:bg-indigo-500/20",
  red: "bg-red-500/10 group-hover:bg-red-500/20",
  purple: "bg-purple-500/10 group-hover:bg-purple-500/20",
  slate: "bg-slate-500/10 group-hover:bg-slate-500/20",
  blue: "bg-blue-500/10 group-hover:bg-blue-500/20",
  green: "bg-green-500/10 group-hover:bg-green-500/20",
  lime: "bg-lime-500/10 group-hover:bg-lime-500/20",
  fuchsia: "bg-fuchsia-500/10 group-hover:bg-fuchsia-500/20",
};

const colorSquareMap: Record<string, string> = {
  teal: "bg-teal-500",
  emerald: "bg-emerald-500",
  cyan: "bg-cyan-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
  violet: "bg-violet-500",
  orange: "bg-orange-500",
  sky: "bg-sky-500",
  indigo: "bg-indigo-500",
  red: "bg-red-500",
  purple: "bg-purple-500",
  slate: "bg-slate-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  lime: "bg-lime-500",
  fuchsia: "bg-fuchsia-500",
};

const colorHoverBg: Record<string, string> = {
  teal: "hover:bg-teal-50/80 dark:hover:bg-teal-950/30",
  emerald: "hover:bg-emerald-50/80 dark:hover:bg-emerald-950/30",
  cyan: "hover:bg-cyan-50/80 dark:hover:bg-cyan-950/30",
  amber: "hover:bg-amber-50/80 dark:hover:bg-amber-950/30",
  rose: "hover:bg-rose-50/80 dark:hover:bg-rose-950/30",
  violet: "hover:bg-violet-50/80 dark:hover:bg-violet-950/30",
  orange: "hover:bg-orange-50/80 dark:hover:bg-orange-950/30",
  sky: "hover:bg-sky-50/80 dark:hover:bg-sky-950/30",
  indigo: "hover:bg-indigo-50/80 dark:hover:bg-indigo-950/30",
  red: "hover:bg-red-50/80 dark:hover:bg-red-950/30",
  purple: "hover:bg-purple-50/80 dark:hover:bg-purple-950/30",
  slate: "hover:bg-slate-50/80 dark:hover:bg-slate-950/30",
  blue: "hover:bg-blue-50/80 dark:hover:bg-blue-950/30",
  green: "hover:bg-green-50/80 dark:hover:bg-green-950/30",
  lime: "hover:bg-lime-50/80 dark:hover:bg-lime-950/30",
  fuchsia: "hover:bg-fuchsia-50/80 dark:hover:bg-fuchsia-950/30",
};

/* ── Animation variants ──────────────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

/* ── Category card ───────────────────────────────────────────── */

function CategoryCard({ cat, index }: { cat: Category; index: number }) {
  const squareColor = colorSquareMap[cat.color] || "bg-teal-500";
  const iconBg = colorBgMap[cat.color] || "bg-teal-500/10 group-hover:bg-teal-500/20";
  const hoverBg = colorHoverBg[cat.color] || "hover:bg-teal-50/80 dark:hover:bg-teal-950/30";

  const handleClick = () => {
    const articlesSection = document.getElementById("articles");
    if (articlesSection) {
      articlesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.button
      type="button"
      variants={itemVariants}
      onClick={handleClick}
      aria-label={`Browse ${cat.name} — ${cat.count} articles`}
      className={[
        "group relative flex flex-col items-center justify-center gap-3",
        "border border-border bg-white dark:bg-background",
        "p-5 md:p-6 cursor-pointer",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-sm",
        hoverBg,
        "rounded-none",
        "outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2",
      ].join(" ")}
    >
      {/* Colored square icon */}
      <div
        className={[
          "w-10 h-10 flex items-center justify-center transition-all duration-300",
          iconBg,
          "group-hover:scale-105",
        ].join(" ")}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:rotate-3"
        >
          <rect
            x="1"
            y="1"
            width="16"
            height="16"
            className={squareColor}
            rx="2"
            opacity="0.85"
          />
        </svg>
      </div>

      {/* Name */}
      <span className="text-sm font-semibold tracking-tight text-foreground leading-tight text-center">
        {cat.name}
      </span>

      {/* Article count */}
      <span className="text-xs text-muted-foreground font-medium tabular-nums">
        {cat.count} {cat.count === 1 ? "article" : "articles"}
      </span>

      {/* Subtle arrow indicator on hover */}
      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/0 group-hover:text-muted-foreground absolute top-4 right-4 transition-all duration-300 group-hover:translate-x-0.5" />
    </motion.button>
  );
}

/* ── Section ─────────────────────────────────────────────────── */

export function CategorySection() {
  return (
    <section id="categories" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ────────────────────────────────────────── */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-[3px] w-10 bg-teal-500" />
            <span className="text-[11px] tracking-[0.18em] font-semibold uppercase text-muted-foreground">
              Browse
            </span>
          </div>
          <h2 className="font-editorial text-3xl md:text-4xl font-bold tracking-tight">
            Explore Topics
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-md leading-relaxed">
            Dive into the subjects that matter most in modern optometry.
          </p>
        </div>

        {/* ── 4-column grid (2 col mobile, 4 col desktop) ──── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 md:grid-cols-4 border border-border rounded-none"
        >
          {displayCategories.map((cat, i) => (
            <CategoryCard key={cat.name} cat={cat} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}