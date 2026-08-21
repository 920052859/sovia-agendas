"use client";

import { useEffect } from "react";
import { gsap } from "../lib/gsap";

export default function CustomCursor() {
  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    let cursor: import("mouse-follower").default | undefined;
    let cancelled = false;

    import("mouse-follower").then(({ default: MouseFollower }) => {
      if (cancelled) return;
      MouseFollower.registerGSAP(gsap);
      cursor = new MouseFollower({
        className: "mf-cursor sovia-cursor",
        speed: 0.55,
        skewing: 1.4,
      });
    });

    return () => {
      cancelled = true;
      cursor?.destroy();
    };
  }, []);

  return null;
}
