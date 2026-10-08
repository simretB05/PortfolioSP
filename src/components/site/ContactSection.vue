<template>
  <section id="contact" class="contact">
    <div class="contact__grid">
      <div class="contact__image" aria-hidden="true">
        <img src="/images/contact-portrait.webp" alt="" loading="lazy" />
      </div>

      <div class="contact__pitch" v-scrollanimation="'reveal'">
        <p class="eyebrow">{{ contact.eyebrow }}</p>
        <h2 class="serif-heading">{{ contact.heading[0] }}<br />{{ contact.heading[1] }}</h2>
        <p class="body-text contact__text">{{ contact.text }}</p>
        <a :href="primaryLink" :target="profile.email ? null : '_blank'" rel="noopener" class="contact__btn">
          Get in touch <i class="mdi mdi-arrow-right"></i>
        </a>
      </div>

      <ul class="contact__details" v-scrollanimation="'reveal'">
        <li v-if="profile.email">
          <i class="mdi mdi-email-outline"></i>
          <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
        </li>
        <li>
          <i class="mdi mdi-linkedin"></i>
          <a :href="profile.linkedin" target="_blank" rel="noopener">linkedin.com/in/simret-paulos</a>
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
import { contact, profile } from "@/data/content";

export default {
  data() {
    return { contact, profile, year: new Date().getFullYear() };
  },
  computed: {
    primaryLink() {
      return profile.email ? `mailto:${profile.email}` : profile.linkedin;
    },
  },
};
</script>

<style scoped>
.contact {
  background: var(--bg);
}

.contact__grid {
  display: grid;
  grid-template-columns: minmax(180px, 0.7fr) 1.3fr 1fr;
  gap: 48px;
  align-items: center;
  padding-right: var(--gutter);
}

.contact__image {
  position: relative;
  align-self: stretch;
  min-height: 420px;
  overflow: hidden;
}

.contact__image img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 20%;
  filter: saturate(0.85);
}

/* Fade the photo into the page background on the right */
.contact__image::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 70%, var(--bg) 100%);
}

.contact__pitch {
  padding: 72px 0;
}

.contact__text {
  max-width: 420px;
  margin-top: 18px;
}

.contact__btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 28px;
  padding: 12px 26px;
  border-radius: 999px;
  background: var(--text);
  color: var(--bg);
  font-size: 0.85rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.contact__btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
}

.contact__btn i {
  transition: transform 0.25s ease;
}

.contact__btn:hover i {
  transform: translateX(4px);
}

.contact__details {
  margin: 0;
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
    grid-template-columns: 1fr 1fr;
    padding: 0 var(--gutter) 56px;
  }
  .contact__image {
    display: none;
  }
}

@media (max-width: 680px) {
  .contact__grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  .footer {
    flex-direction: column;
    text-align: center;
  }
}
</style>
