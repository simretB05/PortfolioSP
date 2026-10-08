<template>
  <form class="form" novalidate @submit.prevent="submit">
    <div v-if="status === 'sent'" class="form__done" role="status">
      <i class="mdi mdi-check-circle-outline"></i>
      <h3>Thank you!</h3>
      <p>Your message is on its way. I'll get back to you soon.</p>
      <button type="button" class="form__link" @click="reset">Send another message</button>
    </div>

    <template v-else>
      <div class="form__row">
        <label class="field">
          <span>Name</span>
          <input v-model.trim="fields.name" name="name" autocomplete="name" maxlength="100" required :aria-invalid="!!errors.name" />
          <small v-if="errors.name">{{ errors.name }}</small>
        </label>
        <label class="field">
          <span>Phone</span>
          <input
            v-model.trim="fields.phone"
            name="phone"
            type="tel"
            autocomplete="tel"
            maxlength="30"
            required
            :aria-invalid="!!errors.phone"
          />
          <small v-if="errors.phone">{{ errors.phone }}</small>
        </label>
      </div>

      <label class="field">
        <span>Email</span>
        <input
          v-model.trim="fields.email"
          name="email"
          type="email"
          autocomplete="email"
          maxlength="254"
          required
          :aria-invalid="!!errors.email"
        />
        <small v-if="errors.email">{{ errors.email }}</small>
      </label>

      <label class="field">
        <span>Message</span>
        <textarea v-model.trim="fields.message" name="message" rows="4" maxlength="2000" required :aria-invalid="!!errors.message"></textarea>
        <small v-if="errors.message">{{ errors.message }}</small>
      </label>

      <!-- Spam trap: hidden from people, bots tend to fill it in -->
      <div class="form__trap" aria-hidden="true">
        <label>Website <input v-model="website" name="website" tabindex="-1" autocomplete="off" /></label>
      </div>

      <div ref="turnstile" class="form__turnstile"></div>

      <p v-if="status === 'error'" class="form__error" role="alert">{{ errorMessage }}</p>

      <button type="submit" class="form__submit" :disabled="status === 'sending'">
        {{ status === "sending" ? "Sending…" : "Send message" }}
        <i class="mdi mdi-arrow-right"></i>
      </button>
    </template>
  </form>
</template>

<script>
const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;
const PHONE_RE = /^[+()\-.\s\d]{7,30}$/;

let turnstileLoading = null;
function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!turnstileLoading) {
    turnstileLoading = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = TURNSTILE_SRC;
      script.async = true;
      script.onload = () => resolve(window.turnstile);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  return turnstileLoading;
}

const emptyFields = () => ({ name: "", email: "", phone: "", message: "" });

export default {
  data() {
    return {
      fields: emptyFields(),
      website: "",
      errors: {},
      status: "idle", // idle | sending | sent | error
      errorMessage: "",
      token: "",
    };
  },
  methods: {
    validate() {
      const { name, email, phone, message } = this.fields;
      const errors = {};
      if (name.length < 2) errors.name = "Please enter your name.";
      if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
      if (!PHONE_RE.test(phone) || phone.replace(/\D/g, "").length < 7) errors.phone = "Please enter a valid phone number.";
      if (message.length < 10) errors.message = "Please write a short message (10+ characters).";
      this.errors = errors;
      return Object.keys(errors).length === 0;
    },
    async renderTurnstile() {
      const siteKey = process.env.VUE_APP_TURNSTILE_SITE_KEY;
      if (!siteKey || !this.$refs.turnstile) return;
      try {
        const turnstile = await loadTurnstile();
        this.widgetId = turnstile.render(this.$refs.turnstile, {
          sitekey: siteKey,
          theme: document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark",
          appearance: "interaction-only",
          callback: (token) => (this.token = token),
          "expired-callback": () => (this.token = ""),
          "error-callback": () => (this.token = ""),
        });
      } catch (e) {
        this.status = "error";
        this.errorMessage = "The security check couldn't load. Please disable any blockers and refresh.";
      }
    },
    async submit() {
      if (this.status === "sending" || !this.validate()) return;
      if (!this.token) {
        this.status = "error";
        this.errorMessage = "Please wait a moment for the security check to finish, then try again.";
        return;
      }

      this.status = "sending";
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...this.fields, website: this.website, turnstileToken: this.token }),
        });
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
          if (body.errors) this.errors = body.errors;
          throw new Error(body.error || "Something went wrong. Please try again.");
        }
        this.status = "sent";
      } catch (e) {
        this.status = "error";
        this.errorMessage = e.message;
        // Tokens are single-use: get a fresh one for the next attempt.
        if (window.turnstile && this.widgetId !== undefined) window.turnstile.reset(this.widgetId);
        this.token = "";
      }
    },
    async reset() {
      this.fields = emptyFields();
      this.errors = {};
      this.token = "";
      this.status = "idle";
      await this.$nextTick();
      this.renderTurnstile();
    },
  },
  mounted() {
    this.renderTurnstile();
  },
  beforeDestroy() {
    if (window.turnstile && this.widgetId !== undefined) window.turnstile.remove(this.widgetId);
  },
};
</script>

<style scoped>
.form {
  display: grid;
  gap: 16px;
  padding: clamp(22px, 3vw, 32px);
  border: 1px solid var(--line-strong);
  border-radius: 8px;
  background: var(--bg-alt);
}

.form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.field {
  display: grid;
  gap: 6px;
}

.field span {
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}

.field input,
.field textarea {
  width: 100%;
  padding: 11px 13px;
  border: 1px solid var(--line-strong);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text);
  font: inherit;
  font-size: 0.95rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.field textarea {
  resize: vertical;
  min-height: 110px;
}

.field input:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 25%, transparent);
}

.field [aria-invalid="true"] {
  border-color: #d98273;
}

.field small,
.form__error {
  margin: 0;
  font-size: 0.82rem;
  color: #e09a8c;
}

:root[data-theme="light"] .field small,
:root[data-theme="light"] .form__error {
  color: #a8412f;
}

.form__trap {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.form__turnstile:empty {
  display: none;
}

.form__submit {
  justify-self: start;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 26px;
  border: none;
  border-radius: 999px;
  background: var(--text);
  color: var(--bg);
  font: inherit;
  font-size: 0.85rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.form__submit:hover:not(:disabled) {
  transform: translateY(-2px);
}

.form__submit:disabled {
  opacity: 0.6;
  cursor: wait;
}

.form__done {
  display: grid;
  justify-items: start;
  gap: 8px;
  padding: 12px 0;
}

.form__done i {
  font-size: 2rem;
  color: var(--accent);
}

.form__done h3 {
  margin: 0;
  font-family: var(--serif);
  font-size: 1.8rem;
  font-weight: 400;
}

.form__done p {
  margin: 0;
  color: var(--muted);
}

.form__link {
  margin-top: 8px;
  padding: 0;
  border: none;
  background: none;
  color: var(--text);
  font: inherit;
  text-decoration: underline;
  cursor: pointer;
}

@media (max-width: 560px) {
  .form__row {
    grid-template-columns: 1fr;
  }
}
</style>
