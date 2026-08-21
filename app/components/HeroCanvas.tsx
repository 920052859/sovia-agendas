"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger, gsap } from "../lib/gsap";

interface Blob {
  baseX: number;
  baseY: number;
  radius: number;
  color: string;
  speedX: number;
  speedY: number;
  phase: number;
}

const PALETTE = ["#063b52", "#27c9d4", "#55e0c2", "#022b3d", "#27c9d4"];

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let time = 0;
    const progress = { value: 0 };

    const blobs: Blob[] = PALETTE.map((color, index) => ({
      baseX: 0.18 + (index % 3) * 0.32,
      baseY: 0.22 + Math.floor(index / 3) * 0.5,
      radius: 0.32 + (index % 2) * 0.08,
      color,
      speedX: 0.00018 + index * 0.00004,
      speedY: 0.00014 + index * 0.00003,
      phase: index * 1.3,
    }));

    function resize() {
      const rect = wrap!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const zoom = 1 + progress.value * 0.22;
      const fade = 1 - progress.value * 0.35;

      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.scale(zoom, zoom);
      ctx.translate(-width / 2, -height / 2);

      blobs.forEach((blob) => {
        const x = (blob.baseX + Math.sin(time * blob.speedX * 1000 + blob.phase) * 0.06) * width;
        const y =
          (blob.baseY + Math.cos(time * blob.speedY * 1000 + blob.phase) * 0.08 + progress.value * 0.12) * height;
        const r = blob.radius * Math.max(width, height) * (1 + progress.value * 0.15);

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
        gradient.addColorStop(0, blob.color + "cc");
        gradient.addColorStop(1, blob.color + "00");

        ctx.globalAlpha = fade;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
      ctx.globalAlpha = 1;
    }

    function loop() {
      time += 1;
      draw();
      raf = requestAnimationFrame(loop);
    }

    resize();
    draw();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);

    const trigger = ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: "bottom top",
      scrub: 0.5,
      onUpdate: (self) => {
        progress.value = self.progress;
        if (reduceMotion) draw();
      },
    });

    if (!reduceMotion) {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      trigger.kill();
    };
  }, []);

  return (
    <div className="hero-canvas-wrap" ref={wrapRef} aria-hidden="true">
      <canvas ref={canvasRef} className="hero-canvas" />
    </div>
  );
}
