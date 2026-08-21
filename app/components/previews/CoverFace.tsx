"use client";

import { useStore } from "../../context/store";
import { PLANNER_YEAR } from "../../lib/config-data";

export default function CoverFace({ focusMode }: { focusMode?: "material" | "title" }) {
  const { state, selected } = useStore();
  const system = selected.coverSystem;
  const initials = state.initials || state.coverTitle.slice(0, 2).toUpperCase();

  return (
    <div
      className={`cover-face cover-align-${system.align} cover-motif-${system.motif}${
        focusMode ? ` focus-${focusMode}` : ""
      }`}
    >
      {selected.coverType.illustrated && (
        <div className={`cover-illustration cover-illustration-${selected.coverType.id}`} />
      )}
      <div className="cover-grain" />
      <div className="elastic-band" aria-hidden="true" />

      <div className="cover-content">
        {state.initials !== "" && <span className="cover-monogram">{initials}</span>}

        <div
          className="cover-title"
          style={{
            fontFamily: system.titleFont,
            fontWeight: system.weight,
            textTransform: system.titleCase === "upper" ? "uppercase" : "none",
          }}
        >
          {state.coverTitle}
        </div>

        {state.coverPhrase && (
          <p className="cover-phrase" style={{ fontFamily: system.phraseFont }}>
            {state.coverPhrase}
          </p>
        )}

        <div className="cover-foot-row">
          <span className="cover-year">{PLANNER_YEAR}</span>
          {(state.goldFoil || state.silverFoil) && (
            <span className={state.goldFoil ? "cover-seal seal-gold" : "cover-seal seal-silver"}>{initials}</span>
          )}
        </div>
      </div>
    </div>
  );
}
