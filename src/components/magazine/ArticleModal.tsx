"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Clock,
  Eye,
  Share2,
  X,
  Link2,
  Twitter,
  Linkedin,
} from "lucide-react";
import { articles, type Article } from "@/lib/magazine-data";
import { useMediaQuery } from "@reactuses/core";
import { toast } from "sonner";

interface ArticleModalProps {
  articleId: string | null;
  open: boolean;
  onClose: () => void;
}

function truncateToWords(text: string, maxWords: number): string {
  const words = text.split(/\s+/).slice(0, maxWords);
  const result = words.join(" ");
  return result.length < text.length ? result + "…" : result;
}

function generateTags(article: Article): string[] {
  const tags: string[] = [];
  // Add category-based tag
  if (article.category) {
    tags.push(article.category.toLowerCase().replace(/\s+/g, "-"));
  }
  // Extract keywords from title (filter out common words)
  const stopWords = new Set([
    "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for",
    "of", "with", "by", "is", "are", "was", "were", "be", "been", "being",
    "have", "has", "had", "do", "does", "did", "will", "would", "could",
    "should", "may", "might", "shall", "can", "how", "what", "which", "who",
    "this", "that", "these", "those", "from", "into", "through", "during",
    "before", "after", "above", "below", "between", "under", "again",
    "further", "then", "once", "here", "there", "when", "where", "why",
    "all", "each", "every", "both", "few", "more", "most", "other", "some",
    "such", "no", "not", "only", "own", "same", "so", "than", "too", "very",
    "just", "about", "new", "your", "our", "their", "its", "the", "in",
  ]);
  const titleWords = article.title
    .replace(/[^a-zA-Z\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w.toLowerCase()))
    .slice(0, 3);
  tags.push(...titleWords.map((w) => w.toLowerCase()));

  // Deduplicate and limit to 4
  return [...new Set(tags)].slice(0, 4);
}

