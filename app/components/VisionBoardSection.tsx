"use client";

import { useStore } from "../context/store";
import { VISION_STYLES } from "../lib/config-data";
import VisionBoardPreview from "./previews/VisionBoardPreview";

export default function VisionBoardSection() {
  const { state, update, t } = useStore();

  return (
    <section id="vision-board" className="vision-section">
      <div className="shop-heading">
        <p className="section-kicker">{t("vision.kicker")}</p>
        <h2>{t("vision.title")}</h2>
      </div>
      <div className="vision-layout">
        <div className="segmented vision-style-picker">
          {VISION_STYLES.map((style) => (
            <button
              key={style.id}
              className={state.visionStyleId === style.id ? "active" : ""}
              onClick={() => update({ visionStyleId: style.id })}
              type="button"
            >
              {style.label[state.locale]}
            </button>
          ))}
        </div>
        <VisionBoardPreview />
      </div>
    </section>
  );
}
