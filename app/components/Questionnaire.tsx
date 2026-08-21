"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "../context/store";
import { QUESTIONS } from "../lib/questions";
import type { AiRecommendation } from "../lib/ai";
import { STICKERS } from "../lib/config-data";

export default function Questionnaire() {
  const { state, setAnswer, update, t } = useStore();
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<AiRecommendation | null>(null);
  const [applied, setApplied] = useState(false);
  const [aiSource, setAiSource] = useState<"ai" | "local" | null>(null);

  async function askAi() {
    setLoading(true);
    setApplied(false);
    try {
      const response = await fetch("/api/ai-recommendation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          answers: state.answers,
          prompt: state.freeformPrompt,
          locale: state.locale,
        }),
      });
      const data = (await response.json()) as { recommendation: AiRecommendation; source: "ai" | "local" };
      setRecommendation(data.recommendation);
      setAiSource(data.source);
    } catch {
      setRecommendation(null);
    } finally {
      setLoading(false);
    }
  }

  function applyRecommendation() {
    if (!recommendation) return;
    update({
      accent: recommendation.accent,
      tone: recommendation.tone,
      layoutMode: recommendation.layoutMode,
      coverTypeId: recommendation.coverTypeId,
      bindingId: recommendation.bindingId,
      coverSystemId: recommendation.coverSystemId,
      ringColorId: recommendation.ringColorId,
      elasticColorId: recommendation.elasticColorId,
      visionStyleId: recommendation.visionStyleId,
      calendarStyleId: recommendation.calendarStyleId,
      stickerIds: recommendation.stickerIds,
      templateId: null,
    });
    setApplied(true);
  }

  return (
    <section id="cuestionario" className="wizard-section">
      <div className="wizard-copy">
        <p className="section-kicker">{t("quiz.kicker")}</p>
        <h2>{t("quiz.title")}</h2>
        <p>{t("quiz.lead")}</p>
      </div>
      <div className="question-grid">
        {QUESTIONS.map((question, index) => (
          <motion.div
            className="question-card"
            key={question.field}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.06 }}
          >
            <span>0{index + 1}</span>
            <h3>{t(question.titleKey)}</h3>
            <div className="choice-list">
              {question.options.map((option) => (
                <button
                  className={state.answers[question.field] === option.value ? "active" : ""}
                  key={option.value}
                  onClick={() => setAnswer(question.field, option.value)}
                  type="button"
                >
                  {option.label[state.locale]}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="ai-recommendation">
        <label>
          {t("quiz.promptLabel")}
          <textarea
            value={state.freeformPrompt}
            onChange={(event) => update({ freeformPrompt: event.target.value })}
            placeholder={t("quiz.promptPlaceholder")}
          />
        </label>
        <motion.div layout className="assistant-message">
          <button type="button" className="ask-ai-button" onClick={askAi} disabled={loading}>
            {loading ? t("quiz.asking") : t("quiz.askAi")}
          </button>
          <AnimatePresence mode="wait">
            {recommendation && (
              <motion.div
                key={recommendation.message.es}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <strong>{t("quiz.aiTitle")}</strong>
                <p>{recommendation.message[state.locale]}</p>
                <div className="ai-sticker-preview">
                  {recommendation.stickerIds.map((id) => {
                    const sticker = STICKERS.find((item) => item.id === id);
                    if (!sticker) return null;
                    return (
                      <span key={id} style={{ backgroundColor: sticker.color }}>
                        {sticker.icon} {sticker.label[state.locale]}
                      </span>
                    );
                  })}
                </div>
                <button type="button" onClick={applyRecommendation}>
                  {applied ? t("quiz.applied") : t("quiz.apply")}
                </button>
                {aiSource === "local" && <small>{t("quiz.aiOffline")}</small>}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
