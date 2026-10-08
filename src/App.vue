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
  --bg: #0e1511;
  --bg-alt: #131c17;
  --surface: #18231d;
  --line: rgba(236, 231, 220, 0.14);
  --line-strong: rgba(236, 231, 220, 0.28);
  --text: #ece7dc;
  --muted: #a4aca1;
  --accent: #c8b98d;
  --serif: "Cormorant Garamond", Georgia, serif;
  --sans: "Jost", "Segoe UI", sans-serif;
  --script: "Allura", cursive;
  --max: 1200px;
  --gutter: clamp(20px, 5vw, 56px);
}

:root[data-theme="light"] {
  --bg: #f4f0e7;
  --bg-alt: #ebe5d8;
  --surface: #ffffff;
  --line: rgba(27, 38, 32, 0.14);
  --line-strong: rgba(27, 38, 32, 0.3);
  --text: #18221c;
  --muted: #56615a;
  --accent: #8a7340;
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
  margin: 0 0 18px;
  font-family: var(--sans);
  font-size: 0.78rem;
  font-weight: 400;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--muted);
}

.serif-heading {
  margin: 0;
  font-family: var(--serif);
  font-size: clamp(2rem, 3.6vw, 2.9rem);
  font-weight: 400;
  line-height: 1.08;
  color: var(--text);
}

.body-text {
  margin: 0;
  font-size: 1.02rem;
  line-height: 1.7;
  color: var(--muted);
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
