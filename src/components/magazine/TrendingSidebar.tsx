'use client';

import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';
import { trendingTopics, articles } from '@/lib/magazine-data';

interface TrendingSidebarProps {
  onArticleOpen: (id: string) => void;
}

function formatViews(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

export default function TrendingSidebar({ onArticleOpen }: TrendingSidebarProps) {
  const handleTopicClick = (topic: (typeof trendingTopics)[0]) => {
    const match = articles.find(
      (a) => a.title.toLowerCase().includes(topic.title.toLowerCase().split(':')[0].toLowerCase())
    );
    if (match) {
      onArticleOpen(match.id);
    }
  };

  return (
    <aside className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <TrendingUp className="h-5 w-5 text-accent" />
        <h3 className="text-lg font-bold">Trending Now</h3>
      </div>
      <ol className="space-y-4">
        {trendingTopics.map((topic, i) => (
          <li key={i}>
            <button
              onClick={() => handleTopicClick(topic)}
              className="flex items-start gap-3 text-left group w-full"
            >
              <span className="text-2xl font-bold text-primary/30 leading-none mt-0.5 tabular-nums w-7 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {topic.title}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                    {topic.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatViews(topic.views)} views
                  </span>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ol>
    </aside>
  );
}
