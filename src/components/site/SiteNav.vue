<template>
  <header class="nav" :class="{ scrolled, open }">
    <div class="nav__inner">
      <a href="#home" class="nav__brand" @click="open = false">{{ name }}</a>

      <nav class="nav__links" aria-label="Main">
        <a
          v-for="link in links"
          :key="link.id"
          :href="`#${link.id}`"
          :class="{ active: active === link.id }"
          @click="open = false"
          >{{ link.label }}</a
        >
      </nav>

      <div class="nav__actions">
        <button
          class="icon-btn"
          :aria-label="light ? 'Switch to dark mode' : 'Switch to light mode'"
          @click="toggleTheme"
        >
          <i :class="['mdi', light ? 'mdi-weather-night' : 'mdi-white-balance-sunny']"></i>
        </button>
        <button
          class="icon-btn nav__toggle"
          :aria-expanded="String(open)"
          aria-label="Menu"
          @click="open = !open"
        >
          <i :class="['mdi', open ? 'mdi-close' : 'mdi-menu']"></i>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { profile } from "@/data/content";

const THEME_KEY = "theme";

export default {
  data() {
    return {
      name: profile.name,
      links: [
        { id: "home", label: "Home" },
        { id: "about", label: "About" },
        { id: "work", label: "Portfolio" },
        { id: "contact", label: "Contact" },
      ],
      active: "home",
      scrolled: false,
      open: false,
      light: false,
    };
  },
  methods: {
    onScroll() {
      this.scrolled = window.scrollY > 40;
    },
    toggleTheme() {
      this.light = !this.light;
      this.applyTheme();
      try {
        localStorage.setItem(THEME_KEY, this.light ? "light" : "dark");
      } catch (e) {
        // Storage can be unavailable (private mode); the toggle still works.
      }
    },
    applyTheme() {
      document.documentElement.setAttribute("data-theme", this.light ? "light" : "dark");
    },
  },
  mounted() {
    try {
      this.light = localStorage.getItem(THEME_KEY) === "light";
    } catch (e) {
      this.light = false;
    }
    this.applyTheme();

    window.addEventListener("scroll", this.onScroll, { passive: true });
    this.onScroll();

    // Highlight the link for whichever section is in the middle of the screen.
    this.spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) this.active = entry.target.id;
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["home", "work", "about", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) this.spy.observe(el);
    });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
    if (this.spy) this.spy.disconnect();
  },
};
</script>

<style scoped>
.nav {
  /* Over the always-dark hero the nav stays light, whatever the theme */
  --nav-fg: #f2eee5;
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  transition: background-color 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease;
  border-bottom: 1px solid transparent;
}

.nav.scrolled,
.nav.open {
  --nav-fg: var(--text);
  background: color-mix(in srgb, var(--bg) 82%, transparent);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom-color: var(--line);
}

.nav__inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 18px var(--gutter);
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav__brand {
  margin-right: auto;
  font-family: var(--serif);
  font-size: 1.25rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--nav-fg);
}

.nav__links {
  display: flex;
  gap: 32px;
}

.nav__links a {
  position: relative;
  padding: 4px 0;
  font-size: 1rem;
  font-weight: 300;
  text-decoration: none;
  color: var(--nav-fg);
  opacity: 0.8;
  transition: opacity 0.25s ease;
}

.nav__links a::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.nav__links a:hover,
.nav__links a.active {
  opacity: 1;
}

.nav__links a:hover::after,
.nav__links a.active::after {
  transform: scaleX(1);
}

.nav__actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.icon-btn {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--nav-fg);
  font-size: 1.25rem;
  cursor: pointer;
  transition: background-color 0.25s ease;
}

.icon-btn:hover {
  background: var(--line);
}

.nav__toggle {
  display: none;
}

@media (max-width: 760px) {
  .nav__toggle {
    display: grid;
  }

  .nav__links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    padding: 8px var(--gutter) 24px;
    background: var(--bg);
    border-bottom: 1px solid var(--line);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-8px);
    transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s;
  }

  .nav.open .nav__links {
    opacity: 1;
    visibility: visible;
    transform: none;
  }

  .nav__links a {
    color: var(--text);
    padding: 14px 0;
    font-size: 1.15rem;
    border-bottom: 1px solid var(--line);
  }

  .nav__links a::after {
    display: none;
  }
}
</style>
