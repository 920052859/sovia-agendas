"use client";

import { useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { useStore } from "../../context/store";
import { LAYOUTS, QUOTES, STICKERS } from "../../lib/config-data";
import { useTilt } from "../../lib/useTilt";
import { AreasBlock, DualBlock, FreeBlock, HoursBlock } from "./PageBlocks";
import SpiralBinding from "./SpiralBinding";
import CoverFace from "./CoverFace";
import BackFace from "./BackFace";

const MONTHS: Record<"es" | "en", string> = { es: "Enero", en: "January" };

type BookMode = "closed" | "open" | "back";

const FRONT_ROTATION: Record<BookMode, number> = { closed: 0, open: -128, back: 180 };
const BACK_ROTATION: Record<BookMode, number> = { closed: 180, open: 180, back: 0 };

export default function InteractiveBook({
  variant = "hero",
  defaultOpen = false,
}: {
  variant?: "hero" | "sticky";
  defaultOpen?: boolean;
}) {
  const { state, selected, t } = useStore();
  const [mode, setMode] = useState<BookMode>(defaultOpen ? "open" : "closed");
  const tilt = useTilt(4);
  const layout = LAYOUTS.find((item) => item.key === state.layoutMode)!;
  const activeStickers = state.stickerIds
    .slice(0, 4)
    .map((id) => STICKERS.find((sticker) => sticker.id === id))
    .filter((sticker): sticker is (typeof STICKERS)[number] => Boolean(sticker));

  const toggleOpen = () => setMode((current) => (current === "open" ? "closed" : "open"));
  const toggleBack = () => setMode((current) => (current === "back" ? "closed" : "back"));

  return (
    <div className={`book-wrap book-wrap-${variant}`}>
      <motion.div
        className="book-float"
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
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
        >
          <SpiralBinding color={selected.ringColor.hex} loops={variant === "hero" ? 16 : 20} />

          <div className="book-spread" aria-hidden={mode !== "open"}>
            <div className="book-page book-page-left">
              <span className="page-tab" style={{ backgroundColor: state.accent }}>
                {MONTHS[state.locale]}
              </span>
              <p className="page-separator-label">{selected.separator.label[state.locale]}</p>
              <div className="mini-month-grid">
                {Array.from({ length: 7 }).map((_, index) => (
                  <span key={index} />
                ))}
              </div>
            </div>
            <div className="book-page book-page-right" style={{ fontFamily: selected.coverSystem.innerFont }}>
              <header>
                <span>{layout.label[state.locale]}</span>
              </header>
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
              <blockquote>{QUOTES[state.tone][state.locale]}</blockquote>
            </div>
          </div>

          <motion.div
            className="book-cover book-back"
            style={
              {
                "--accent": state.accent,
                "--cover-material": selected.coverType.swatch,
                "--elastic-color": selected.elasticColor.hex,
                transformOrigin: "left center",
              } as CSSProperties
            }
            animate={{ rotateY: BACK_ROTATION[mode] }}
            transition={{ type: "spring", stiffness: 70, damping: 14 }}
          >
            <BackFace />
          </motion.div>

          <motion.button
            type="button"
            className="book-cover"
            onClick={toggleOpen}
            style={
              {
                "--accent": state.accent,
                "--cover-material": selected.coverType.swatch,
                "--elastic-color": selected.elasticColor.hex,
                transformOrigin: "left center",
              } as CSSProperties
            }
            animate={{ rotateY: FRONT_ROTATION[mode] }}
            transition={{ type: "spring", stiffness: 70, damping: 14 }}
            whileHover={mode === "closed" ? { rotateY: -6 } : undefined}
            aria-label={mode === "open" ? t("book.close") : t("book.open")}
          >
            <CoverFace />
          </motion.button>
        </motion.div>
      </motion.div>

      <div className="book-toggles">
        <button type="button" className="book-toggle" onClick={toggleOpen}>
          {mode === "open" ? t("book.close") : t("book.open")}
        </button>
        <button type="button" className="book-toggle" onClick={toggleBack}>
          {mode === "back" ? t("book.viewFront") : t("book.viewBack")}
        </button>
      </div>
    </div>
  );
}
