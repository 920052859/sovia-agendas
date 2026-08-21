"use client";

import type { CSSProperties } from "react";
import { useStore } from "../context/store";
import {
  BINDINGS,
  COVER_FITS,
  COVER_TYPES,
  ELASTIC_COLORS,
  RING_COLORS,
  SEPARATORS,
  SIZES,
} from "../lib/config-data";

export default function PhysicalCustomizer() {
  const { state, update, price, t } = useStore();

  return (
    <section id="fisico" className="materials-section">
      <div className="shop-heading">
        <p className="section-kicker">{t("physical.kicker")}</p>
        <h2>{t("physical.title")}</h2>
      </div>

      <div className="panel size-panel">
        <h3>{t("physical.size")}</h3>
        <div className="size-grid">
          {SIZES.map((size) => (
            <button
              className={state.sizeId === size.id ? "size-card active" : "size-card"}
              key={size.id}
              onClick={() => update({ sizeId: size.id })}
              type="button"
            >
              <span>{size.label[state.locale]}</span>
              {size.standard && <em>{t("physical.sizeStandard")}</em>}
              <b>{size.priceUsd === 0 ? "+0" : price(size.priceUsd)}</b>
            </button>
          ))}
        </div>
      </div>

      <div className="physical-grid">
        <div className="panel">
          <h3>{t("physical.cover")}</h3>
          <div className="material-list">
            {COVER_TYPES.map((item) => (
              <button
                className={state.coverTypeId === item.id ? "material-option active" : "material-option"}
                key={item.id}
                onClick={() => update({ coverTypeId: item.id })}
                type="button"
              >
                <i style={{ backgroundColor: item.swatch }} />
                <span>{item.label[state.locale]}</span>
                <b>+{price(item.priceUsd)}</b>
              </button>
            ))}
          </div>
          <div className="segmented cover-fit-toggle">
            <button
              className={state.coverFit === "full" ? "active" : ""}
              onClick={() => update({ coverFit: "full" })}
              type="button"
            >
              {COVER_FITS.full[state.locale]}
            </button>
            <button
              className={state.coverFit === "exact" ? "active" : ""}
              onClick={() => update({ coverFit: "exact" })}
              type="button"
            >
              {COVER_FITS.exact[state.locale]}
            </button>
          </div>
        </div>

        <div className="panel">
          <h3>{t("physical.binding")}</h3>
          <div className="material-list">
            {BINDINGS.map((item) => (
              <button
                className={state.bindingId === item.id ? "material-option active" : "material-option"}
                key={item.id}
                onClick={() => update({ bindingId: item.id })}
                type="button"
              >
                <span>{item.label[state.locale]}</span>
                <b>+{price(item.priceUsd)}</b>
              </button>
            ))}
          </div>
          <h3 className="mt-heading">{t("physical.separators")}</h3>
          <div className="material-list">
            {SEPARATORS.map((item) => (
              <button
                className={state.separatorId === item.id ? "material-option active" : "material-option"}
                key={item.id}
                onClick={() => update({ separatorId: item.id })}
                type="button"
              >
                <span>{item.label[state.locale]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3>{t("physical.ringColor")}</h3>
          <div className="swatch-row">
            {RING_COLORS.map((item) => (
              <button
                className={state.ringColorId === item.id ? "swatch-btn active" : "swatch-btn"}
                key={item.id}
                onClick={() => update({ ringColorId: item.id })}
                style={{ "--swatch": item.hex } as CSSProperties}
                title={item.label[state.locale]}
                type="button"
              />
            ))}
          </div>
          <h3 className="mt-heading">{t("physical.elasticColor")}</h3>
          <div className="swatch-row">
            {ELASTIC_COLORS.map((item) => (
              <button
                className={state.elasticColorId === item.id ? "swatch-btn active" : "swatch-btn"}
                key={item.id}
                onClick={() => update({ elasticColorId: item.id })}
                style={{ "--swatch": item.hex } as CSSProperties}
                title={item.label[state.locale]}
                type="button"
              />
            ))}
          </div>
          <h3 className="mt-heading">{t("physical.finishes")}</h3>
          <label className="toggle-row">
            <input
              checked={state.goldFoil}
              onChange={(event) => update({ goldFoil: event.target.checked, silverFoil: event.target.checked ? false : state.silverFoil })}
              type="checkbox"
            />
            <span>{t("physical.goldFoil")}</span>
            <b>+{price(18)}</b>
          </label>
          <label className="toggle-row">
            <input
              checked={state.silverFoil}
              onChange={(event) => update({ silverFoil: event.target.checked, goldFoil: event.target.checked ? false : state.goldFoil })}
              type="checkbox"
            />
            <span>{t("physical.silverFoil")}</span>
            <b>+{price(14)}</b>
          </label>
          <label className="toggle-row">
            <input
              checked={state.pageSeal}
              onChange={(event) => update({ pageSeal: event.target.checked })}
              type="checkbox"
            />
            <span>{t("physical.pageSeal")}</span>
            <b>+{price(10)}</b>
          </label>
        </div>
      </div>
    </section>
  );
}
