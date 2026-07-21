"use client";

import { useState, useMemo, useCallback } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { articles } from "@/lib/magazine-data";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
  onArticleOpen: (id: string) => void;
}

export function SearchOverlay({ open, onClose, onArticleOpen }: SearchOverlayProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
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

  const handleSelect = useCallback(
    (id: string) => {
      onArticleOpen(id);
      setQuery("");
      onClose();
    },
    [onArticleOpen, onClose]
  );

  return (
    <CommandDialog open={open} onOpenChange={(v) => { if (!v) { onClose(); setQuery(""); } }}>
      <CommandInput
        placeholder="Search articles, categories, authors..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {results.length > 0 && (
          <CommandGroup heading="Articles">
            {results.map((article) => (
              <CommandItem
                key={article.id}
                value={article.id}
                onSelect={() => handleSelect(article.id)}
                className="flex flex-col items-start gap-1 py-3"
              >
                <div className="flex items-center gap-2 w-full">
                  <span className="font-medium text-sm flex-1">
                    {article.title}
                  </span>
                  <Badge variant="secondary" className="text-[10px] shrink-0">
                    {article.category}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">
                  {article.author.name} &middot; {article.readTime}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
