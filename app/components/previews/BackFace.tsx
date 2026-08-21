"use client";

import { useStore } from "../../context/store";
import { PLANNER_YEAR } from "../../lib/config-data";

export default function BackFace() {
  const { state, selected } = useStore();
  const system = selected.coverSystem;
  const initials = state.initials || state.coverTitle.slice(0, 2).toUpperCase();

  return (
    <div className={`cover-face back-face cover-align-${system.align}`}>
      {selected.coverType.illustrated && (
        <div className={`cover-illustration cover-illustration-${selected.coverType.id}`} />
      )}
      <div className="cover-grain" />
      <div className="elastic-band" aria-hidden="true" />

      <div className="back-content">
        <span className="back-emblem" style={{ fontFamily: system.titleFont }}>
          {initials}
        </span>
        <span className="back-brand" style={{ fontFamily: system.titleFont }}>
          {state.coverTitle}
        </span>
        <span className="back-year">{PLANNER_YEAR}</span>
      </div>
    </div>
  );
}
