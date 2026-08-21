"use client";

import { useStore } from "../context/store";
import SoviaMark from "./SoviaMark";

export default function TopNav() {
  const { state, update, t } = useStore();

  return (
    <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 top-nav">
      <div className="brand-mark">
        <SoviaMark size={30} />
        <span>SoVia</span>
      </div>
      <div className="hidden items-center gap-6 text-sm font-medium md:flex nav-links">
        <a href="#">{t("nav.home")}</a>
        <a href="#disenos">{t("nav.templates")}</a>
        <a href="#stickers">{t("nav.calendar")}</a>
        <a href="#fisico">{t("nav.physical")}</a>
        <a href="#personalizador">{t("nav.customize")}</a>
        <a href="#pedido">{t("nav.about")}</a>
      </div>
      <div className="nav-controls">
        <div className="pill-toggle" role="group" aria-label="Idioma">
          <button
            className={state.locale === "es" ? "active" : ""}
            onClick={() => update({ locale: "es" })}
            type="button"
          >
            ES
          </button>
          <button
            className={state.locale === "en" ? "active" : ""}
            onClick={() => update({ locale: "en" })}
            type="button"
          >
            EN
          </button>
        </div>
        <div className="pill-toggle" role="group" aria-label="Moneda">
          <button
            className={state.currency === "USD" ? "active" : ""}
            onClick={() => update({ currency: "USD" })}
            type="button"
          >
            USD
          </button>
          <button
            className={state.currency === "PEN" ? "active" : ""}
            onClick={() => update({ currency: "PEN" })}
            type="button"
          >
            PEN
          </button>
        </div>
        <a className="nav-cta" href="#personalizador">
          {t("nav.cta")}
        </a>
      </div>
    </nav>
  );
}
