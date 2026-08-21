"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

const GLOW_STOPS = ["#063b52", "#27c9d4", "#55e0c2", "#022b3d"];

export default function CustomCursor() {
  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    let cursor: import("mouse-follower").default | undefined;
    let trigger: ScrollTrigger | undefined;
    let cancelled = false;

    import("mouse-follower").then(({ default: MouseFollower }) => {
      if (cancelled) return;
      MouseFollower.registerGSAP(gsap);
      cursor = new MouseFollower({
        className: "mf-cursor sovia-cursor",
        speed: 0.55,
        skewing: 1.4,
      });

      const el = cursor.el as HTMLElement;
      const toGlow = gsap.utils.interpolate(GLOW_STOPS);

      trigger = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        onUpdate: (self) => {
          el.style.setProperty("--cursor-glow", toGlow(self.progress));
        },
      });
    });

    return () => {
      cancelled = true;
      trigger?.kill();
      cursor?.destroy();
    };
  }, []);

  return null;
}
