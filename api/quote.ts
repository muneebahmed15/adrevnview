import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Receives the order form from the website and emails it to the shop.
 *
 * Settings (add these in Vercel, never in the code):
 *   RESEND_API_KEY  the key from resend.com that lets this function send email
 *   QUOTE_TO        the inbox that should receive quote requests
 *   QUOTE_FROM      the "from" line, e.g. "Adrevnview Website <quotes@adrevnview.com>"
 *
 * Until RESEND_API_KEY is set, this answers "not set up" and the website
 * falls back to opening the visitor's email app.
 */

const DEFAULT_TO = "hello@adrevnview.com";
const DEFAULT_FROM = "Adrevnview Website <onboarding@resend.dev>";
const MAX_FIELD = 2000;

type Clean = Record<"ticket" | "businessType" | "needs" | "place" | "when" | "pack" | "name" | "business" | "phone" | "email" | "note", string>;

function text(value: unknown): string {
  if (Array.isArray(value)) return value.map((v) => text(v)).filter(Boolean).join(", ");
  if (typeof value !== "string" && typeof value !== "number") return "";
  return String(value).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").trim().slice(0, MAX_FIELD);
}

/** One line only, so nothing a visitor types can add extra email headers. */
function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").slice(0, 200);
}

function isEmail(value: string): boolean {
  return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);
}

export function buildMessage(body: Record<string, unknown>): { ok: true; data: Clean; subject: string; lines: string } | { ok: false; error: string } {
  const data: Clean = {
    ticket: oneLine(text(body.ticket)),
    businessType: oneLine(text(body.businessType)),
    needs: oneLine(text(body.needs)),
    place: oneLine(text(body.place)),
    when: oneLine(text(body.when)),
    pack: oneLine(text(body.pack)),
    name: oneLine(text(body.name)),
    business: oneLine(text(body.business)),
    phone: oneLine(text(body.phone)),
    email: oneLine(text(body.email)),
    note: text(body.note),
  };

  if (!data.name || !data.business || !data.phone) {
    return { ok: false, error: "Please give your name, business name and phone number." };
  }
  if (data.phone.replace(/\D/g, "").length < 7) {
    return { ok: false, error: "That phone number looks too short." };
  }
  if (data.email && !isEmail(data.email)) {
    return { ok: false, error: "That email address does not look right." };
  }

  const subject = `Quote request ${data.ticket || ""}: ${data.businessType || "New business"} (${data.business})`.replace(/\s+/g, " ");
  const lines = [
    `Ticket: ${data.ticket || "none"}`,
    `Business type: ${data.businessType || "not given"}`,
    `Needs: ${data.needs || "not sure yet"}`,
    `Where: ${data.place || "not given"}`,
    `Start: ${data.when || "not given"}`,
    `Suggested package: ${data.pack || "none yet"}`,
    "",
    `Name: ${data.name}`,
    `Business: ${data.business}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email || "not given"}`,
    "",
    data.note || "(no note)",
  ].join("\n");

  return { ok: true, data, subject, lines };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Use POST." });
  }

  let body: Record<string, unknown>;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body ?? {});
  } catch {
    return res.status(400).json({ ok: false, error: "Could not read the form." });
  }

  // Hidden field real people never see. If it is filled, a robot sent this.
  if (text(body.website)) {
    return res.status(200).json({ ok: true });
  }

  const message = buildMessage(body);
  if (!message.ok) {
    return res.status(400).json({ ok: false, error: message.error });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return res.status(503).json({ ok: false, error: "Email sending is not set up yet." });
  }

  try {
    const sent = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.QUOTE_FROM || DEFAULT_FROM,
        to: [process.env.QUOTE_TO || DEFAULT_TO],
        subject: message.subject,
        text: message.lines,
        ...(message.data.email ? { reply_to: message.data.email } : {}),
      }),
    });

    if (!sent.ok) {
      console.error("[quote] email service refused:", sent.status, await sent.text());
      return res.status(502).json({ ok: false, error: "The email service did not accept the message." });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[quote] failed:", err);
    return res.status(502).json({ ok: false, error: "Could not reach the email service." });
  }
}
