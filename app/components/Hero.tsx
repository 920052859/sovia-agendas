"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useStore } from "../context/store";
import { gsap, ScrollTrigger } from "../lib/gsap";
import TopNav from "./TopNav";
import InteractiveBook from "./previews/InteractiveBook";

export default function Hero() {
  const { t } = useStore();
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const titleMainWords = t("hero.titleMain").split(" ");
  const titleAccentWords = t("hero.titleAccent").split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!stageRef.current || !heroRef.current) return;

      gsap.to(stageRef.current, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll(".word-reveal");
        gsap.set(words, { yPercent: 110 });
        gsap.to(words, {
          yPercent: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.055,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
            once: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-band" ref={heroRef}>
      <TopNav />

      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-14 pt-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">{t("hero.eyebrow")}</p>
          <h1 ref={titleRef} className="title-reveal">
            {titleMainWords.map((word, index) => (
              <span className="word-mask" key={`main-${index}`}>
                <span className="word-reveal">{word}</span>
              </span>
            ))}{" "}
            <em>
              {titleAccentWords.map((word, index) => (
                <span className="word-mask" key={`accent-${index}`}>
                  <span className="word-reveal">{word}</span>
                </span>
              ))}
            </em>
          </h1>
          <p className="lead">{t("hero.lead")}</p>
          <div className="hero-feature-row">
            <span>{t("hero.feature1")}</span>
            <span>{t("hero.feature2")}</span>
            <span>{t("hero.feature3")}</span>
          </div>
          <div className="hero-actions">
            <a href="#cuestionario" className="primary-action">
              {t("hero.startQuiz")}
            </a>
            <a href="#disenos" className="secondary-action">
              {t("hero.viewTemplates")}
            </a>
          </div>
        </motion.div>

        <motion.div
          className="product-stage"
          aria-label="Simulacion de agenda"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div ref={stageRef}>
            <motion.div
              className="floating-item"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <InteractiveBook variant="hero" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
