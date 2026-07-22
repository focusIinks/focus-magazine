"use client";

import { useState, useCallback } from "react";
import { Navbar } from "@/components/magazine/Navbar";
import { HeroSection } from "@/components/magazine/HeroSection";
import { FeaturedArticles } from "@/components/magazine/FeaturedArticles";
import { LatestArticles } from "@/components/magazine/LatestArticles";
import { CategorySection } from "@/components/magazine/CategorySection";
import { AboutSection } from "@/components/magazine/AboutSection";
import { NewsletterSection } from "@/components/magazine/NewsletterSection";
import { ArticleModal } from "@/components/magazine/ArticleModal";
import { SearchOverlay } from "@/components/magazine/SearchOverlay";
import { Footer } from "@/components/magazine/Footer";
import BackToTop from "@/components/magazine/BackToTop";

export default function HomePage() {
  const [articleModal, setArticleModal] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const openArticle = useCallback((id: string) => setArticleModal(id), []);
  const closeArticle = useCallback(() => setArticleModal(null), []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearchOpen={() => setSearchOpen(true)} />

      <main className="flex-1">
        <div id="home">
          <HeroSection onArticleOpen={openArticle} />
        </div>

        <FeaturedArticles onArticleOpen={openArticle} />

        <div className="magazine-rule max-w-7xl mx-auto" />

        <div id="articles">
          <LatestArticles onArticleOpen={openArticle} />
        </div>

        <div className="magazine-rule max-w-7xl mx-auto" />

        <div id="categories">
          <CategorySection />
        </div>

        <div className="magazine-rule max-w-7xl mx-auto" />

        <div id="about">
          <AboutSection />
        </div>

        <div className="magazine-rule max-w-7xl mx-auto" />

        <div id="newsletter">
          <NewsletterSection />
        </div>
      </main>

      <Footer />
      <BackToTop />

      <ArticleModal
        articleId={articleModal}
        open={!!articleModal}
        onClose={closeArticle}
      />

      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onArticleOpen={(id) => {
          setSearchOpen(false);
          openArticle(id);
        }}
      />
    </div>
  );
}