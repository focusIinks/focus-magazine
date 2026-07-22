"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    <section id="articles" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px bg-primary flex-1" />
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight whitespace-nowrap">
            Featured Stories
          </h2>
          <div className="h-px bg-primary flex-1" />
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex gap-1 text-muted-foreground hover:text-foreground shrink-0">
            View All
            <ArrowRight className="w-4 h-4" />
          </Button>
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
              className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-xl hover:ring-2 hover:ring-primary/20 transition-all duration-300 hover:-translate-y-1 h-full"
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
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-black/40 text-white text-xs backdrop-blur-sm rounded-full px-3 py-1 border-0">
                      <Clock className="w-3 h-3 mr-1" />
                      {main.readTime}
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
                  <p className="text-muted-foreground text-sm leading-relaxed mb-1 line-clamp-3">
                    {main.excerpt}
                  </p>
                  <p className="text-xs text-muted-foreground/70 mb-4">
                    By <span className="font-medium text-muted-foreground">{main.author.name}</span>
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                    <span>{main.date}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{main.readTime}</span>
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
                  className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-xl hover:ring-2 hover:ring-primary/20 transition-all duration-300 hover:-translate-y-1 flex-1"
                  onClick={() => onArticleOpen(article.id)}
                >
                  <div
                    className={`h-40 bg-gradient-to-br ${article.imageGradient} relative`}
                  >
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
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
                    <p className="text-muted-foreground text-xs leading-relaxed mb-1 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <p className="text-xs text-muted-foreground/70 mb-3">
                      By <span className="font-medium text-muted-foreground">{article.author.name}</span>
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{article.date}</span>
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