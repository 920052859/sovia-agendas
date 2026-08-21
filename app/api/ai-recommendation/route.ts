import { NextResponse } from "next/server";
import {
  BINDINGS,
  CALENDAR_STYLES,
  COVER_SYSTEMS,
  COVER_TYPES,
  ELASTIC_COLORS,
  RING_COLORS,
  STICKERS,
  VISION_STYLES,
} from "@/lib/config-data";
import { localRecommendation, normalizeRecommendation, type AiRecommendation } from "@/lib/ai";
import type { QuizAnswers } from "@/lib/questions";

export const runtime = "nodejs";

interface RequestBody {
  answers: QuizAnswers;
  prompt: string;
  locale: "es" | "en";
}

function buildPrompt(body: RequestBody): string {
  const idsOf = (list: { id: string }[]) => list.map((item) => item.id).join(", ");

  return `Eres un asistente de una tienda premium de agendas fisicas personalizadas. Un cliente respondio un cuestionario y escribio un texto libre. Recomienda una configuracion coherente.

Respuestas del cuestionario (JSON): ${JSON.stringify(body.answers)}
Texto libre del cliente: "${body.prompt}"
Idioma de respuesta para el campo "message": ${body.locale === "en" ? "ingles" : "espanol"}

Responde EXCLUSIVAMENTE con un objeto JSON (sin texto adicional, sin markdown) con esta forma exacta:
{
  "accent": "#RRGGBB",
  "tone": "serena" | "intensa" | "poetica" | "filosofica",
  "layoutMode": "horaria" | "areas" | "libre" | "dual",
  "coverTypeId": uno de [${idsOf(COVER_TYPES)}],
  "bindingId": uno de [${idsOf(BINDINGS)}],
  "coverSystemId": uno de [${idsOf(COVER_SYSTEMS)}],
  "ringColorId": uno de [${idsOf(RING_COLORS)}],
  "elasticColorId": uno de [${idsOf(ELASTIC_COLORS)}],
  "visionStyleId": uno de [${idsOf(VISION_STYLES)}],
  "calendarStyleId": uno de [${idsOf(CALENDAR_STYLES)}],
  "stickerIds": arreglo de 3 a 5 valores de [${idsOf(STICKERS)}],
  "message": { "es": "1-2 frases explicando por que esta combinacion le queda bien", "en": "same in english" }
}`;
}

export async function POST(request: Request) {
  let body: RequestBody;
  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const fallback = localRecommendation(body.answers, body.prompt ?? "");
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ recommendation: fallback, source: "local" satisfies AiRecommendation["source"] });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 700,
        messages: [{ role: "user", content: buildPrompt(body) }],
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ recommendation: fallback, source: "local" });
    }

    const data = (await response.json()) as {
      content?: Array<{ type: string; text?: string }>;
    };
    const textBlock = data.content?.find((block) => block.type === "text")?.text ?? "";
    const jsonMatch = textBlock.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    const recommendation = normalizeRecommendation(parsed, fallback);

    return NextResponse.json({ recommendation, source: "ai" });
  } catch {
    return NextResponse.json({ recommendation: fallback, source: "local" });
  }
}
