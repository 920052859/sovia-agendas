"use client";

import { useEffect, useState, type RefObject } from "react";

export function useActiveSection(refs: RefObject<HTMLElement | null>[], keys: string[]): string {
  const [active, setActive] = useState(keys[0]);

  useEffect(() => {
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const key = (entry.target as HTMLElement).dataset.sceneKey;
          if (!key) continue;
          ratios.set(key, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let bestKey = active;
        let bestRatio = 0;
        for (const key of keys) {
          const ratio = ratios.get(key) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestKey = key;
          }
        }
        if (bestRatio > 0) setActive(bestKey);
      },
      { threshold: [0, 0.15, 0.3, 0.5, 0.7, 0.9, 1], rootMargin: "-15% 0px -15% 0px" }
    );

    refs.forEach((ref, index) => {
      if (ref.current) {
        ref.current.dataset.sceneKey = keys[index];
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refs.length]);

  return active;
}
