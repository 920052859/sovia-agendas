"use client";

import { motion } from "framer-motion";
import { useStore } from "../context/store";
import { TEMPLATES } from "../lib/config-data";

export default function TemplateGallery() {
  const { state, applyTemplate, t } = useStore();

  return (
    <section id="disenos" className="templates-section">
      <div className="shop-heading">
        <p className="section-kicker">{t("templates.kicker")}</p>
        <h2>{t("templates.title")}</h2>
        <p>{t("templates.lead")}</p>
      </div>
      <div className="template-grid">
        {TEMPLATES.map((template, index) => {
          const active = state.templateId === template.id;
          return (
            <motion.button
              className={active ? "template-card active" : "template-card"}
              key={template.id}
              onClick={() => applyTemplate(template.id)}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: (index % 4) * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <div className="template-swatch" style={{ backgroundColor: template.accent }}>
                <span />
                <span />
                <span />
              </div>
              <h3>{template.name[state.locale]}</h3>
              <p>{template.description[state.locale]}</p>
              <em>{active ? t("templates.active") : t("templates.use")}</em>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
