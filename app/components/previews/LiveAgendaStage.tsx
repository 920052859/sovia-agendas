"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "../../context/store";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { STICKERS } from "../../lib/config-data";
import { SCENE_ORDER, SCENES, type SceneKey } from "../../lib/scenes";
import { useTilt } from "../../lib/useTilt";
import { AreasBlock, DualBlock, FreeBlock, HoursBlock } from "./PageBlocks";
import SpiralBinding from "./SpiralBinding";
import CoverFace from "./CoverFace";

const MONTHS: Record<"es" | "en", string> = { es: "Enero", en: "January" };
const MINI_DAYS = Array.from({ length: 21 }, (_, i) => i + 1);
const MARKED = [3, 7, 12, 17];

export default function LiveAgendaStage({ stage }: { stage: SceneKey }) {
  const { state, selected, t } = useStore();
  const tilt = useTilt(3.5);
  const target = SCENES[stage];
  const isOpen = target.contentMode.startsWith("open");
  const activeStickers = state.stickerIds
    .slice(0, 4)
    .map((id) => STICKERS.find((sticker) => sticker.id === id))
    .filter((sticker): sticker is (typeof STICKERS)[number] => Boolean(sticker));

  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!viewportRef.current) return;
      gsap.fromTo(
        viewportRef.current,
        { rotateZ: -1.4 },
        {
          rotateZ: 1.4,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
          },
        }
      );
    }, viewportRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="live-stage">
      <div className="stage-viewport" ref={viewportRef}>
        <motion.div
          className="book-float"
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            ref={tilt.ref}
            className="book-scene"
            style={
              {
                aspectRatio: selected.size.ratio,
                "--accent": state.accent,
                rotateX: tilt.rotateX,
                rotateY: tilt.rotateY,
              } as CSSProperties
            }
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            animate={{ scale: target.scale, y: target.y }}
            transition={{ type: "spring", stiffness: 60, damping: 16, mass: 0.9 }}
          >
            <SpiralBinding color={selected.ringColor.hex} loops={18} />

            <div className="book-spread" aria-hidden={!isOpen}>
              <AnimatePresence mode="wait">
                {target.contentMode === "open-daily" && (
                  <motion.div
                    key="daily"
                    className="book-spread-inner"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="book-page book-page-left">
                      <span className="page-tab" style={{ backgroundColor: state.accent }}>
                        {MONTHS[state.locale]}
                      </span>
                      <p className="page-separator-label">{selected.separator.label[state.locale]}</p>
                    </div>
                    <div className="book-page book-page-right" style={{ fontFamily: selected.coverSystem.innerFont }}>
                      {state.layoutMode === "horaria" && <HoursBlock locale={state.locale} />}
                      {state.layoutMode === "areas" && <AreasBlock locale={state.locale} />}
                      {state.layoutMode === "libre" && <FreeBlock />}
                      {state.layoutMode === "dual" && <DualBlock locale={state.locale} />}
                      <div className="planner-stickers">
                        {activeStickers.map((sticker) => (
                          <span className="sticker-dot" key={sticker.id} style={{ backgroundColor: sticker.color }}>
                            {sticker.icon}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {target.contentMode === "open-calendar" && (
                  <motion.div
                    key="calendar"
                    className="book-spread-inner"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="book-page book-page-full">
                      <span className="page-tab" style={{ backgroundColor: state.accent }}>
                        {MONTHS[state.locale]}
                      </span>
                      <div className="mini-calendar-grid">
                        {MINI_DAYS.map((day) => {
                          const marked = MARKED.includes(day);
                          const sticker = marked
                            ? activeStickers[MARKED.indexOf(day) % Math.max(activeStickers.length, 1)]
                            : null;
                          return (
                            <span key={day} className={marked ? "marked" : ""}>
                              {day}
                              {sticker && <i style={{ backgroundColor: sticker.color }} />}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {target.contentMode === "open-vision" && (
                  <motion.div
                    key="vision"
                    className="book-spread-inner"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="book-page book-page-full">
                      <span className="page-tab" style={{ backgroundColor: state.accent }}>
                        {t("vision.title")}
                      </span>
                      <div className="mini-vision-grid">
                        {["💼", "🌿", "💰", "🎯", "🎨", "🤍"].map((icon, index) => (
                          <span
                            key={index}
                            style={{ background: `color-mix(in srgb, var(--accent) ${10 + index * 4}%, #f8fbfc)` }}
                          >
                            {icon}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              className="book-cover"
              style={
                {
                  "--accent": state.accent,
                  "--cover-material": selected.coverType.swatch,
                  "--elastic-color": selected.elasticColor.hex,
                  transformOrigin: "left center",
                } as CSSProperties
              }
              animate={{ rotateY: isOpen ? -128 : target.rotateY }}
              transition={{ type: "spring", stiffness: 60, damping: 16, mass: 0.9 }}
            >
              <CoverFace
                focusMode={
                  target.contentMode === "cover-material" ? "material" : target.contentMode === "cover-title" ? "title" : undefined
                }
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={stage}
          className="stage-caption"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
        >
          {target.caption[state.locale]}
        </motion.p>
      </AnimatePresence>

      <div className="stage-dots" aria-hidden="true">
        {SCENE_ORDER.map((key) => (
          <span key={key} className={key === stage ? "active" : ""} />
        ))}
      </div>
    </div>
  );
}
