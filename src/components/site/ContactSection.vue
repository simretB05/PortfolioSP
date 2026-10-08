<template>
  <section id="contact" class="contact">
    <div class="contact__grid">
      <div class="contact__pitch" v-scrollanimation="'reveal'">
        <p class="eyebrow">{{ contact.eyebrow }}</p>
        <h2 class="serif-heading">{{ contact.heading[0] }}<br />{{ contact.heading[1] }}</h2>
        <p class="body-text contact__text">{{ contact.text }}</p>

        <ul class="contact__details">
          <li v-if="profile.email">
            <i class="mdi mdi-email-outline"></i>
            <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
          </li>
          <li>
            <i class="mdi mdi-linkedin"></i>
            <a :href="profile.linkedin" target="_blank" rel="noopener">linkedin.com/in/simret-webdev</a>
          </li>
          <li>
            <i class="mdi mdi-github"></i>
            <a :href="profile.github" target="_blank" rel="noopener">github.com/simretB05</a>
          </li>
          <li>
            <i class="mdi mdi-map-marker-outline"></i>
            <span>{{ profile.location }}</span>
          </li>
        </ul>
      </div>

      <div class="contact__form" v-scrollanimation="'reveal'">
        <contact-form />
      </div>

      <div class="contact__image" aria-hidden="true">
        <img src="/images/contact-portrait.webp" alt="" loading="lazy" />
      </div>
    </div>

    <footer class="footer">
      <p>© {{ year }} {{ profile.name }} &nbsp;|&nbsp; Web Developer &nbsp;|&nbsp; {{ profile.location }}</p>
      <div class="footer__social">
        <a :href="profile.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="mdi mdi-linkedin"></i></a>
        <a :href="profile.github" target="_blank" rel="noopener" aria-label="GitHub"><i class="mdi mdi-github"></i></a>
      </div>
    </footer>
  </section>
</template>

<script>
import ContactForm from "@/components/site/ContactForm.vue";
import { contact, profile } from "@/data/content";

export default {
  components: { ContactForm },
  data() {
    return { contact, profile, year: new Date().getFullYear() };
  },
};
</script>

<style scoped>
.contact {
  background: var(--bg);
}

.contact__grid {
  display: grid;
  /* Equal side columns keep the form column in the exact middle of the page */
  grid-template-columns: 1fr minmax(360px, 520px) 1fr;
  gap: 48px;
  align-items: center;
}

.contact__image {
  position: relative;
  align-self: stretch;
  min-height: 420px;
  /* Reach back into the column gap so the fade has room to blend */
  margin-left: -48px;
  overflow: hidden;
}

/*
 * The photo itself fades out (a mask, not a colored overlay), so it melts into
 * whatever background is behind it in either theme. Many easing stops avoid a
 * visible edge; the top and bottom fade softly too.
 */
.contact__image img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 20%;
  filter: saturate(0.85);
  -webkit-mask-image: linear-gradient(
      90deg,
      transparent 0%,
      rgba(0, 0, 0, 0.04) 8%,
      rgba(0, 0, 0, 0.15) 16%,
      rgba(0, 0, 0, 0.32) 24%,
      rgba(0, 0, 0, 0.52) 32%,
      rgba(0, 0, 0, 0.72) 40%,
      rgba(0, 0, 0, 0.88) 48%,
      rgba(0, 0, 0, 0.97) 56%,
      #000 64%
    ),
    linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%);
  -webkit-mask-composite: source-in;
  mask-image: linear-gradient(
      90deg,
      transparent 0%,
      rgba(0, 0, 0, 0.04) 8%,
      rgba(0, 0, 0, 0.15) 16%,
      rgba(0, 0, 0, 0.32) 24%,
      rgba(0, 0, 0, 0.52) 32%,
      rgba(0, 0, 0, 0.72) 40%,
      rgba(0, 0, 0, 0.88) 48%,
      rgba(0, 0, 0, 0.97) 56%,
      #000 64%
    ),
    linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%);
  mask-composite: intersect;
}

.contact__pitch {
  padding: 72px 0 72px var(--gutter);
}

.contact__text {
  max-width: 420px;
  margin-top: 18px;
}

.contact__form {
  width: 100%;
  max-width: 520px;
  justify-self: center;
  padding: 56px 0;
}

.contact__details {
  margin: 32px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 18px;
}

.contact__details li {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 0.95rem;
  color: var(--muted);
}

.contact__details i {
  font-size: 1.2rem;
  color: var(--text);
}

.contact__details a {
  text-decoration: none;
  transition: color 0.2s ease;
}

.contact__details a:hover {
  color: var(--text);
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 22px var(--gutter);
  border-top: 1px solid var(--line);
  font-size: 0.8rem;
  color: var(--muted);
}

.footer p {
  margin: 0;
}

.footer__social {
  display: flex;
  gap: 16px;
  font-size: 1.15rem;
}

.footer__social a {
  color: var(--muted);
  transition: color 0.2s ease;
}

.footer__social a:hover {
  color: var(--text);
}

@media (max-width: 1000px) {
  .contact__grid {
    grid-template-columns: 1fr;
    gap: 0;
    padding: 0 var(--gutter) 56px;
  }
  .contact__pitch {
    padding-left: 0;
    padding-bottom: 8px;
  }
  .contact__form {
    padding-top: 24px;
  }
  .contact__image {
    display: none;
  }
}

@media (max-width: 680px) {
  .footer {
    flex-direction: column;
    text-align: center;
  }
}
</style>
