"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink, Twitter, Linkedin, Globe } from "lucide-react";
import { articles, authors } from "@/lib/magazine-data";

interface AuthorSpotlightProps {
  onArticleOpen: (id: string) => void;
}

export function AuthorSpotlight({ onArticleOpen }: AuthorSpotlightProps) {
  const featuredAuthor = authors[0]; // Dr. Priya Sharma
  const authorArticles = articles
    .filter((a) => a.author.name === featuredAuthor.name)
    .slice(0, 3);

  const socialLinks = [
    { icon: Twitter, label: "Twitter" },
    { icon: Linkedin, label: "LinkedIn" },
    { icon: Globe, label: "Website" },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px bg-primary flex-1" />
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight whitespace-nowrap">
            Author Spotlight
          </h2>
          <div className="h-px bg-primary flex-1" />
        </div>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Get to know the minds behind the research shaping modern optometry.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-xl border border-border overflow-hidden shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Author Profile - Left */}
            <div className="md:col-span-1 p-6 md:p-8 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-border">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="w-full max-w-[200px] aspect-square rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center mb-5 shadow-lg"
              >
                <span className="text-white text-4xl font-bold">
                  {featuredAuthor.initials}
                </span>
              </motion.div>

              <h3 className="text-xl font-bold mb-1">{featuredAuthor.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">
                {featuredAuthor.specialty}
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-2 mb-5">
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

              <p className="text-sm text-muted-foreground leading-relaxed">
                Dr. Priya Sharma is a leading clinical optometrist with over 15
                years of experience in evidence-based practice. Her research
                focuses on digital eye strain, clinical refraction techniques,
                and integrating technology into routine eye care. She
                contributes regularly to peer-reviewed journals and speaks at
                international optometry conferences.
              </p>
            </div>

            {/* Recent Publications - Right */}
            <div className="md:col-span-2 p-6 md:p-8">
              <h4 className="font-bold text-lg mb-5 flex items-center gap-2">
                <div className="w-1 h-5 bg-primary rounded-full" />
                Recent Publications
              </h4>

              {authorArticles.length > 0 ? (
                <div className="space-y-1">
                  {authorArticles.map((article, i) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.1 * i }}
                      className="flex items-start gap-4 p-4 rounded-lg cursor-pointer group/art hover:bg-accent transition-colors duration-200"
                      onClick={() => onArticleOpen(article.id)}
                    >
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${article.imageGradient} shrink-0 flex items-center justify-center`}
                      >
                        <ExternalLink className="w-4 h-4 text-white/70" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-sm leading-snug group-hover/art:text-primary transition-colors line-clamp-2 mb-1.5">
                          {article.title}
                        </h5>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                          <Badge
                            variant="secondary"
                            className="text-[11px] px-2 py-0 h-5"
                          >
                            {article.category}
                          </Badge>
                          <span>{article.date}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm py-8 text-center">
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