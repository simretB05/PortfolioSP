// Email templates for the contact form.
// Built with tables and inline styles so they render the same in Gmail, Outlook and Apple Mail.

const SITE_URL = "https://simretpaulos.com";

const BRAND = {
  dark: "#0b1716",
  accent: "#1aad9b",
  page: "#eef3f1",
  card: "#ffffff",
  text: "#1c2a28",
  muted: "#5d6f6b",
  line: "#dfe7e4",
  serif: "Georgia, 'Times New Roman', serif",
  sans: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

// Shown in the thank-you email so customers can browse while they wait.
const RECENT_WORK = [
  { name: "IOR Offroad", url: "https://ior.ca" },
  { name: "Edward's Factory Outlet", url: "https://edwardsfactory.ca" },
  { name: "SK Lighting Solutions", url: "https://sklightingsolutions.ca" },
  { name: "GP Storage Solutions", url: "https://gpstoragesolutions.ca" },
];

const LINKEDIN = "https://www.linkedin.com/in/simret-paulos-45b42b10b/";

export function escapeHtml(text) {
  return String(text).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
  );
}

// Only a short, letters-only first name goes into the customer email, so the form
// can't be used to send arbitrary text (links, ads) to someone else's inbox.
export function safeFirstName(fullName) {
  const first = String(fullName).trim().split(/\s+/)[0] || "";
  const cleaned = first.replace(/[^\p{L}'-]/gu, "").slice(0, 30);
  return cleaned.length >= 2 ? cleaned : "there";
}

function layout({ preheader, body }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>Simret Paulos</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.page};">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.page};">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${BRAND.card};border-radius:10px;overflow:hidden;">
      <tr><td style="background:${BRAND.dark};padding:36px 40px 30px;">
        <p style="margin:0;font-family:${BRAND.sans};font-size:22px;font-weight:300;letter-spacing:6px;color:#ffffff;">SIMRET PAULOS</p>
        <p style="margin:8px 0 0;font-family:${BRAND.sans};font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.accent};">Web Development &amp; AI &middot; Grande Prairie, AB</p>
      </td></tr>
      <tr><td style="height:4px;background:${BRAND.accent};font-size:0;line-height:0;">&nbsp;</td></tr>
      ${body}
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

export function thankYouEmail(fullName) {
  const name = safeFirstName(fullName);
  const work = RECENT_WORK.map(
    (p) =>
      `<tr><td style="padding:10px 0;border-bottom:1px solid ${BRAND.line};font-family:${BRAND.sans};font-size:15px;">
        <a href="${p.url}" style="color:${BRAND.text};text-decoration:none;">${escapeHtml(p.name)}</a>
        <span style="color:${BRAND.accent};">&nbsp;&rarr;</span>
      </td></tr>`
  ).join("");

  const body = `
      <tr><td style="padding:40px 40px 8px;">
        <h1 style="margin:0 0 20px;font-family:${BRAND.serif};font-size:30px;font-weight:normal;line-height:1.2;color:${BRAND.text};">Thank you for reaching out, ${escapeHtml(name)}.</h1>
        <p style="margin:0 0 16px;font-family:${BRAND.sans};font-size:16px;line-height:1.7;color:${BRAND.text};">I've received your message and I'm looking forward to learning more about your project. I read every message personally, and I'll get back to you within <strong>1&ndash;2 business days</strong>.</p>
        <p style="margin:0 0 28px;font-family:${BRAND.sans};font-size:16px;line-height:1.7;color:${BRAND.text};">In the meantime, here's some of my recent work with local businesses:</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${BRAND.line};">${work}</table>
      </td></tr>
      <tr><td style="padding:32px 40px 8px;">
        <a href="${SITE_URL}" style="display:inline-block;padding:13px 28px;border-radius:999px;background:${BRAND.dark};font-family:${BRAND.sans};font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#ffffff;text-decoration:none;">Visit my portfolio</a>
      </td></tr>
      <tr><td style="padding:32px 40px 40px;">
        <p style="margin:0;font-family:${BRAND.sans};font-size:16px;color:${BRAND.text};">Talk soon,</p>
        <p style="margin:6px 0 0;font-family:${BRAND.serif};font-size:26px;font-style:italic;color:${BRAND.text};">Simret Paulos</p>
        <p style="margin:4px 0 0;font-family:${BRAND.sans};font-size:13px;color:${BRAND.muted};">Web Developer &amp; AI Solutions &middot; Grande Prairie, AB</p>
      </td></tr>
      <tr><td style="padding:22px 40px;background:${BRAND.page};font-family:${BRAND.sans};font-size:12px;line-height:1.6;color:${BRAND.muted};">
        <a href="${SITE_URL}" style="color:${BRAND.muted};">simretpaulos.com</a> &nbsp;&middot;&nbsp; <a href="${LINKEDIN}" style="color:${BRAND.muted};">LinkedIn</a><br>
        You're receiving this because you sent a message through simretpaulos.com. Just reply to this email if you'd like to add anything.
      </td></tr>`;

  const text = `Hi ${name},

Thank you for reaching out! I've received your message and I'm looking forward to learning more about your project. I'll get back to you within 1-2 business days.

In the meantime, here's some of my recent work with local businesses:
${RECENT_WORK.map((p) => `- ${p.name}: ${p.url}`).join("\n")}

Talk soon,
Simret Paulos
Web Developer & AI Solutions · Grande Prairie, AB
${SITE_URL}`;

  return {
    subject: `Thanks for reaching out, ${name}!`,
    html: layout({ preheader: "I've received your message and will get back to you within 1-2 business days.", body }),
    text,
  };
}

export function notificationEmail(fields) {
  const row = (label, value) =>
    `<tr>
      <td style="padding:10px 0;width:90px;vertical-align:top;font-family:${BRAND.sans};font-size:12px;letter-spacing:1px;text-transform:uppercase;color:${BRAND.muted};">${label}</td>
      <td style="padding:10px 0;font-family:${BRAND.sans};font-size:15px;color:${BRAND.text};">${value}</td>
    </tr>`;
  const email = escapeHtml(fields.email);
  const phone = escapeHtml(fields.phone);
  const telHref = fields.phone.replace(/[^\d+]/g, "");
  const button = (href, label, primary) =>
    `<a href="${href}" style="display:inline-block;margin:0 8px 8px 0;padding:12px 24px;border-radius:999px;font-family:${BRAND.sans};font-size:13px;letter-spacing:1px;text-transform:uppercase;text-decoration:none;${
      primary ? `background:${BRAND.dark};color:#ffffff;` : `border:1px solid ${BRAND.dark};color:${BRAND.dark};`
    }">${label}</a>`;

  const body = `
      <tr><td style="padding:36px 40px 8px;">
        <p style="margin:0 0 6px;font-family:${BRAND.sans};font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.accent};">New message</p>
        <h1 style="margin:0 0 20px;font-family:${BRAND.serif};font-size:28px;font-weight:normal;color:${BRAND.text};">${escapeHtml(fields.name)} wants to get in touch</h1>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${BRAND.line};border-bottom:1px solid ${BRAND.line};">
          ${row("Name", escapeHtml(fields.name))}
          ${row("Email", `<a href="mailto:${email}" style="color:${BRAND.text};">${email}</a>`)}
          ${row("Phone", `<a href="tel:${telHref}" style="color:${BRAND.text};">${phone}</a>`)}
        </table>
      </td></tr>
      <tr><td style="padding:20px 40px 8px;">
        <div style="padding:20px 22px;border-left:3px solid ${BRAND.accent};background:${BRAND.page};font-family:${BRAND.sans};font-size:15px;line-height:1.7;color:${BRAND.text};white-space:pre-wrap;">${escapeHtml(fields.message)}</div>
      </td></tr>
      <tr><td style="padding:24px 40px 36px;">
        ${button(`mailto:${email}`, "Reply by email", true)}${button(`tel:${telHref}`, "Call", false)}
      </td></tr>`;

  return {
    subject: `New portfolio message from ${fields.name.replace(/[\r\n]/g, " ")}`,
    html: layout({ preheader: fields.message.slice(0, 120), body }),
    text: `Name: ${fields.name}\nEmail: ${fields.email}\nPhone: ${fields.phone}\n\n${fields.message}`,
  };
}
