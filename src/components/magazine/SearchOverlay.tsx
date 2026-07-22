"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search, Clock, ArrowRight, CornerDownLeft, ArrowUpDown, X } from "lucide-react";
import { articles, authors, categories } from "@/lib/magazine-data";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
  onArticleOpen: (id: string) => void;
}

const recentSearches = ["Myopia Management", "Glaucoma", "Contact Lenses"];

export function SearchOverlay({ open, onClose, onArticleOpen }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const articleResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.author.name.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q)
    );
  }, [query]);

  const authorResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return authors.filter(
      (a) => a.name.toLowerCase().includes(q) || a.specialty.toLowerCase().includes(q)
    );
  }, [query]);

  const categoryResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return categories.filter(
      (c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );
  }, [query]);

  const hasResults = articleResults.length > 0 || authorResults.length > 0 || categoryResults.length > 0;
  const hasQuery = query.trim().length > 0;

  const handleArticleSelect = useCallback(
    (id: string) => {
      onArticleOpen(id);
      setQuery("");
      onClose();
    },
    [onArticleOpen, onClose]
  );

  const handleRecentClick = useCallback(
    (term: string) => {
      setQuery(term);
    },
    []
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />

          {/* Panel */}
          <motion.div
            className="relative z-10 w-full max-w-2xl mx-4 bg-background/95 backdrop-blur-md rounded-2xl border border-border/50 shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Search Input Area */}
            <div className="relative px-6 pt-6 pb-0">
              <div className="flex items-center gap-3">
                <Search className="size-5 text-muted-foreground/70 shrink-0 mt-1" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles, authors, categories…"
                  className="flex-1 bg-transparent font-editorial text-2xl placeholder:text-muted-foreground/40 placeholder:font-editorial placeholder:text-2xl outline-none py-2 border-0 border-b border-border/60 focus:border-border transition-colors"
                  autoFocus
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="p-1 rounded-md text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Results Area */}
            <div className="px-2 pb-2 pt-2 min-h-[240px] max-h-[55vh] overflow-y-auto">
              <Command shouldFilter={false}>
                <CommandList className="max-h-none overflow-visible">
                  {/* Recent Searches — show when no query */}
                  {!hasQuery && (
                    <CommandGroup heading="Recent Searches" className="px-4">
                      {recentSearches.map((term) => (
                        <CommandItem
                          key={term}
                          value={term}
                          onSelect={() => handleRecentClick(term)}
                          className="flex items-center gap-3 py-2.5 px-3 rounded-lg cursor-pointer transition-colors duration-150 data-[selected=true]:bg-muted"
                        >
                          <Clock className="size-4 text-muted-foreground/50 shrink-0" />
                          <span className="flex-1 text-sm">{term}</span>
                          <ArrowRight className="size-3 text-muted-foreground/30" />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}

                  {/* Article Results */}
                  {hasQuery && articleResults.length > 0 && (
                    <CommandGroup heading="Articles" className="px-4">
                      {articleResults.map((article) => (
                        <CommandItem
                          key={article.id}
                          value={article.id}
                          onSelect={() => handleArticleSelect(article.id)}
                          className="flex items-start gap-3 py-3 px-3 rounded-lg cursor-pointer transition-colors duration-150 data-[selected=true]:bg-muted group"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm leading-snug truncate">
                              {article.title}
                            </p>
                            <div className="flex items-center gap-1.5 mt-1 text-muted-foreground text-xs">
                              <span>{article.category}</span>
                              <span className="text-border">·</span>
                              <span>{article.author.name}</span>
                              <span className="text-border">·</span>
                              <span>{article.date}</span>
                            </div>
                          </div>
                          <ArrowRight className="size-3.5 text-muted-foreground/0 group-data-[selected=true]:text-muted-foreground/50 transition-all duration-150 shrink-0 mt-0.5" />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}

                  {/* Author Results */}
                  {hasQuery && authorResults.length > 0 && (
                    <CommandGroup heading="Authors" className="px-4">
                      {authorResults.map((author) => (
                        <CommandItem
                          key={author.name}
                          value={author.name}
                          className="flex items-center gap-3 py-2.5 px-3 rounded-lg cursor-pointer transition-colors duration-150 data-[selected=true]:bg-muted group"
                        >
                          <div className="flex items-center justify-center size-8 rounded-full bg-muted text-xs font-semibold text-muted-foreground shrink-0">
                            {author.initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm leading-snug">
                              {author.name}
                            </p>
                            <p className="text-muted-foreground text-xs mt-0.5">
                              {author.specialty}
                            </p>
                          </div>
                          <ArrowRight className="size-3.5 text-muted-foreground/0 group-data-[selected=true]:text-muted-foreground/50 transition-all duration-150 shrink-0" />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}

                  {/* Category Results */}
                  {hasQuery && categoryResults.length > 0 && (
                    <CommandGroup heading="Categories" className="px-4">
                      {categoryResults.map((cat) => (
                        <CommandItem
                          key={cat.name}
                          value={cat.name}
                          className="flex items-center gap-3 py-2.5 px-3 rounded-lg cursor-pointer transition-colors duration-150 data-[selected=true]:bg-muted group"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm leading-snug">
                              {cat.name}
                            </p>
                            <p className="text-muted-foreground text-xs mt-0.5">
                              {cat.count} articles
                            </p>
                          </div>
                          <ArrowRight className="size-3.5 text-muted-foreground/0 group-data-[selected=true]:text-muted-foreground/50 transition-all duration-150 shrink-0" />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}

                  {/* Empty State */}
                  {hasQuery && !hasResults && (
                    <CommandEmpty className="py-12 text-muted-foreground/60 text-sm">
                      No results found for "{query}"
                    </CommandEmpty>
                  )}
                </CommandList>
              </Command>
            </div>

            {/* Footer Hint */}
            <div className="flex items-center justify-center gap-4 px-6 py-3 border-t border-border/40 bg-muted/30">
              <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60 tracking-wide">
                <kbd className="inline-flex items-center justify-center h-5 min-w-5 px-1 rounded border border-border/50 bg-background/80 text-[10px] font-medium text-muted-foreground/70">
                  Esc
                </kbd>
                to close
              </span>
              <span className="text-border/40">·</span>
              <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60 tracking-wide">
                <kbd className="inline-flex items-center justify-center h-5 min-w-5 px-1 rounded border border-border/50 bg-background/80 text-[10px] font-medium text-muted-foreground/70">
                  <CornerDownLeft className="size-2.5" />
                </kbd>
                to search
              </span>
              <span className="text-border/40">·</span>
              <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60 tracking-wide">
                <kbd className="inline-flex items-center justify-center h-5 min-w-5 px-1 rounded border border-border/50 bg-background/80 text-[10px] font-medium text-muted-foreground/70">
                  <ArrowUpDown className="size-2.5" />
                </kbd>
                to navigate
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}