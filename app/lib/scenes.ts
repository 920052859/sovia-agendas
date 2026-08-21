export type SceneKey =
  | "templates"
  | "quiz"
  | "materials"
  | "typography"
  | "interior"
  | "calendar"
  | "vision"
  | "summary";

export interface SceneTarget {
  rotateY: number;
  scale: number;
  y: number;
  contentMode: "cover" | "cover-material" | "cover-title" | "open-daily" | "open-calendar" | "open-vision";
  caption: { es: string; en: string };
}

export const SCENE_ORDER: SceneKey[] = [
  "templates",
  "quiz",
  "materials",
  "typography",
  "interior",
  "calendar",
  "vision",
  "summary",
];

export const SCENES: Record<SceneKey, SceneTarget> = {
  templates: {
    rotateY: -8,
    scale: 1,
    y: 0,
    contentMode: "cover",
    caption: { es: "Elige un diseño de partida", en: "Pick a starting design" },
  },
  quiz: {
    rotateY: 6,
    scale: 1,
    y: 0,
    contentMode: "cover",
    caption: { es: "Tu perfil da forma a la agenda", en: "Your profile shapes the planner" },
  },
  materials: {
    rotateY: -14,
    scale: 1.32,
    y: 6,
    contentMode: "cover-material",
    caption: { es: "Textura, tapa y acabados", en: "Texture, cover and finishes" },
  },
  typography: {
    rotateY: 10,
    scale: 1.22,
    y: -10,
    contentMode: "cover-title",
    caption: { es: "Tipografía y frase en portada", en: "Typography and cover phrase" },
  },
  interior: {
    rotateY: 0,
    scale: 1,
    y: 0,
    contentMode: "open-daily",
    caption: { es: "Distribución de tus días", en: "Your day, laid out" },
  },
  calendar: {
    rotateY: 0,
    scale: 1,
    y: 0,
    contentMode: "open-calendar",
    caption: { es: "Calendario con tus stickers", en: "Calendar with your stickers" },
  },
  vision: {
    rotateY: 0,
    scale: 1,
    y: 0,
    contentMode: "open-vision",
    caption: { es: "Tu vision board en vivo", en: "Your vision board, live" },
  },
  summary: {
    rotateY: -6,
    scale: 1,
    y: 0,
    contentMode: "cover",
    caption: { es: "Tu agenda, lista para producirse", en: "Your planner, ready to go" },
  },
};
