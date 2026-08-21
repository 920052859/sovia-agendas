"use client";

import { motion } from "framer-motion";
import { useStore } from "../context/store";
import { PACKS } from "../lib/config-data";

export default function PackPicker() {
  const { state, update, price, t } = useStore();

  return (
    <section id="pack" className="shop-section">
      <div className="shop-heading">
        <p className="section-kicker">{t("packs.kicker")}</p>
        <h2>{t("packs.title")}</h2>
      </div>
      <div className="pack-grid">
        {PACKS.map((pack) => (
          <motion.button
            key={pack.id}
            type="button"
            className={state.packId === pack.id ? "pack-card selected" : "pack-card"}
            onClick={() => update({ packId: pack.id })}
            whileHover={{ y: -4 }}
          >
            <span>{pack.name[state.locale]}</span>
            <strong>{price(pack.priceUsd)}</strong>
            <p>{pack.components[state.locale]}</p>
            <em>{state.packId === pack.id ? t("packs.selected") : t("packs.select")}</em>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