export function ArticleModal({
  articleId,
  open,
  onClose,
}: ArticleModalProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const article = articles.find((a) => a.id === articleId);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeParagraph, setActiveParagraph] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const related = article
    ? articles
        .filter((a) => a.category === article.category && a.id !== article.id)
        .slice(0, 3)
    : [];

  const paragraphs = useMemo(
    () => (article ? article.content.split("\n\n").filter(Boolean) : []),
    [article]
  );

  const tocItems = useMemo(
    () =>
      paragraphs.map((p) => {
        const firstSentence = p.split(/[.!?]/)[0] || p;
        return truncateToWords(firstSentence, 8);
      }),
    [paragraphs]
  );

  const tags = useMemo(
    () => (article ? generateTags(article) : []),
    [article]
  );

  const handleScroll = useCallback(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;
    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight - el.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    setScrollProgress(Math.min(progress, 100));

    // Determine active paragraph based on scroll position
    const pElements = el.querySelectorAll("[data-paragraph-index]");
    let active = 0;
    pElements.forEach((elem) => {
      const rect = elem.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      if (rect.top - elRect.top < 120) {
        active = Number(elem.getAttribute("data-paragraph-index"));
      }
    });
    setActiveParagraph(active);
  }, []);

  const scrollToParagraph = (index: number) => {
    if (!contentRef.current) return;
    const target = contentRef.current.querySelector(
      `[data-paragraph-index="${index}"]`
    );
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article?.title || "")}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, "_blank");
  };

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, "_blank");
  };

  // Reset state when article changes or modal opens
  useEffect(() => {
    setScrollProgress(0);
    setActiveParagraph(0);
  }, [articleId, open]);

  if (!article) return null;

  const content = (
    <>
      {/* Header Image */}
      <div
        className={`h-48 md:h-64 bg-gradient-to-br ${article.imageGradient} relative`}
      >
        <div className="absolute inset-0 bg-black/10" />

        {/* Prominent close button with backdrop blur */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 flex items-center justify-center transition-all duration-200 z-10 hover:scale-105 shadow-lg"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Reading progress indicator */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border/50 px-4">
        <Progress value={scrollProgress} className="h-1 rounded-none" />
      </div>

      <div className="flex">
        {/* Table of Contents sidebar - desktop only */}
        <nav className="hidden md:block w-56 shrink-0 border-r border-border/50 sticky top-8 self-start max-h-[calc(90vh-4rem)] overflow-y-auto p-4 pl-6">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-3">
            Table of Contents
          </p>
          <div className="space-y-1">
            {tocItems.map((item, i) => (
              <button
                key={i}
                onClick={() => scrollToParagraph(i)}
                className={`block w-full text-left text-xs leading-relaxed py-1.5 px-2 rounded transition-colors ${
                  activeParagraph === i
                    ? "text-primary font-medium border-l-2 border-primary bg-primary/5 pl-[6px]"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </nav>

        {/* Article Content */}
        <div
          ref={contentRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto max-h-[calc(90vh-5rem)] p-6 md:p-8"
        >
          <div className="max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              {article.category}
            </Badge>

            <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-4">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  {article.author.initials}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {article.author.name}
                  </p>
                  <p className="text-xs">{article.author.specialty}</p>
                </div>
              </div>
              <Separator
                orientation="vertical"
                className="h-8 hidden sm:block"
              />
              <div className="flex items-center gap-4">
                <span>{article.date}</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{article.views.toLocaleString()} views</span>
                </div>
              </div>
            </div>

            <Separator className="mb-8" />

            {/* Article Content paragraphs */}
            <div className="prose prose-sm md:prose-base max-w-none">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  data-paragraph-index={i}
                  className="text-foreground/85 leading-relaxed mb-5 text-sm md:text-base scroll-mt-8"
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-border">
                <span className="text-xs font-semibold text-muted-foreground mr-1">
                  Tags:
                </span>
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-[11px] font-normal"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Share dropdown */}
            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
              <Share2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Share this article
              </span>
              <div className="ml-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs gap-1.5"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      Share
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleCopyLink}>
                      <Link2 className="w-4 h-4 mr-2" />
                      Copy Link
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleShareTwitter}>
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleShareLinkedIn}>
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="mt-10 pt-8 border-t border-border">
                <h3 className="font-bold text-lg mb-4">Related Articles</h3>
                <div className="space-y-3">
                  {related.map((r) => (
                    <div
                      key={r.id}
                      className="flex gap-4 p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                    >
                      <div
                        className={`w-16 h-16 rounded-lg bg-gradient-to-br ${r.imageGradient} shrink-0`}
                      />
                      <div>
                        <p className="font-medium text-sm leading-snug">
                          {r.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {r.author.name} &middot; {r.readTime}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
        <SheetContent
          side="bottom"
          className="max-h-[90vh] overflow-y-auto p-0 rounded-t-2xl"
        >
          <SheetTitle className="sr-only">{article.title}</SheetTitle>
          <SheetDescription className="sr-only">
            Article by {article.author.name}
          </SheetDescription>
          {/* Mobile: no TOC sidebar, simpler layout */}
          <>
            {/* Header Image */}
            <div
              className={`h-48 md:h-64 bg-gradient-to-br ${article.imageGradient} relative`}
            >
              <div className="absolute inset-0 bg-black/10" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 flex items-center justify-center transition-all duration-200 z-10 hover:scale-105 shadow-lg"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Reading progress indicator */}
            <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border/50 px-4">
              <Progress value={scrollProgress} className="h-1 rounded-none" />
            </div>

            <div className="p-6 md:p-8 max-w-3xl mx-auto">
              <Badge variant="secondary" className="mb-4">
                {article.category}
              </Badge>

              <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-4">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {article.author.initials}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {article.author.name}
                    </p>
                    <p className="text-xs">{article.author.specialty}</p>
                  </div>
                </div>
                <Separator
                  orientation="vertical"
                  className="h-8 hidden sm:block"
                />
                <div className="flex items-center gap-4">
                  <span>{article.date}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{article.views.toLocaleString()} views</span>
                  </div>
                </div>
              </div>

              <Separator className="mb-8" />

              <div className="prose prose-sm md:prose-base max-w-none">
                {paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-foreground/85 leading-relaxed mb-5 text-sm md:text-base"
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-border">
                  <span className="text-xs font-semibold text-muted-foreground mr-1">
                    Tags:
                  </span>
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-[11px] font-normal"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Share dropdown */}
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
                <Share2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Share this article
                </span>
                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs gap-1.5"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        Share
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleCopyLink}>
                        <Link2 className="w-4 h-4 mr-2" />
                        Copy Link
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleShareTwitter}>
                        <Twitter className="w-4 h-4 mr-2" />
                        Twitter
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleShareLinkedIn}>
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Related */}
              {related.length > 0 && (
                <div className="mt-10 pt-8 border-t border-border">
                  <h3 className="font-bold text-lg mb-4">
                    Related Articles
                  </h3>
                  <div className="space-y-3">
                    {related.map((r) => (
                      <div
                        key={r.id}
                        className="flex gap-4 p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                      >
                        <div
                          className={`w-16 h-16 rounded-lg bg-gradient-to-br ${r.imageGradient} shrink-0`}
                        />
                        <div>
                          <p className="font-medium text-sm leading-snug">
                            {r.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {r.author.name} &middot; {r.readTime}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-5xl w-full max-h-[90vh] overflow-hidden p-0">
        <DialogTitle className="sr-only">{article.title}</DialogTitle>
        <DialogDescription className="sr-only">
          Article by {article.author.name}
        </DialogDescription>
        {content}
      </DialogContent>
    </Dialog>
  );
}