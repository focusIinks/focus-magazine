"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, ArrowRight } from "lucide-react";
import { articles } from "@/lib/magazine-data";

interface FeaturedArticlesProps {
  onArticleOpen: (id: string) => void;
}

export function FeaturedArticles({ onArticleOpen }: FeaturedArticlesProps) {
  const featured = articles.filter((a) => a.featured);
  const main = featured[0];
  const side = featured.slice(1, 3);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px bg-primary flex-1" />
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight whitespace-nowrap">
            Featured Stories
          </h2>
          <div className="h-px bg-primary flex-1" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main featured */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Card
              className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full"
              onClick={() => onArticleOpen(main.id)}
            >
              <div className="grid md:grid-cols-2 h-full">
                <div
                  className={`min-h-[240px] md:min-h-full bg-gradient-to-br ${main.imageGradient} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                      {main.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                  <Badge variant="secondary" className="w-fit mb-3">
                    Editor&apos;s Pick
                  </Badge>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors leading-snug">
                    {main.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                    {main.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                    <span className="font-medium">{main.author.name}</span>
                    <div className="flex items-center gap-3">
                      <span>{main.date}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{main.readTime}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </motion.div>

          {/* Side featured */}
          <div className="flex flex-col gap-6">
            {side.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
              >
                <Card
                  className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-1"
                  onClick={() => onArticleOpen(article.id)}
                >
                  <div
                    className={`h-40 bg-gradient-to-br ${article.imageGradient} relative`}
                  >
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs">
                        {article.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-medium">{article.author.name}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}