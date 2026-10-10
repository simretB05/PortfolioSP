<template>
  <div id="site">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
:root {
  --bg: #0b1716;
  --bg-alt: #0f1e1c;
  --surface: #142725;
  --line: rgba(232, 238, 233, 0.14);
  --line-strong: rgba(232, 238, 233, 0.28);
  --text: #e8eee9;
  --muted: #b2c3be;
  --accent: #3cc2b0;
  --serif: "Cormorant Garamond", Georgia, serif;
  --sans: "Jost", "Segoe UI", sans-serif;
  --script: "Allura", cursive;
  --max: 1200px;
  --gutter: clamp(20px, 5vw, 56px);
  /* Shared warm black-and-white tone for every photo */
  --photo-tone: grayscale(1) sepia(0.3) contrast(1.05);
}

:root[data-theme="light"] {
  /* Old newspaper: yellowed newsprint, faded warm-black ink and crisp rules */
  --bg: #ede4cf;
  --bg-alt: #e4d9bf;
  --surface: #f3ecdc;
  --line: rgba(33, 28, 20, 0.18);
  --line-strong: rgba(33, 28, 20, 0.45);
  --text: #1f1a13;
  --muted: #4d4436;
  --accent: #1f1a13;
  /* Photos print in black and white, slightly aged like an old paper */
  --photo-tone: grayscale(1) sepia(0.12) contrast(1.1);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

html,
body {
  margin: 0;
  padding: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--sans);
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  transition: background-color 0.4s ease, color 0.4s ease;
}

img {
  display: block;
  max-width: 100%;
}

a {
  color: inherit;
}

/* Shared section typography */
.container {
  width: 100%;
  max-width: var(--max);
  margin: 0 auto;
  padding: 0 var(--gutter);
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 0 0 20px;
  font-family: var(--sans);
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--accent);
}

.eyebrow::after {
  content: "";
  width: 32px;
  height: 1px;
  background: currentColor;
  opacity: 0.7;
}

.serif-heading {
  margin: 0;
  font-family: var(--serif);
  font-size: clamp(2.3rem, 4vw, 3.3rem);
  font-weight: 400;
  line-height: 1.08;
  color: var(--text);
}

.body-text {
  margin: 0;
  font-size: 1.08rem;
  line-height: 1.75;
  color: var(--muted);
}

/* Small uppercase link with an underline and arrow ("View my work ->") */
.text-link {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid currentColor;
  font-size: 0.82rem;
  font-weight: 400;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--text);
}

.text-link i {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.text-link:hover i {
  transform: translateX(5px);
}

/*
 * Day mode reads like a newspaper: every image prints in black and white and
 * only shows its color while hovered. Hover is checked on each image's block,
 * since overlays and text sit on top of some photos.
 */
:root[data-theme="light"] img {
  filter: var(--photo-tone) !important;
  transition: filter 0.6s ease, transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) !important;
}

:root[data-theme="light"] .hero:hover img,
:root[data-theme="light"] .card:hover img,
:root[data-theme="light"] .about__photo:hover img,
:root[data-theme="light"] .exploring__top:hover img,
:root[data-theme="light"] .contact__image:hover img {
  filter: none !important;
}

/* Scroll reveal (used with v-scrollanimation="'reveal'") */
.before-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.9s ease, transform 0.9s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.reveal {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  .before-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
