"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Clock, User } from "lucide-react";
import { articles } from "@/lib/magazine-data";

interface ArticleModalProps {
  articleId: string | null;
  open: boolean;
  onClose: () => void;
}

export function ArticleModal({ articleId, open, onClose }: ArticleModalProps) {
  const article = articleId ? articles.find((a) => a.id === articleId) : null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="
          max-w-4xl w-full max-h-[90vh] overflow-y-auto
          top-[5vh] translate-y-0
          p-0 gap-0
          sm:max-w-4xl
          [&>button]:top-4 [&>button]:right-4 [&>button]:z-10
        "
      >
        <DialogTitle className="sr-only">
          {article?.title ?? "Article"}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {article ? `Article by ${article.author.name}` : "Article reader"}
        </DialogDescription>

        {!article ? null : (
          <div className="flex flex-col">
            {/* ── Hero Image ── */}
            {article.imageUrl && (
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* ── Article Body ── */}
            <div className="mx-auto w-full max-w-3xl px-6 py-10 md:px-10">
              {/* Category Badge */}
              <Badge
                variant="secondary"
                className="mb-6 text-[11px] font-semibold uppercase tracking-wider"
              >
                {article.category}
              </Badge>

              {/* Title */}
              <h1 className="font-editorial text-3xl font-bold leading-[1.15] tracking-tight mb-6 md:text-4xl lg:text-[2.75rem]">
                {article.title}
              </h1>

              {/* Author, Date, Read Time */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-8 pb-8 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-xs font-bold text-primary shrink-0">
                    {article.author.initials}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span className="font-medium text-foreground/80">
                      {article.author.name}
                    </span>
                  </span>
                </div>

                <span className="text-border">·</span>

                <span>{article.date}</span>

                <span className="text-border">·</span>

                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTime}</span>
                </span>
              </div>

              {/* Content Paragraphs */}
              <div className="font-body leading-[1.8] text-foreground/85 text-[17px]">
                {article.content
                  .split("\n\n")
                  .filter(Boolean)
                  .map((paragraph, index) => (
                    <p
                      key={index}
                      className={
                        index === 0 ? "drop-cap mb-6" : "mb-6"
                      }
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="mt-10 pt-8 border-t border-border/60">
                  <div className="flex flex-wrap items-center gap-2">
                    {article.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs font-normal text-muted-foreground hover:bg-accent/40 cursor-default transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
