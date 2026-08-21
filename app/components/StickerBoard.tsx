"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { useStore } from "../context/store";
import { STICKERS } from "../lib/config-data";
import CalendarPreview from "./previews/CalendarPreview";

export default function StickerBoard() {
  const { state, update, toggleSticker, t } = useStore();
  const visibleStickers = STICKERS.filter((sticker) => !sticker.subtle);
  const subtleStickers = STICKERS.filter((sticker) => sticker.subtle);

  return (
    <section id="stickers" className="stickers-section">
      <div className="shop-heading">
        <p className="section-kicker">{t("stickers.kicker")}</p>
        <h2>{t("stickers.title")}</h2>
        <p>{t("stickers.lead")}</p>
      </div>
      <div className="stickers-layout">
        <div className="sticker-picker">
          {visibleStickers.map((sticker) => {
            const active = state.stickerIds.includes(sticker.id);
            return (
              <motion.button
                className={active ? "sticker-chip active" : "sticker-chip"}
                key={sticker.id}
                onClick={() => toggleSticker(sticker.id)}
                type="button"
                style={{ "--chip-color": sticker.color } as CSSProperties}
                whileTap={{ scale: 0.95 }}
              >
                <i>{sticker.icon}</i>
                <span>{sticker.label[state.locale]}</span>
              </motion.button>
            );
          })}
          {subtleStickers.length > 0 && (
            <label className="toggle-row cycle-toggle">
              <input
                checked={state.showCycleSticker}
                onChange={(event) => update({ showCycleSticker: event.target.checked })}
                type="checkbox"
              />
              <span>{t("stickers.cycleToggle")}</span>
            </label>
          )}
        </div>
        <CalendarPreview />
      </div>
    </section>
  );
}
