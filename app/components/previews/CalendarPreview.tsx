"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { useStore } from "../../context/store";
import { STICKERS } from "../../lib/config-data";

const MARKED_DAYS = [2, 5, 9, 14, 18, 23, 27, 30];
const WEEKDAYS: Record<"es" | "en", string[]> = {
  es: ["L", "M", "X", "J", "V", "S", "D"],
  en: ["M", "T", "W", "T", "F", "S", "S"],
};

export default function CalendarPreview() {
  const { state, t } = useStore();
  const activeStickers = STICKERS.filter(
    (sticker) => state.stickerIds.includes(sticker.id) && (!sticker.subtle || state.showCycleSticker)
  );

  return (
    <motion.div
      className={`calendar-preview calendar-${state.calendarStyleId}`}
      style={{ "--accent": state.accent } as CSSProperties}
      layout
    >
      <div className="calendar-head">
        <span>{t("calendar.title")}</span>
        <strong>{state.locale === "en" ? "January" : "Enero"}</strong>
      </div>
      <div className="calendar-weekdays">
        {WEEKDAYS[state.locale].map((day, index) => (
          <span key={`${day}-${index}`}>{day}</span>
        ))}
      </div>
      <div className="calendar-grid">
        {Array.from({ length: 31 }).map((_, index) => {
          const day = index + 1;
          const markedIndex = MARKED_DAYS.indexOf(day);
          const sticker =
            markedIndex >= 0 && activeStickers.length > 0
              ? activeStickers[markedIndex % activeStickers.length]
              : null;
          return (
            <div className={sticker ? "calendar-day marked" : "calendar-day"} key={day}>
              <span>{day}</span>
              {sticker && (
                <i className="calendar-sticker" style={{ backgroundColor: sticker.color }}>
                  {sticker.icon}
                </i>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
