export type LayoutMode = "horaria" | "areas" | "libre" | "dual";
export type Tone = "serena" | "intensa" | "poetica" | "filosofica";
export type CoverFit = "full" | "exact";

export interface LocalizedText {
  es: string;
  en: string;
}

export interface SizeOption {
  id: string;
  label: LocalizedText;
  dims: string;
  ratio: number;
  standard: boolean;
  priceUsd: number;
}

export interface CoverType {
  id: string;
  label: LocalizedText;
  swatch: string;
  illustrated: boolean;
  priceUsd: number;
}

export interface BindingOption {
  id: string;
  label: LocalizedText;
  priceUsd: number;
}

export interface SeparatorOption {
  id: string;
  label: LocalizedText;
}

export interface SwatchOption {
  id: string;
  label: LocalizedText;
  hex: string;
}

export type CoverAlign = "center" | "left";
export type CoverCase = "normal" | "upper";
export type CoverMotif = "line" | "flourish" | "tab" | "dot" | "frame";

export interface CoverSystem {
  id: string;
  label: LocalizedText;
  description: LocalizedText;
  titleFont: string;
  phraseFont: string;
  innerFont: string;
  align: CoverAlign;
  titleCase: CoverCase;
  weight: number;
  motif: CoverMotif;
}

export interface StickerOption {
  id: string;
  label: LocalizedText;
  color: string;
  icon: string;
  subtle?: boolean;
}

export interface TemplatePreset {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  accent: string;
  coverTypeId: string;
  bindingId: string;
  coverSystemId: string;
  ringColorId: string;
  elasticColorId: string;
  layoutMode: LayoutMode;
  tone: Tone;
  visionStyleId: string;
  calendarStyleId: string;
  stickerIds: string[];
}

export interface PackOption {
  id: string;
  name: LocalizedText;
  priceUsd: number;
  includes: {
    agenda: boolean;
    calendar: boolean;
    visionBoard: boolean;
    stickers: boolean;
    tools: boolean;
  };
  components: LocalizedText;
}

export interface VisionStyleOption {
  id: string;
  label: LocalizedText;
}

export interface CalendarStyleOption {
  id: string;
  label: LocalizedText;
}
