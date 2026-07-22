"use client";

import { useState, useCallback } from "react";
import ReadingProgress from "@/components/magazine/ReadingProgress";
import { Navbar } from "@/components/magazine/Navbar";
import { HeroSection } from "@/components/magazine/HeroSection";
import BreakingNewsTicker from "@/components/magazine/BreakingNewsTicker";
import { FeaturedArticles } from "@/components/magazine/FeaturedArticles";
import MasonryGrid from "@/components/magazine/MasonryGrid";
import EditorialBanner from "@/components/magazine/EditorialBanner";
import IssueCover from "@/components/magazine/IssueCover";
import { PopularThisWeek } from "@/components/magazine/PopularThisWeek";
import { EditorsPicks } from "@/components/magazine/EditorsPicks";
import PullQuote from "@/components/magazine/PullQuote";
import { LatestArticles } from "@/components/magazine/LatestArticles";
import { CategorySection } from "@/components/magazine/CategorySection";
import { AuthorSpotlight } from "@/components/magazine/AuthorSpotlight";
import { TestimonialsSection } from "@/components/magazine/TestimonialsSection";
import { AboutSection } from "@/components/magazine/AboutSection";
import { NewsletterSection } from "@/components/magazine/NewsletterSection";
import { ContactSection } from "@/components/magazine/ContactSection";
import { ArticleModal } from "@/components/magazine/ArticleModal";
import { SearchOverlay } from "@/components/magazine/SearchOverlay";
import BackToTop from "@/components/magazine/BackToTop";
import { Footer } from "@/components/magazine/Footer";

export default function HomePage() {
  const [articleModal, setArticleModal] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const openArticle = useCallback((id: string) => setArticleModal(id), []);
  const closeArticle = useCallback(() => setArticleModal(null), []);

  return (
    <div className="min-h-screen flex flex-col">
      <ReadingProgress />
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <main className="flex-1">
        <HeroSection onArticleOpen={openArticle} />
        <BreakingNewsTicker />
        <FeaturedArticles onArticleOpen={openArticle} />
        <MasonryGrid onArticleOpen={openArticle} />
        <EditorialBanner />
        <IssueCover onArticleOpen={openArticle} />
        <PopularThisWeek onArticleOpen={openArticle} />
        <EditorsPicks onArticleOpen={openArticle} />
        <PullQuote />
        <LatestArticles onArticleOpen={openArticle} />
        <CategorySection />
        <AuthorSpotlight onArticleOpen={openArticle} />
        <TestimonialsSection />
        <AboutSection />
        <NewsletterSection />
        <ContactSection />
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