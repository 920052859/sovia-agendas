import { COVER_TYPES, BINDINGS, COVER_SYSTEMS, RING_COLORS, ELASTIC_COLORS, STICKERS, VISION_STYLES, CALENDAR_STYLES } from "./config-data";
import type { LayoutMode, Tone } from "./types";
import type { QuizAnswers } from "./questions";

export interface AiRecommendation {
  accent: string;
  tone: Tone;
  layoutMode: LayoutMode;
  coverTypeId: string;
  bindingId: string;
  coverSystemId: string;
  ringColorId: string;
  elasticColorId: string;
  visionStyleId: string;
  calendarStyleId: string;
  stickerIds: string[];
  message: { es: string; en: string };
  source: "ai" | "local";
}

const VALID_TONES: Tone[] = ["serena", "intensa", "poetica", "filosofica"];
const VALID_LAYOUTS: LayoutMode[] = ["horaria", "areas", "libre", "dual"];

function idIn<T extends { id: string }>(list: T[], id: unknown, fallback: string): string {
  return typeof id === "string" && list.some((item) => item.id === id) ? id : fallback;
}

export function localRecommendation(answers: QuizAnswers, prompt: string): AiRecommendation {
  const text = `${answers.personality} ${answers.mainGoal} ${answers.rhythm} ${answers.visualStyle} ${answers.structureLevel} ${prompt}`.toLowerCase();

  if (text.includes("finanza") || answers.personality === "ejecutiva") {
    return {
      accent: "#24211d",
      tone: "filosofica",
      layoutMode: "dual",
      coverTypeId: "cuero-premium",
      bindingId: "cosido",
      coverSystemId: "ejecutiva",
      ringColorId: "negro",
      elasticColorId: "elastico-negro",
      visionStyleId: "minimal-collage",
      calendarStyleId: "clasico",
      stickerIds: ["finanzas", "importante", "productivo"],
      message: {
        es: "Perfil estratega: separa accion diaria y cierre financiero con una tapa seria y estructura dual.",
        en: "Strategist profile: separate daily action from financial close with a serious cover and dual structure.",
      },
      source: "local",
    };
  }

  if (text.includes("aprendizaje") || text.includes("creativa") || answers.visualStyle === "abstracto") {
    return {
      accent: "#5f74c8",
      tone: "intensa",
      layoutMode: "areas",
      coverTypeId: "ilustrada-abstracta",
      bindingId: "discos",
      coverSystemId: "creativa",
      ringColorId: "plateado",
      elasticColorId: "elastico-negro",
      visionStyleId: "abstracto",
      calendarStyleId: "bloques",
      stickerIds: ["creativo", "aprendizaje", "mini-meta"],
      message: {
        es: "Perfil creador: areas claras y espacios de notas sostienen mejor tu avance.",
        en: "Creator profile: clear areas and note space support your progress best.",
      },
      source: "local",
    };
  }

  if (text.includes("habito") || text.includes("serena") || text.includes("salud")) {
    return {
      accent: "#db7b36",
      tone: "serena",
      layoutMode: "horaria",
      coverTypeId: "lino",
      bindingId: "anillado-dorado",
      coverSystemId: "editorial",
      ringColorId: "dorado",
      elasticColorId: "elastico-crema",
      visionStyleId: "floral",
      calendarStyleId: "ilustrado",
      stickerIds: ["descanso", "salud", "recordatorio"],
      message: {
        es: "Perfil ritual: una hoja diaria ordenada ayuda a repetir sin saturarte.",
        en: "Ritual profile: an ordered daily page helps you repeat without burning out.",
      },
      source: "local",
    };
  }

  if (text.includes("espiritual") || text.includes("poetica") || answers.personality === "espiritual") {
    return {
      accent: "#8b6f47",
      tone: "poetica",
      layoutMode: "libre",
      coverTypeId: "lino",
      bindingId: "cosido",
      coverSystemId: "romantica",
      ringColorId: "cobre",
      elasticColorId: "elastico-crema",
      visionStyleId: "floral",
      calendarStyleId: "minimal-numeros",
      stickerIds: ["descanso", "recordatorio", "salud"],
      message: {
        es: "Perfil reflexivo: paginas libres y frases profundas dejan espacio para pensar.",
        en: "Reflective profile: free pages and deep quotes leave room to think.",
      },
      source: "local",
    };
  }

  return {
    accent: "#c74b62",
    tone: "intensa",
    layoutMode: "libre",
    coverTypeId: "minimalista",
    bindingId: "anillado-negro",
    coverSystemId: "intensa",
    ringColorId: "negro",
    elasticColorId: "elastico-negro",
    visionStyleId: "minimal-collage",
    calendarStyleId: "minimal-numeros",
    stickerIds: ["productivo", "recordatorio", "mini-meta"],
    message: {
      es: "Perfil flexible: deja estructura ligera y espacio para ajustar cada dia.",
      en: "Flexible profile: keep light structure and room to adjust each day.",
    },
    source: "local",
  };
}

export function normalizeRecommendation(raw: unknown, fallback: AiRecommendation): AiRecommendation {
  if (!raw || typeof raw !== "object") return fallback;
  const value = raw as Record<string, unknown>;

  const accent =
    typeof value.accent === "string" && /^#[0-9a-fA-F]{6}$/.test(value.accent) ? value.accent : fallback.accent;
  const tone = VALID_TONES.includes(value.tone as Tone) ? (value.tone as Tone) : fallback.tone;
  const layoutMode = VALID_LAYOUTS.includes(value.layoutMode as LayoutMode)
    ? (value.layoutMode as LayoutMode)
    : fallback.layoutMode;

  const stickerIds = Array.isArray(value.stickerIds)
    ? (value.stickerIds as unknown[]).filter(
        (id): id is string => typeof id === "string" && STICKERS.some((sticker) => sticker.id === id)
      )
    : fallback.stickerIds;

  const messageEs = typeof (value.message as Record<string, unknown> | undefined)?.es === "string"
    ? (value.message as Record<string, string>).es
    : fallback.message.es;
  const messageEn = typeof (value.message as Record<string, unknown> | undefined)?.en === "string"
    ? (value.message as Record<string, string>).en
    : fallback.message.en;

  return {
    accent,
    tone,
    layoutMode,
    coverTypeId: idIn(COVER_TYPES, value.coverTypeId, fallback.coverTypeId),
    bindingId: idIn(BINDINGS, value.bindingId, fallback.bindingId),
    coverSystemId: idIn(COVER_SYSTEMS, value.coverSystemId, fallback.coverSystemId),
    ringColorId: idIn(RING_COLORS, value.ringColorId, fallback.ringColorId),
    elasticColorId: idIn(ELASTIC_COLORS, value.elasticColorId, fallback.elasticColorId),
    visionStyleId: idIn(VISION_STYLES, value.visionStyleId, fallback.visionStyleId),
    calendarStyleId: idIn(CALENDAR_STYLES, value.calendarStyleId, fallback.calendarStyleId),
    stickerIds: stickerIds.length > 0 ? stickerIds.slice(0, 5) : fallback.stickerIds,
    message: { es: messageEs, en: messageEn },
    source: "ai",
  };
}
