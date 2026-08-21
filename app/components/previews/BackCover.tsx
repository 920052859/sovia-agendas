"use client";

import type { CSSProperties } from "react";
import { useStore } from "../../context/store";
import { LAYOUTS } from "../../lib/config-data";

export default function BackCover() {
  const { state, selected, t } = useStore();
  const layout = LAYOUTS.find((item) => item.key === state.layoutMode)!;

  return (
    <div className="back-cover" style={{ "--accent": state.accent } as CSSProperties}>
      <p>{state.locale === "en" ? "Spec sheet" : "Ficha tecnica"}</p>
      <h3>{state.locale === "en" ? "Your daily system in physical form" : "Tu sistema diario en formato fisico"}</h3>
      <ul>
        <li>
          <b>{t("physical.size")}:</b> {selected.size.label[state.locale]}
        </li>
        <li>
          <b>{t("physical.cover")}:</b> {selected.coverType.label[state.locale]}
        </li>
        <li>
          <b>{t("physical.binding")}:</b> {selected.binding.label[state.locale]}
        </li>
        <li>
          <b>{t("physical.separators")}:</b> {selected.separator.label[state.locale]}
        </li>
        <li>
          <b>{t("layout.kicker")}:</b> {layout.label[state.locale]}
        </li>
        <li>
          <b>{t("customizer.system")}:</b> {selected.coverSystem.label[state.locale]}
        </li>
      </ul>
    </div>
  );
}
