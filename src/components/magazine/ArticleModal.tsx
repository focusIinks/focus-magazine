"use client";

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
import { Clock, User, Eye, Share2, X } from "lucide-react";
import { articles, type Article } from "@/lib/magazine-data";
import { useMediaQuery } from "@reactuses/core";

interface ArticleModalProps {
  articleId: string | null;
  open: boolean;
  onClose: () => void;
}

export function ArticleModal({ articleId, open, onClose }: ArticleModalProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const article = articles.find((a) => a.id === articleId);

  const related = article
    ? articles
        .filter((a) => a.category === article.category && a.id !== article.id)
        .slice(0, 3)
    : [];

  if (!article) return null;

  const paragraphs = article.content.split("\n\n").filter(Boolean);

  const content = (
    <>
      {/* Header Image */}
      <div
        className={`h-48 md:h-64 bg-gradient-to-br ${article.imageGradient} relative`}
      >
        <div className="absolute inset-0 bg-black/10" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 text-white hover:bg-black/50 flex items-center justify-center transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>
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
          <Separator orientation="vertical" className="h-8 hidden sm:block" />
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

        {/* Article Content */}
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

        {/* Share */}
        <div className="flex items-center gap-3 mt-8 pt-6 border-t border-border">
          <Share2 className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Share this article</span>
          <Button variant="outline" size="sm" className="ml-auto text-xs">
            Copy Link
          </Button>
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
                    <p className="font-medium text-sm leading-snug">{r.title}</p>
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
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
        <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto p-0 rounded-t-2xl">
          <SheetTitle className="sr-only">{article.title}</SheetTitle>
          <SheetDescription className="sr-only">
            Article by {article.author.name}
          </SheetDescription>
          {content}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl w-full max-h-[90vh] overflow-y-auto p-0">
        <DialogTitle className="sr-only">{article.title}</DialogTitle>
        <DialogDescription className="sr-only">
          Article by {article.author.name}
        </DialogDescription>
        {content}
      </DialogContent>
    </Dialog>
  );
}