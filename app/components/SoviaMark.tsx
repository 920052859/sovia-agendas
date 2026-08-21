"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function SoviaMark({ size = 34, dark = false }: { size?: number; dark?: boolean }) {
  const strokeColor = dark ? "#f8fbfc" : "var(--ink)";
  const gradId = dark ? "sovia-mark-grad-dark" : "sovia-mark-grad-light";

  const svgRef = useRef<SVGSVGElement>(null);
  const sPathRef = useRef<SVGPathElement>(null);
  const vPathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sPath = sPathRef.current;
      const vPath = vPathRef.current;
      const dot = dotRef.current;
      if (!sPath || !vPath || !dot || !svgRef.current) return;

      const sLength = sPath.getTotalLength();
      const vLength = vPath.getTotalLength();

      gsap.set(sPath, { strokeDasharray: sLength, strokeDashoffset: sLength });
      gsap.set(vPath, { strokeDasharray: vLength, strokeDashoffset: vLength });
      gsap.set(dot, { scale: 0, transformOrigin: "50% 50%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 95%",
          once: true,
        },
      });

      tl.to(sPath, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" })
        .to(vPath, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, "-=0.35")
        .to(dot, { scale: 1, duration: 0.4, ease: "back.out(3)" }, "-=0.3");
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="26" y1="10" x2="42" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#55e0c2" />
          <stop offset="100%" stopColor="#27c9d4" />
        </linearGradient>
      </defs>
      <path
        ref={sPathRef}
        d="M28 12c0-3.4-3.4-5.4-7.6-5.4-5 0-9 2.7-9 6.6 0 4.1 4.2 5.4 8.2 6.4 5 1.2 10.2 2.6 10.2 8 0 5.1-5 8.2-10.6 8.2-4.8 0-9.4-2.2-9.4-6.4"
        stroke={strokeColor}
        strokeWidth="3.1"
        strokeLinecap="round"
      />
      <circle ref={dotRef} cx="30.5" cy="20.5" r="1.9" fill={`url(#${gradId})`} />
      <path ref={vPathRef} d="M34 15 L42 33" stroke={`url(#${gradId})`} strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  );
}
