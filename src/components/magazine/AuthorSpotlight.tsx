"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Clock, ArrowUpRight } from "lucide-react";
import { articles, authors } from "@/lib/magazine-data";

interface AuthorSpotlightProps {
  onArticleOpen: (id: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const articleVariants = {
  hidden: { opacity: 0, x: 12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: 0.15 + i * 0.07, ease: "easeOut" },
  }),
};

export function AuthorSpotlight({ onArticleOpen }: AuthorSpotlightProps) {
  const featuredAuthor = authors[0];
  const authorArticles = articles
    .filter((a) => a.author.name === featuredAuthor.name)
    .slice(0, 4);

  const socialLinks = [
    { icon: Github, label: "GitHub" },
    { icon: Twitter, label: "Twitter" },
    { icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="editorial-byline mb-10"
        >
          Contributors
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-0"
        >
          {/* ====== LEFT COLUMN — Author Profile ====== */}
          <div className="lg:col-span-4 lg:pr-10">
            {/* Initials circle */}
            <motion.div
              variants={fadeUp}
              className="w-24 h-24 bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold font-editorial select-none"
            >
              {featuredAuthor.initials}
            </motion.div>

            {/* Name */}
            <motion.h2
              variants={fadeUp}
              className="font-editorial text-3xl font-bold mt-5 leading-tight"
            >
              {featuredAuthor.name}
            </motion.h2>

            {/* Specialty — editorial byline style */}
            <motion.p variants={fadeUp} className="editorial-byline mt-2">
              {featuredAuthor.specialty}
            </motion.p>

            {/* Bio paragraph */}
            <motion.p
              variants={fadeUp}
              className="font-body text-sm leading-relaxed text-muted-foreground mt-5"
            >
              A leading clinical optometrist with over 15 years of experience in
              evidence-based practice. Her research focuses on digital eye strain,
              clinical refraction techniques, and integrating technology into
              routine eye care. She contributes regularly to peer-reviewed
              journals and speaks at international optometry conferences.
            </motion.p>

            {/* Social icons row */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <button
                  key={social.label}
                  className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" strokeWidth={1.5} />
                </button>
              ))}
            </motion.div>

            {/* Magazine-rule divider */}
            <div className="magazine-rule mt-8" />

            {/* Decorative stats below divider */}
            <motion.div variants={fadeUp} className="mt-6 flex items-center gap-6">
              <div>
                <p className="font-editorial text-2xl font-bold">
                  {authorArticles.length}
                </p>
                <p className="editorial-byline mt-0.5">Publications</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="font-editorial text-2xl font-bold">15+</p>
                <p className="editorial-byline mt-0.5">Years</p>
              </div>
            </motion.div>
          </div>

          {/* Vertical rule on desktop */}
          <div className="hidden lg:block lg:col-span-[0.5]">
            <div className="magazine-rule-vertical mx-auto" />
          </div>

          {/* ====== RIGHT COLUMN — Recent Articles ====== */}
          <div className="lg:col-span-7 lg:pl-10 mt-10 lg:mt-0">
            <motion.h3
              variants={fadeUp}
              className="font-editorial text-xl font-bold mb-8"
            >
              Recent Publications
            </motion.h3>

            {authorArticles.length > 0 ? (
              <div className="flex flex-col">
                {authorArticles.map((article, i) => (
                  <div key={article.id}>
                    <motion.article
                      custom={i}
                      variants={articleVariants}
                      className="group cursor-pointer py-5 px-3 -mx-3 transition-colors duration-200 hover:bg-muted/60"
                      onClick={() => onArticleOpen(article.id)}
                    >
                      {/* Category badge */}
                      <span className="editorial-badge text-primary inline-block mb-2">
                        {article.category}
                      </span>

                      {/* Title */}
                      <h4 className="font-editorial text-lg font-bold leading-snug group-hover:text-primary transition-colors duration-200">
                        {article.title}
                      </h4>

                      {/* Excerpt line */}
                      <p className="font-body text-sm text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>

                      {/* Date + read time */}
                      <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                        <span>{article.date}</span>
                        <span className="w-1 h-1 bg-border" />
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" strokeWidth={1.5} />
                          {article.readTime}
                        </span>
                        <ArrowUpRight className="w-3 h-3 ml-auto opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                      </div>
                    </motion.article>

                    {/* Magazine-rule divider between articles (not after last) */}
                    {i < authorArticles.length - 1 && <div className="magazine-rule" />}
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-body text-sm text-muted-foreground py-12">
                No publications yet.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}