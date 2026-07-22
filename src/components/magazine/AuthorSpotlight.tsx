"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Twitter, Linkedin, Globe } from "lucide-react";
import { articles, authors } from "@/lib/magazine-data";

interface AuthorSpotlightProps {
  onArticleOpen: (id: string) => void;
}

export function AuthorSpotlight({ onArticleOpen }: AuthorSpotlightProps) {
  const featuredAuthor = authors[0];
  const authorArticles = articles
    .filter((a) => a.author.name === featuredAuthor.name)
    .slice(0, 3);

  const socialLinks = [
    { icon: Twitter, label: "Twitter" },
    { icon: Linkedin, label: "LinkedIn" },
    { icon: Globe, label: "Website" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Left-aligned editorial */}
        <div className="mb-12">
          <span className="text-xs tracking-[0.2em] text-primary font-semibold uppercase">
            Contributors
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Author Spotlight
          </h2>
        </div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-2xl overflow-hidden shadow-sm"
          style={{
            boxShadow:
              "0 4px 6px -1px rgba(0,0,0,0.05), 0 20px 50px -12px rgba(0,0,0,0.08)",
          }}
        >
          {/* Top Banner with dot pattern */}
          <div className="relative h-32 bg-gradient-to-r from-teal-600 to-emerald-700 overflow-hidden">
            {/* Subtle dot pattern overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />
          </div>

          {/* Author info overlapping banner */}
          <div className="px-6 md:px-10 -mt-10 relative z-10">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 border-4 border-card shadow-lg flex items-center justify-center text-3xl font-bold text-white"
            >
              {featuredAuthor.initials}
            </motion.div>

            {/* Name, specialty, bio */}
            <div className="mt-3">
              <h3 className="text-2xl font-bold">{featuredAuthor.name}</h3>
              <p className="text-primary font-semibold text-sm mt-0.5">
                {featuredAuthor.specialty}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mt-2 max-w-2xl">
                Dr. Priya Sharma is a leading clinical optometrist with over 15
                years of experience in evidence-based practice. Her research
                focuses on digital eye strain, clinical refraction techniques,
                and integrating technology into routine eye care. She
                contributes regularly to peer-reviewed journals and speaks at
                international optometry conferences.
              </p>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-4">
              {socialLinks.map((social) => (
                <button
                  key={social.label}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border my-8 mx-6 md:mx-10" />

          {/* Recent Work */}
          <div className="px-6 md:px-10 pb-8">
            <h4 className="font-bold text-lg mb-5">Recent Work</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {authorArticles.length > 0 ? (
                authorArticles.map((article, i) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.1 * i }}
                    className="group cursor-pointer hover:-translate-y-1 transition-transform duration-300"
                    onClick={() => onArticleOpen(article.id)}
                  >
                    {/* Gradient square */}
                    <div
                      className={`w-full aspect-square rounded-lg bg-gradient-to-br ${article.imageGradient} mb-3`}
                    />
                    {/* Title */}
                    <h5 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h5>
                    {/* Category badge + date */}
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant="secondary"
                        className="text-[11px] px-2 py-0 h-5"
                      >
                        {article.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {article.date}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm py-8 text-center md:col-span-3">
                  No publications yet.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}