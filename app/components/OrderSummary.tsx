"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "../context/store";
import { LAYOUTS, STICKERS } from "../lib/config-data";

export default function OrderSummary() {
  const { state, update, selected, price, totalUsd, t } = useStore();
  const [paying, setPaying] = useState(false);
  const [payMessage, setPayMessage] = useState<string | null>(null);
  const [emailMessage, setEmailMessage] = useState<string | null>(null);

  const layout = LAYOUTS.find((item) => item.key === state.layoutMode)!;
  const stickerLabels = state.stickerIds
    .map((id) => STICKERS.find((sticker) => sticker.id === id))
    .filter((sticker): sticker is (typeof STICKERS)[number] => Boolean(sticker))
    .map((sticker) => sticker.label[state.locale])
    .join(", ");

  const rows = useMemo(
    () => [
      { label: t("packs.selected"), value: selected.pack.name[state.locale] },
      { label: t("customizer.coverTitle"), value: state.coverTitle },
      { label: t("customizer.initials"), value: state.initials || "-" },
      { label: t("physical.size"), value: selected.size.label[state.locale] },
      { label: t("physical.cover"), value: selected.coverType.label[state.locale] },
      { label: t("physical.binding"), value: selected.binding.label[state.locale] },
      { label: t("physical.separators"), value: selected.separator.label[state.locale] },
      { label: t("physical.ringColor"), value: selected.ringColor.label[state.locale] },
      { label: t("physical.elasticColor"), value: selected.elasticColor.label[state.locale] },
      { label: t("customizer.system"), value: selected.coverSystem.label[state.locale] },
      { label: t("customizer.accent"), value: state.accent },
      { label: t("layout.kicker"), value: layout.label[state.locale] },
      { label: t("customizer.tone"), value: state.tone },
      { label: t("order.stickers"), value: stickerLabels || "-" },
      {
        label: t("physical.finishes"),
        value: [
          state.goldFoil ? t("physical.goldFoil") : null,
          state.silverFoil ? t("physical.silverFoil") : null,
          state.pageSeal ? t("physical.pageSeal") : null,
        ]
          .filter(Boolean)
          .join(" + ") || "-",
      },
    ],
    [layout, selected, state, stickerLabels, t]
  );

  async function sendOrderEmail() {
    try {
      const emailResponse = await fetch("/api/send-order", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          subject: `Pedido SoVia - ${state.customerName || "cliente"}`,
          customerName: state.customerName || "-",
          customerEmail: state.customerEmail || "-",
          totalLabel: price(totalUsd),
          rows,
        }),
      });
      const emailData = (await emailResponse.json()) as { sent: boolean; configured: boolean; message?: string };
      setEmailMessage(emailData.sent ? t("order.emailSent") : emailData.message ?? t("order.emailOffline"));
    } catch {
      setEmailMessage(t("order.emailOffline"));
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("paid") === "1" && !state.paid) {
      update({ paid: true });
      void sendOrderEmail();
      window.history.replaceState({}, "", window.location.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handlePay() {
    setPaying(true);
    setPayMessage(null);
    setEmailMessage(null);

    try {
      const checkoutResponse = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          currency: state.currency,
          amountUsd: totalUsd,
          description: `SoVia - ${selected.pack.name[state.locale]}`,
          customerEmail: state.customerEmail,
          customerName: state.customerName,
        }),
      });
      const checkoutData = (await checkoutResponse.json()) as {
        url: string | null;
        configured: boolean;
        message?: string;
      };

      if (checkoutData.url) {
        window.location.href = checkoutData.url;
        return;
      }

      if (!checkoutData.configured) {
        setPayMessage(checkoutData.message ?? null);
      }

      update({ paid: true });
      await sendOrderEmail();
    } catch {
      update({ paid: true });
      setEmailMessage(t("order.emailOffline"));
    } finally {
      setPaying(false);
    }
  }

  return (
    <section id="pedido" className="order-section">
      <div className="order-shell">
        <div className="order-copy">
          <p className="section-kicker">{t("order.kicker")}</p>
          <h2>{t("order.title")}</h2>
          <p>{t("order.lead")}</p>
        </div>
        <motion.div className="order-card" layout>
          <div className="receipt-head">
            <div>
              <span>{t("order.total")}</span>
              <strong>{price(totalUsd)}</strong>
            </div>
            <button type="button" onClick={handlePay} disabled={paying}>
              {paying ? t("order.paying") : t("order.pay")}
            </button>
          </div>

          <div className="customer-fields">
            <label>
              {t("order.name")}
              <input value={state.customerName} onChange={(event) => update({ customerName: event.target.value })} />
            </label>
            <label>
              {t("order.email")}
              <input
                type="email"
                value={state.customerEmail}
                onChange={(event) => update({ customerEmail: event.target.value })}
              />
            </label>
          </div>

          <div className="receipt-grid">
            {rows.map((row) => (
              <p key={row.label}>
                <b>{row.label}</b>
                {row.value}
              </p>
            ))}
          </div>

          {payMessage && <p className="inline-note">{payMessage}</p>}

          <AnimatePresence>
            {state.paid && (
              <motion.div
                className="paid-state"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
              >
                <strong>{t("order.paid")}</strong>
                {emailMessage && <span>{emailMessage}</span>}
                <button type="button" onClick={() => window.print()}>
                  {t("order.download")}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
