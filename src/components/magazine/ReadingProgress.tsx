'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const maxScroll = docHeight - viewportHeight;

      if (maxScroll > 0) {
        setProgress((scrollY / maxScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[3px] bg-primary z-[60] transition-all duration-150"
      style={{
        width: `${progress}%`,
        opacity: progress === 0 ? 0 : 1,
      }}
    />
  );
}