"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { articles, type Article } from "@/lib/magazine-data";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
  onArticleOpen: (id: string) => void;
}

// Pick 5 consistent "suggested" articles based on a seed so they don't jump around
function getSuggestedArticles(): Article[] {
  const shuffled = [...articles].sort((a, b) => a.id.localeCompare(b.id));
  return shuffled.slice(0, 5);
}

const suggestedArticles = getSuggestedArticles();

export function SearchOverlay({ open, onClose, onArticleOpen }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset query when dialog opens
  useEffect(() => {
    if (open) {
      // Small delay so the Dialog animation has time to mount the input
      const timer = setTimeout(() => {
        setQuery("");
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Filter articles as user types
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return articles.filter((article) => {
      return (
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q) ||
        article.author.name.toLowerCase().includes(q) ||
        article.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [query]);

  const hasQuery = query.trim().length > 0;

  const handleSelect = useCallback(
    (id: string) => {
      onArticleOpen(id);
      onClose();
    },
    [onArticleOpen, onClose]
  );

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="fixed inset-0 top-0 left-0 z-[100] flex h-full w-full max-w-none translate-x-0 translate-y-0 rounded-none border-0 bg-white p-0 shadow-none data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100 sm:max-w-none"
      >
        {/* Visually hidden but accessible title & description for screen readers */}
        <DialogTitle className="sr-only">Search Articles</DialogTitle>
        <DialogDescription className="sr-only">
          Search for articles by title, topic, author, or tag
        </DialogDescription>

        <div className="flex h-full flex-col items-center">
          {/* Search Input — centered at top */}
          <div className="w-full max-w-2xl px-4 pt-8 pb-4 sm:pt-12 sm:px-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-neutral-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, topics, authors..."
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3.5 pl-12 pr-24 text-base text-neutral-900 placeholder:text-neutral-400 outline-none transition-colors focus:border-neutral-300 focus:bg-white focus:ring-2 focus:ring-neutral-100"
                autoFocus
              />
              {/* Cmd+K hint */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-0.5 pointer-events-none">
                <kbd className="hidden sm:inline-flex items-center h-6 min-w-6 px-1.5 rounded-md border border-neutral-200 bg-white text-[11px] font-medium text-neutral-400 leading-none">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full max-w-2xl px-4 sm:px-6">
            <div className="h-px bg-neutral-100" />
          </div>

          {/* Results Area */}
          <div className="w-full max-w-2xl flex-1 overflow-y-auto px-4 sm:px-6 py-2">
            {/* Suggested Reading — when no query */}
            {!hasQuery && (
              <div>
                <p className="px-3 pt-4 pb-2 text-xs font-medium uppercase tracking-wider text-neutral-400">
                  Suggested Reading
                </p>
                <ul className="divide-y divide-neutral-100">
                  {suggestedArticles.map((article) => (
                    <li key={article.id}>
                      <button
                        onClick={() => handleSelect(article.id)}
                        className="flex w-full items-start gap-4 rounded-lg px-3 py-3.5 text-left transition-colors hover:bg-neutral-50"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-neutral-900 leading-snug truncate">
                            {article.title}
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-neutral-500">
                            <span>{article.category}</span>
                            <span className="text-neutral-300">·</span>
                            <span>{article.author.name}</span>
                            <span className="text-neutral-300">·</span>
                            <span>{article.date}</span>
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Search Results */}
            {hasQuery && results.length > 0 && (
              <div>
                <p className="px-3 pt-4 pb-2 text-xs font-medium uppercase tracking-wider text-neutral-400">
                  {results.length} result{results.length !== 1 ? "s" : ""}
                </p>
                <ul className="divide-y divide-neutral-100">
                  {results.map((article) => (
                    <li key={article.id}>
                      <button
                        onClick={() => handleSelect(article.id)}
                        className="flex w-full items-start gap-4 rounded-lg px-3 py-3.5 text-left transition-colors hover:bg-neutral-50"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-neutral-900 leading-snug truncate">
                            {article.title}
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-neutral-500">
                            <span>{article.category}</span>
                            <span className="text-neutral-300">·</span>
                            <span>{article.author.name}</span>
                            <span className="text-neutral-300">·</span>
                            <span>{article.date}</span>
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* No Results */}
            {hasQuery && results.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="flex items-center justify-center size-12 rounded-full bg-neutral-100 mb-4">
                  <Search className="size-5 text-neutral-400" />
                </div>
                <p className="text-sm font-medium text-neutral-900">
                  No results found
                </p>
                <p className="mt-1 text-sm text-neutral-500 max-w-xs">
                  Try adjusting your search or browse our suggested reading.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="w-full max-w-2xl px-4 sm:px-6 pb-6 pt-2">
            <div className="h-px bg-neutral-100 mb-3" />
            <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-400">
              <span className="flex items-center gap-1.5">
                <kbd className="inline-flex items-center justify-center h-5 min-w-5 px-1 rounded border border-neutral-200 bg-white text-[10px] font-medium text-neutral-400 leading-none">
                  Esc
                </kbd>
                to close
              </span>
              <span className="text-neutral-200">·</span>
              <span className="flex items-center gap-1.5">
                <kbd className="inline-flex items-center justify-center h-5 min-w-5 px-1 rounded border border-neutral-200 bg-white text-[10px] font-medium text-neutral-400 leading-none">
                  ↵
                </kbd>
                to open
              </span>
              <span className="text-neutral-200">·</span>
              <span className="flex items-center gap-1.5">
                <kbd className="inline-flex items-center justify-center h-5 min-w-5 px-1 rounded border border-neutral-200 bg-white text-[10px] font-medium text-neutral-400 leading-none">
                  ↑↓
                </kbd>
                to navigate
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}