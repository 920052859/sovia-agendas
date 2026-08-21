import { NextResponse } from "next/server";
import { convert, type Currency } from "@/lib/currency";

export const runtime = "nodejs";

interface CheckoutBody {
  currency: Currency;
  amountUsd: number;
  description: string;
  customerEmail?: string;
  customerName?: string;
}

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

async function createStripeSession(body: CheckoutBody) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return { configured: false as const };

  const unitAmountCents = Math.round(convert(body.amountUsd, "USD") * 100);
  const params = new URLSearchParams();
  params.set("mode", "payment");
  params.set("success_url", `${siteUrl()}/?paid=1&provider=stripe`);
  params.set("cancel_url", `${siteUrl()}/?canceled=1`);
  params.set("line_items[0][quantity]", "1");
  params.set("line_items[0][price_data][currency]", "usd");
  params.set("line_items[0][price_data][unit_amount]", String(unitAmountCents));
  params.set("line_items[0][price_data][product_data][name]", body.description.slice(0, 500));
  if (body.customerEmail) params.set("customer_email", body.customerEmail);

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    return { configured: true as const, ok: false as const, error: errorBody };
  }

  const data = (await response.json()) as { url?: string };
  return { configured: true as const, ok: true as const, url: data.url ?? null };
}

async function createMercadoPagoPreference(body: CheckoutBody) {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) return { configured: false as const };

  const unitPrice = Math.round(convert(body.amountUsd, "PEN"));
  const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          title: body.description.slice(0, 250),
          quantity: 1,
          currency_id: "PEN",
          unit_price: unitPrice,
        },
      ],
      payer: body.customerEmail ? { email: body.customerEmail, name: body.customerName } : undefined,
      back_urls: {
        success: `${siteUrl()}/?paid=1&provider=mercadopago`,
        failure: `${siteUrl()}/?canceled=1`,
        pending: `${siteUrl()}/?pending=1`,
      },
      auto_return: "approved",
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    return { configured: true as const, ok: false as const, error: errorBody };
  }

  const data = (await response.json()) as { init_point?: string };
  return { configured: true as const, ok: true as const, url: data.init_point ?? null };
}

export async function POST(request: Request) {
  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!body.description || typeof body.amountUsd !== "number") {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const result =
    body.currency === "PEN" ? await createMercadoPagoPreference(body) : await createStripeSession(body);

  if (!result.configured) {
    return NextResponse.json({
      url: null,
      configured: false,
      message:
        body.currency === "PEN"
          ? "MERCADOPAGO_ACCESS_TOKEN no esta configurado todavia."
          : "STRIPE_SECRET_KEY no esta configurado todavia.",
    });
  }

  if (!result.ok) {
    return NextResponse.json({ url: null, configured: true, error: result.error }, { status: 502 });
  }

  return NextResponse.json({ url: result.url, configured: true });
}
