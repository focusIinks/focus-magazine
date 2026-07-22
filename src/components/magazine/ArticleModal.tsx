"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
  Share2,
  X,
  Link2,
  Twitter,
  Linkedin,
} from "lucide-react";
import { articles, type Article } from "@/lib/magazine-data";
import { useMediaQuery } from "@reactuses/core";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

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

function DropCapParagraph({ children, index }: { children: string; index: number }) {
  if (index !== 0) {
    return (
      <p className="text-editorial text-foreground/85 leading-[1.85] mb-6 text-[17px]">
        {children}
      </p>
    );
  }

  const firstChar = children.charAt(0);
  const rest = children.slice(1);

  return (
    <p className="text-editorial text-foreground/85 leading-[1.85] mb-6 text-[17px]">
      <span className="float-left text-[4.5em] leading-[0.8] mr-[0.08em] mt-[0.05em] font-bold text-foreground/90 font-editorial">
        {firstChar}
      </span>
      {rest}
    </p>
  );
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

  // Use article.tags if available, otherwise empty
  const tags: string[] = (article as any)?.tags ?? [];

  const handleScroll = useCallback(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;
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

  useEffect(() => {
    setActiveParagraph(0);
  }, [articleId, open]);

  if (!article) return null;

  const imageUrl = (article as any).imageUrl as string | undefined;
  const imageCaption = (article as any).imageCaption as string | undefined;

  // ─── Shared: Header Image ───
  const ArticleHeroImage = () => (
    <div className="relative w-full">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={article.title}
          className="w-full h-64 md:h-80 lg:h-96 object-cover"
        />
      ) : (
        <div
          className={`w-full h-64 md:h-80 lg:h-96 bg-gradient-to-br ${article.imageGradient}`}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 flex items-center justify-center transition-all duration-200 z-10 hover:scale-105 shadow-lg"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>
      {imageCaption && (
        <p className="absolute bottom-3 right-4 text-[11px] text-white/70 italic max-w-xs text-right">
          {imageCaption}
        </p>
      )}
    </div>
  );

  // ─── Shared: Byline ───
  const ArticleByline = () => (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground mb-2">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
          {article.author.initials}
        </div>
        <div>
          <p className="font-semibold text-foreground text-sm leading-tight">
            {article.author.name}
          </p>
          <p className="text-xs text-muted-foreground leading-tight mt-0.5">
            {article.author.specialty}
          </p>
        </div>
      </div>
      <Separator orientation="vertical" className="h-8 hidden sm:block" />
      <div className="flex items-center gap-4 text-xs">
        <span>{article.date}</span>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{article.readTime}</span>
        </div>
      </div>
    </div>
  );

  // ─── Shared: Article Body ───
  const ArticleBody = ({ showTOCMarker = true }: { showTOCMarker?: boolean }) => (
    <div>
      {paragraphs.map((p, i) => (
        <div key={i} data-paragraph-index={showTOCMarker ? i : undefined}>
          <DropCapParagraph index={i}>{p}</DropCapParagraph>
        </div>
      ))}
    </div>
  );

  // ─── Shared: Share Bar ───
  const ShareBar = () => (
    <div className="flex items-center gap-3 pt-6 border-t border-border/60">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Share
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="text-xs gap-1.5 h-8 px-3">
            <Share2 className="w-3.5 h-3.5" />
            Options
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleCopyLink}>
            <Link2 className="w-4 h-4 mr-2" />
            Copy Link
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleShareTwitter}>
            <Twitter className="w-4 h-4 mr-2" />
            Twitter / X
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleShareLinkedIn}>
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Quick-share icon buttons */}
      <div className="flex items-center gap-1 ml-auto">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8"
          onClick={handleCopyLink}
          aria-label="Copy link"
        >
          <Link2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8"
          onClick={handleShareTwitter}
          aria-label="Share on Twitter"
        >
          <Twitter className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8"
          onClick={handleShareLinkedIn}
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  // ─── Shared: Related Articles ───
  const RelatedArticles = () => {
    if (related.length === 0) return null;
    return (
      <div className="mt-10 pt-8 border-t border-border/60">
        <h3 className="font-bold text-lg mb-5 font-editorial">Related Articles</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {related.map((r) => (
            <motion.div
              key={r.id}
              whileHover={{ y: -2 }}
              className="group cursor-pointer rounded-xl overflow-hidden border border-border/50 hover:border-border transition-colors"
            >
              <div className="aspect-[16/9] overflow-hidden">
                {(r as any).imageUrl ? (
                  <img
                    src={(r as any).imageUrl}
                    alt={r.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${r.imageGradient} group-hover:scale-105 transition-transform duration-500`}
                  />
                )}
              </div>
              <div className="p-3">
                <p className="font-medium text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {r.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1.5">
                  {r.author.name} &middot; {r.readTime}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════
  //  MOBILE: Sheet from bottom, full-screen
  // ═══════════════════════════════════════════
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
        <SheetContent
          side="bottom"
          className="h-screen max-h-screen p-0 rounded-t-2xl overflow-y-auto"
        >
          <SheetTitle className="sr-only">{article.title}</SheetTitle>
          <SheetDescription className="sr-only">
            Article by {article.author.name}
          </SheetDescription>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col min-h-full"
              >
                <ArticleHeroImage />

                <div className="flex-1 px-6 pb-12">
                  {/* Category badge + tags */}
                  <div className="flex flex-wrap items-center gap-2 mt-6 mb-4">
                    <Badge
                      variant="secondary"
                      className="text-[11px] font-semibold uppercase tracking-wider"
                    >
                      {article.category}
                    </Badge>
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border border-border/60 px-2.5 py-0.5 text-[10px] text-muted-foreground font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h1 className="font-editorial text-3xl md:text-4xl font-bold leading-[1.15] tracking-tight mb-4">
                    {article.title}
                  </h1>

                  {/* Byline */}
                  <ArticleByline />

                  {/* Magazine rule divider */}
                  <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-border/80" />
                    <div className="w-1.5 h-1.5 rounded-full bg-border" />
                    <div className="h-px flex-1 bg-border/80" />
                  </div>

                  {/* Body */}
                  <ArticleBody showTOCMarker={false} />

                  {/* Share + Related */}
                  <ShareBar />
                  <RelatedArticles />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </SheetContent>
      </Sheet>
    );
  }

  // ═══════════════════════════════════════════
  //  DESKTOP: Dialog with sidebar TOC
  // ═══════════════════════════════════════════
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-4xl w-full h-[90vh] p-0 overflow-hidden gap-0">
        <DialogTitle className="sr-only">{article.title}</DialogTitle>
        <DialogDescription className="sr-only">
          Article by {article.author.name}
        </DialogDescription>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col h-full"
            >
              {/* Hero image */}
              <div className="shrink-0">
                <ArticleHeroImage />
              </div>

              {/* Scrollable body area with sidebar */}
              <div className="flex flex-1 overflow-hidden">
                {/* Right sidebar: Table of Contents */}
                <nav className="hidden lg:flex w-56 shrink-0 flex-col border-l border-border/40 bg-muted/20 p-5 pt-8">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-4">
                    Contents
                  </p>
                  <div className="flex-1 overflow-y-auto space-y-1 pr-1">
                    {tocItems.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => scrollToParagraph(i)}
                        className={`block w-full text-left text-[11px] leading-relaxed py-1.5 px-2.5 rounded-md transition-all duration-200 ${
                          activeParagraph === i
                            ? "text-foreground font-medium bg-primary/8 border-l-2 border-primary pl-2"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </nav>

                {/* Main content column */}
                <div
                  ref={contentRef}
                  onScroll={handleScroll}
                  className="flex-1 overflow-y-auto px-8 md:px-12 py-8"
                >
                  <div className="max-w-2xl mx-auto">
                    {/* Category badge + tags as small pills */}
                    <div className="flex flex-wrap items-center gap-2 mb-5">
                      <Badge
                        variant="secondary"
                        className="text-[11px] font-semibold uppercase tracking-wider"
                      >
                        {article.category}
                      </Badge>
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full border border-border/60 px-2.5 py-0.5 text-[10px] text-muted-foreground font-medium transition-colors hover:bg-accent/50 cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h1 className="font-editorial text-3xl md:text-4xl font-bold leading-[1.12] tracking-tight mb-5">
                      {article.title}
                    </h1>

                    {/* Byline */}
                    <ArticleByline />

                    {/* Thin magazine-rule divider */}
                    <div className="my-8 flex items-center gap-3">
                      <div className="h-px flex-1 bg-border/80" />
                      <div className="w-1.5 h-1.5 rounded-full bg-border" />
                      <div className="h-px flex-1 bg-border/80" />
                    </div>

                    {/* Article body with drop cap */}
                    <ArticleBody />

                    {/* Share bar */}
                    <ShareBar />

                    {/* Related articles */}
                    <RelatedArticles />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}