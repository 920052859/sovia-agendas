"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { useStore } from "../../context/store";

const TILES: Array<{ id: string; icon: string; label: { es: string; en: string } }> = [
  { id: "trabajo", icon: "💼", label: { es: "Trabajo enfocado", en: "Focused work" } },
  { id: "aprendizaje", icon: "📚", label: { es: "Aprender algo nuevo", en: "Learn something new" } },
  { id: "finanzas", icon: "💰", label: { es: "Libertad financiera", en: "Financial freedom" } },
  { id: "salud", icon: "🌿", label: { es: "Cuerpo en calma", en: "Calm body" } },
  { id: "habitos", icon: "🔁", label: { es: "Habitos que sostienen", en: "Habits that hold you" } },
  { id: "creatividad", icon: "🎨", label: { es: "Espacio creativo", en: "Creative space" } },
  { id: "viajes", icon: "🧭", label: { es: "Nuevos lugares", en: "New places" } },
  { id: "paz", icon: "🤍", label: { es: "Paz interior", en: "Inner peace" } },
  { id: "mini-metas", icon: "🎯", label: { es: "Mini metas cumplidas", en: "Mini goals reached" } },
];

const GOAL_TO_TILE: Record<string, string> = {
  trabajo: "trabajo",
  aprendizaje: "aprendizaje",
  "desarrollo-personal": "paz",
  finanzas: "finanzas",
  habitos: "habitos",
  salud: "salud",
  "mini-metas": "mini-metas",
};

export default function VisionBoardPreview() {
  const { state, t } = useStore();
  const highlightId = GOAL_TO_TILE[state.answers.mainGoal] ?? "trabajo";

  return (
    <motion.div
      className={`vision-board vision-${state.visionStyleId}`}
      style={{ "--accent": state.accent } as CSSProperties}
      layout
    >
      <div className="vision-head">
        <span>{t("vision.title")}</span>
      </div>
      <div className="vision-grid">
        {TILES.map((tile) => (
          <motion.div
            className={tile.id === highlightId ? "vision-tile highlight" : "vision-tile"}
            key={tile.id}
            layout
            whileHover={{ y: -3 }}
          >
            <span className="vision-icon">{tile.icon}</span>
            <p>{tile.label[state.locale]}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
