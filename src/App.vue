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
  --muted: #9cb0ab;
  --accent: #1aad9b;
  --serif: "Cormorant Garamond", Georgia, serif;
  --sans: "Jost", "Segoe UI", sans-serif;
  --script: "Allura", cursive;
  --max: 1200px;
  --gutter: clamp(20px, 5vw, 56px);
}

:root[data-theme="light"] {
  --bg: #f1f5f3;
  --bg-alt: #e4ecea;
  --surface: #ffffff;
  --line: rgba(17, 36, 33, 0.14);
  --line-strong: rgba(17, 36, 33, 0.3);
  --text: #112421;
  --muted: #4c605c;
  /* Darker than the logo teal so accent text stays readable on light backgrounds */
  --accent: #0f7468;
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
