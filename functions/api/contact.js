// Cloudflare Pages Function: POST /api/contact
//
// Receives the contact form, checks it is a real person (Turnstile), stores the
// message in Cloudflare D1 and emails it through Resend.
//
// Bindings (wrangler.toml):
//   DB                     D1 database with the contact_messages table (migrations/)
// Secrets / variables (Cloudflare Pages → Settings → Variables and Secrets):
//   TURNSTILE_SECRET_KEY   required
//   RESEND_API_KEY         required
//   CONTACT_TO_EMAIL       required – inbox that receives messages
//   CONTACT_FROM_EMAIL     optional – defaults to contact@simretpaulos.com (must be a Resend-verified domain)
//   ALLOWED_ORIGINS        optional – extra comma-separated origins, e.g. http://localhost:8080 for local dev

const MAX_BODY_BYTES = 10 * 1024;
const LIMITS = { name: 100, email: 254, phone: 30, message: 2000 };
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;
const PHONE_RE = /^[+()\-.\s\d]{7,30}$/;

const SECURITY_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};

function json(status, body) {
  return new Response(JSON.stringify(body), { status, headers: SECURITY_HEADERS });
}

function isAllowedOrigin(request, env) {
  const origin = request.headers.get("Origin");
  if (!origin) return false;
  if (origin === new URL(request.url).origin) return true;
  const extra = (env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  return extra.includes(origin);
}

function clean(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validate(data) {
  const fields = {
    name: clean(data.name, LIMITS.name),
    email: clean(data.email, LIMITS.email).toLowerCase(),
    phone: clean(data.phone, LIMITS.phone),
    message: clean(data.message, LIMITS.message),
  };
  const errors = {};
  if (fields.name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(fields.email)) errors.email = "Please enter a valid email address.";
  if (!PHONE_RE.test(fields.phone) || fields.phone.replace(/\D/g, "").length < 7)
    errors.phone = "Please enter a valid phone number.";
  if (fields.message.length < 10) errors.message = "Please write a short message (10+ characters).";
  return { fields, errors };
}

async function verifyTurnstile(token, ip, secret) {
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
  });
  const outcome = await res.json();
  return outcome.success === true;
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

// Returns the new row id, or null if the database isn't available.
async function saveMessage(fields, ip, env) {
  if (!env.DB) return null;
  const result = await env.DB.prepare(
    "INSERT INTO contact_messages (name, email, phone, message, ip_address) VALUES (?, ?, ?, ?, ?)"
  )
    .bind(fields.name, fields.email, fields.phone, fields.message, ip || null)
    .run();
  return result.meta.last_row_id;
}

async function markEmailed(id, env) {
  await env.DB.prepare("UPDATE contact_messages SET emailed = 1 WHERE id = ?").bind(id).run();
}

async function sendEmail(fields, env) {
  const from = env.CONTACT_FROM_EMAIL || "Simret Paulos Portfolio <contact@simretpaulos.com>";
  const html = `
    <h2>New message from your portfolio</h2>
    <p><strong>Name:</strong> ${escapeHtml(fields.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(fields.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(fields.phone)}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(fields.message)}</p>`;
  const text = `Name: ${fields.name}\nEmail: ${fields.email}\nPhone: ${fields.phone}\n\n${fields.message}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [env.CONTACT_TO_EMAIL],
      reply_to: fields.email,
      subject: `New portfolio message from ${fields.name.replace(/[\r\n]/g, " ")}`,
      html,
      text,
    }),
  });
  if (!res.ok) console.error("Resend failed", res.status, await res.text());
  return res.ok;
}

export async function onRequestPost({ request, env }) {
  if (!isAllowedOrigin(request, env)) return json(403, { error: "Forbidden." });

  const length = Number(request.headers.get("Content-Length") || 0);
  if (length > MAX_BODY_BYTES) return json(413, { error: "Message is too long." });
  if (!(request.headers.get("Content-Type") || "").includes("application/json"))
    return json(415, { error: "Unsupported request." });

  let data;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return json(413, { error: "Message is too long." });
    data = JSON.parse(raw);
  } catch (e) {
    return json(400, { error: "Invalid request." });
  }

  // Honeypot: real visitors never see or fill this field. Pretend it worked.
  if (data.website) return json(200, { ok: true });

  const { fields, errors } = validate(data);
  if (Object.keys(errors).length) return json(422, { error: "Please check the highlighted fields.", errors });

  if (!env.TURNSTILE_SECRET_KEY || !env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL) {
    console.error("Contact form is missing TURNSTILE_SECRET_KEY, RESEND_API_KEY or CONTACT_TO_EMAIL");
    return json(500, { error: "The contact form isn't set up yet. Please email me directly." });
  }

  const ip = request.headers.get("CF-Connecting-IP");
  const human = await verifyTurnstile(clean(data.turnstileToken, 2048), ip, env.TURNSTILE_SECRET_KEY);
  if (!human) return json(400, { error: "Security check failed. Please refresh the page and try again." });

  // Save first so the message is never lost, even if the email fails.
  const id = await saveMessage(fields, ip, env).catch((e) => (console.error("D1 insert failed", e), null));
  const emailed = await sendEmail(fields, env).catch((e) => (console.error(e), false));
  if (emailed && id) await markEmailed(id, env).catch((e) => console.error(e));

  if (!id && !emailed) return json(502, { error: "Sorry, your message couldn't be sent. Please try again later." });
  return json(200, { ok: true });
}

export function onRequest() {
  return new Response(null, { status: 405, headers: { ...SECURITY_HEADERS, Allow: "POST" } });
}
