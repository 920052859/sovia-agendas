import type { LocalizedText } from "./types";

export interface QuestionOption {
  value: string;
  label: LocalizedText;
}

export interface QuestionDef {
  field:
    | "personality"
    | "mainGoal"
    | "rhythm"
    | "visualStyle"
    | "structureLevel";
  titleKey: string;
  options: QuestionOption[];
}

export const QUESTIONS: QuestionDef[] = [
  {
    field: "personality",
    titleKey: "quiz.personality",
    options: [
      { value: "minimalista", label: { es: "Minimalista", en: "Minimalist" } },
      { value: "creativa", label: { es: "Creativa", en: "Creative" } },
      { value: "ejecutiva", label: { es: "Ejecutiva", en: "Executive" } },
      { value: "espiritual", label: { es: "Espiritual / reflexiva", en: "Spiritual / reflective" } },
      { value: "intensa", label: { es: "Intensa", en: "Intense" } },
      { value: "serena", label: { es: "Serena", en: "Serene" } },
    ],
  },
  {
    field: "mainGoal",
    titleKey: "quiz.goal",
    options: [
      { value: "trabajo", label: { es: "Trabajo", en: "Work" } },
      { value: "aprendizaje", label: { es: "Aprendizaje", en: "Learning" } },
      { value: "desarrollo-personal", label: { es: "Desarrollo personal", en: "Personal growth" } },
      { value: "finanzas", label: { es: "Independencia financiera", en: "Financial independence" } },
      { value: "habitos", label: { es: "Habitos", en: "Habits" } },
      { value: "salud", label: { es: "Salud", en: "Health" } },
      { value: "mini-metas", label: { es: "Mini metas", en: "Mini goals" } },
    ],
  },
  {
    field: "rhythm",
    titleKey: "quiz.rhythm",
    options: [
      { value: "horas", label: { es: "Por horas", en: "By hours" } },
      { value: "bloques", label: { es: "Por bloques", en: "By blocks" } },
      { value: "areas", label: { es: "Por areas", en: "By areas" } },
      { value: "libre", label: { es: "Libre", en: "Free-form" } },
      { value: "revision-nocturna", label: { es: "Revision nocturna", en: "Nightly review" } },
    ],
  },
  {
    field: "visualStyle",
    titleKey: "quiz.visual",
    options: [
      { value: "floral", label: { es: "Floral", en: "Floral" } },
      { value: "abstracto", label: { es: "Abstracto", en: "Abstract" } },
      { value: "elegante", label: { es: "Elegante", en: "Elegant" } },
      { value: "cuero", label: { es: "Cuero", en: "Leather" } },
      { value: "minimal", label: { es: "Minimal", en: "Minimal" } },
      { value: "artistico", label: { es: "Artistico", en: "Artistic" } },
      { value: "neutro", label: { es: "Neutro", en: "Neutral" } },
    ],
  },
  {
    field: "structureLevel",
    titleKey: "quiz.structure",
    options: [
      { value: "muy-guiado", label: { es: "Muy guiado", en: "Highly guided" } },
      { value: "equilibrado", label: { es: "Equilibrado", en: "Balanced" } },
      { value: "libre", label: { es: "Libre", en: "Free" } },
    ],
  },
];

export type QuizAnswers = Record<QuestionDef["field"], string>;

export const DEFAULT_ANSWERS: QuizAnswers = {
  personality: "ejecutiva",
  mainGoal: "finanzas",
  rhythm: "revision-nocturna",
  visualStyle: "elegante",
  structureLevel: "equilibrado",
};
