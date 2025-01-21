'use client';

import { useEffect, useRef } from 'react';

// Cache for preloaded images
const imageCache = new Set<string>();

export function PostMediaPrefetcher({ mediaUrls }: { mediaUrls: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mediaUrls?.length) return;

    // Create intersection observer for viewport detection
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // Prefetch remaining thumbnail images
          mediaUrls.slice(1).forEach((url) => {
            if (!imageCache.has(url + '_thumb')) {
              const img = new Image();
              img.decoding = 'async';
              img.fetchPriority = 'low';
              img.src = url;
              imageCache.add(url + '_thumb');
            }
          });

          // Also prefetch the first full-size image for modal view
          if (!imageCache.has(mediaUrls[0] + '_full')) {
            const fullImg = new Image();
            fullImg.decoding = 'async';
            fullImg.fetchPriority = 'low';
            fullImg.sizes = '90vw'; // Match the dialog content size
            fullImg.src = mediaUrls[0];
            imageCache.add(mediaUrls[0] + '_full');
          }
          observer.disconnect();
        }
      },
      { rootMargin: '50px', threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [mediaUrls]);

  return <div ref={containerRef} />;
}
