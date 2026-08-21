"use client";

import { useStore } from "../context/store";
import { COVER_SYSTEMS } from "../lib/config-data";

const TONES = ["serena", "intensa", "poetica", "filosofica"] as const;

export default function Personalizer() {
  const { state, update, t } = useStore();

  return (
    <div className="panel controls-panel" id="personalizador">
      <p className="section-kicker">{t("customizer.kicker")}</p>
      <h2>{t("customizer.title")}</h2>

      <label>
        {t("customizer.coverTitle")}
        <input value={state.coverTitle} onChange={(event) => update({ coverTitle: event.target.value })} />
      </label>

      <label>
        {t("customizer.initials")}
        <input value={state.initials} onChange={(event) => update({ initials: event.target.value })} maxLength={4} />
      </label>

      <label>
        {t("customizer.phrase")}
        <input value={state.coverPhrase} onChange={(event) => update({ coverPhrase: event.target.value })} />
      </label>

      <label>
        {t("customizer.accent")}
        <input
          className="color-input"
          type="color"
          value={state.accent}
          onChange={(event) => update({ accent: event.target.value })}
        />
      </label>

      <fieldset>
        <legend>{t("customizer.system")}</legend>
        <div className="system-grid">
          {COVER_SYSTEMS.map((system) => (
            <button
              className={state.coverSystemId === system.id ? "system-card active" : "system-card"}
              key={system.id}
              onClick={() => update({ coverSystemId: system.id })}
              type="button"
            >
              <span className="system-preview" style={{ fontFamily: system.titleFont, fontWeight: system.weight }}>
                Aa
              </span>
              <span className="system-label">{system.label[state.locale]}</span>
              <span className="system-description">{system.description[state.locale]}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>{t("customizer.tone")}</legend>
        <div className="tone-grid">
          {TONES.map((tone) => (
            <button
              key={tone}
              className={state.tone === tone ? "active" : ""}
              onClick={() => update({ tone })}
              type="button"
            >
              {tone}
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
