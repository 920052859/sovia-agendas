import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface OrderRow {
  label: string;
  value: string;
}

interface SendOrderBody {
  subject: string;
  customerName: string;
  customerEmail: string;
  totalLabel: string;
  rows: OrderRow[];
}

function renderHtml(body: SendOrderBody): string {
  const rows = body.rows
    .map(
      (row) =>
        `<tr><td style="padding:8px 12px;color:#766d63;font-size:12px;text-transform:uppercase;font-weight:700;border-bottom:1px solid #eee;">${row.label}</td><td style="padding:8px 12px;color:#24211d;font-size:14px;border-bottom:1px solid #eee;">${row.value}</td></tr>`
    )
    .join("");

  return `<!doctype html>
<html>
  <body style="margin:0;background:#f7f2ea;font-family:Arial,Helvetica,sans-serif;padding:24px;">
    <table style="max-width:640px;margin:0 auto;background:#fffdf8;border-radius:10px;overflow:hidden;border:1px solid #e6ded0;">
      <tr><td style="background:#2d2924;color:#fffaf3;padding:20px 24px;">
        <h1 style="margin:0;font-size:20px;">Nuevo pedido - SoVia</h1>
        <p style="margin:6px 0 0;opacity:0.8;font-size:13px;">${body.customerName} · ${body.customerEmail}</p>
      </td></tr>
      <tr><td style="padding:0 0 12px;">
        <table style="width:100%;border-collapse:collapse;">${rows}</table>
      </td></tr>
      <tr><td style="padding:16px 24px;background:#f7f2ea;">
        <strong style="font-size:18px;">Total: ${body.totalLabel}</strong>
      </td></tr>
    </table>
  </body>
</html>`;
}

export async function POST(request: Request) {
  let body: SendOrderBody;
  try {
    body = (await request.json()) as SendOrderBody;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!body.rows || !Array.isArray(body.rows)) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_EMAIL_FROM;
  const to = process.env.ORDER_EMAIL_TO;

  if (!apiKey || !from || !to) {
    return NextResponse.json({
      sent: false,
      configured: false,
      message: "RESEND_API_KEY, ORDER_EMAIL_FROM u ORDER_EMAIL_TO no estan configurados todavia.",
    });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: body.customerEmail || undefined,
        subject: body.subject,
        html: renderHtml(body),
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return NextResponse.json({ sent: false, configured: true, error: errorBody }, { status: 502 });
    }

    return NextResponse.json({ sent: true, configured: true });
  } catch (error) {
    return NextResponse.json(
      { sent: false, configured: true, error: error instanceof Error ? error.message : "unknown_error" },
      { status: 502 }
    );
  }
}
