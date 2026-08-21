"use client";

import { motion } from "framer-motion";
import { useStore } from "../context/store";
import { LAYOUTS } from "../lib/config-data";

export default function InternalLayoutPicker() {
  const { state, update, t } = useStore();

  return (
    <div className="panel layout-panel">
      <p className="section-kicker">{t("layout.kicker")}</p>
      <h2>{t("layout.title")}</h2>
      <p className="panel-lead">{t("layout.lead")}</p>
      <div className="layout-grid">
        {LAYOUTS.map((item) => (
          <motion.button
            className={state.layoutMode === item.key ? "layout-card active" : "layout-card"}
            key={item.key}
            layout
            onClick={() => update({ layoutMode: item.key })}
            type="button"
            whileHover={{ y: -5 }}
          >
            <span>{item.label[state.locale]}</span>
            <p>{item.detail[state.locale]}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
