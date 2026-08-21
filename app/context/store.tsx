"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Locale } from "../lib/i18n";
import { translate } from "../lib/i18n";
import type { Currency } from "../lib/currency";
import { formatPrice } from "../lib/currency";
import type { CoverFit, LayoutMode, Tone } from "../lib/types";
import {
  BINDINGS,
  COVER_SYSTEMS,
  COVER_TYPES,
  ELASTIC_COLORS,
  PACKS,
  RING_COLORS,
  SEPARATORS,
  SIZES,
  STICKERS,
  TEMPLATES,
} from "../lib/config-data";
import { DEFAULT_ANSWERS, type QuestionDef, type QuizAnswers } from "../lib/questions";

export interface ConfiguratorState {
  locale: Locale;
  currency: Currency;
  templateId: string | null;
  sizeId: string;
  coverTypeId: string;
  coverFit: CoverFit;
  bindingId: string;
  separatorId: string;
  ringColorId: string;
  elasticColorId: string;
  coverSystemId: string;
  accent: string;
  coverTitle: string;
  initials: string;
  coverPhrase: string;
  goldFoil: boolean;
  silverFoil: boolean;
  pageSeal: boolean;
  layoutMode: LayoutMode;
  tone: Tone;
  stickerIds: string[];
  showCycleSticker: boolean;
  visionStyleId: string;
  calendarStyleId: string;
  packId: string;
  answers: QuizAnswers;
  freeformPrompt: string;
  customerName: string;
  customerEmail: string;
  paid: boolean;
}

const DEFAULT_STATE: ConfiguratorState = {
  locale: "es",
  currency: "USD",
  templateId: "premium-rose-gold",
  sizeId: "a5",
  coverTypeId: "cuero-vegano",
  coverFit: "full",
  bindingId: "cuero-flexible",
  separatorId: "cartulina",
  ringColorId: "rose-gold",
  elasticColorId: "elastico-rosa",
  coverSystemId: "editorial",
  accent: "#c98f80",
  coverTitle: "Victosofia LA",
  initials: "VS",
  coverPhrase: "Este es el comienzo de todo lo que quieras",
  goldFoil: true,
  silverFoil: false,
  pageSeal: false,
  layoutMode: "horaria",
  tone: "poetica",
  stickerIds: ["dia-excelente", "descanso", "recordatorio", "salud"],
  showCycleSticker: false,
  visionStyleId: "moodboard",
  calendarStyleId: "ilustrado",
  packId: "agenda-calendario-vision",
  answers: DEFAULT_ANSWERS,
  freeformPrompt: "",
  customerName: "",
  customerEmail: "",
  paid: false,
};

interface StoreContextValue {
  state: ConfiguratorState;
  update: (patch: Partial<ConfiguratorState>) => void;
  applyTemplate: (templateId: string) => void;
  toggleSticker: (id: string) => void;
  setAnswer: (field: QuestionDef["field"], value: string) => void;
  t: (key: string) => string;
  price: (amountUsd: number) => string;
  totalUsd: number;
  selected: {
    size: (typeof SIZES)[number];
    coverType: (typeof COVER_TYPES)[number];
    binding: (typeof BINDINGS)[number];
    separator: (typeof SEPARATORS)[number];
    ringColor: (typeof RING_COLORS)[number];
    elasticColor: (typeof ELASTIC_COLORS)[number];
    coverSystem: (typeof COVER_SYSTEMS)[number];
    pack: (typeof PACKS)[number];
  };
}

const StoreContext = createContext<StoreContextValue | null>(null);

function findOr<T extends { id: string }>(list: T[], id: string): T {
  return list.find((item) => item.id === id) ?? list[0];
}

export function ConfiguratorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ConfiguratorState>(DEFAULT_STATE);

  const update = useCallback((patch: Partial<ConfiguratorState>) => {
    setState((current) => ({ ...current, ...patch }));
  }, []);

  const applyTemplate = useCallback((templateId: string) => {
    const template = TEMPLATES.find((item) => item.id === templateId);
    if (!template) return;
    setState((current) => ({
      ...current,
      templateId,
      accent: template.accent,
      coverTypeId: template.coverTypeId,
      bindingId: template.bindingId,
      coverSystemId: template.coverSystemId,
      ringColorId: template.ringColorId,
      elasticColorId: template.elasticColorId,
      layoutMode: template.layoutMode,
      tone: template.tone,
      visionStyleId: template.visionStyleId,
      calendarStyleId: template.calendarStyleId,
      stickerIds: template.stickerIds,
    }));
  }, []);

  const toggleSticker = useCallback((id: string) => {
    setState((current) => ({
      ...current,
      stickerIds: current.stickerIds.includes(id)
        ? current.stickerIds.filter((item) => item !== id)
        : [...current.stickerIds, id],
    }));
  }, []);

  const setAnswer = useCallback((field: QuestionDef["field"], value: string) => {
    setState((current) => ({ ...current, answers: { ...current.answers, [field]: value } }));
  }, []);

  const t = useCallback((key: string) => translate(state.locale, key), [state.locale]);
  const price = useCallback((amountUsd: number) => formatPrice(amountUsd, state.currency, state.locale), [
    state.currency,
    state.locale,
  ]);

  const selected = useMemo(
    () => ({
      size: findOr(SIZES, state.sizeId),
      coverType: findOr(COVER_TYPES, state.coverTypeId),
      binding: findOr(BINDINGS, state.bindingId),
      separator: findOr(SEPARATORS, state.separatorId),
      ringColor: findOr(RING_COLORS, state.ringColorId),
      elasticColor: findOr(ELASTIC_COLORS, state.elasticColorId),
      coverSystem: findOr(COVER_SYSTEMS, state.coverSystemId),
      pack: findOr(PACKS, state.packId),
    }),
    [
      state.sizeId,
      state.coverTypeId,
      state.bindingId,
      state.separatorId,
      state.ringColorId,
      state.elasticColorId,
      state.coverSystemId,
      state.packId,
    ]
  );

  const totalUsd = useMemo(() => {
    return (
      selected.pack.priceUsd +
      selected.size.priceUsd +
      selected.coverType.priceUsd +
      selected.binding.priceUsd +
      (state.goldFoil ? 18 : 0) +
      (state.silverFoil ? 14 : 0) +
      (state.pageSeal ? 10 : 0)
    );
  }, [selected, state.goldFoil, state.silverFoil, state.pageSeal]);

  const value: StoreContextValue = {
    state,
    update,
    applyTemplate,
    toggleSticker,
    setAnswer,
    t,
    price,
    totalUsd,
    selected,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside ConfiguratorProvider");
  return ctx;
}

export { STICKERS };
