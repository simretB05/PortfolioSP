<template>
  <section id="home" class="hero">
    <div class="hero__media" aria-hidden="true">
      <img src="/images/hero-portrait.webp" alt="" class="hero__photo" fetchpriority="high" />
      <div class="hero__shade"></div>
    </div>

    <div class="hero__content">
      <h1 class="hero__name">
        <span v-for="(word, i) in nameWords" :key="i" :style="{ animationDelay: `${0.15 + i * 0.15}s` }">{{
          word
        }}</span>
      </h1>
      <p class="hero__title">{{ profile.title }}</p>
      <p class="hero__tagline">{{ profile.tagline }}</p>
    </div>

    <a href="#work" class="hero__scroll">
      Scroll
      <span class="hero__scroll-line"></span>
    </a>
  </section>
</template>

<script>
import { profile } from "@/data/content";

export default {
  data() {
    return { profile };
  },
  computed: {
    nameWords() {
      return profile.name.split(" ");
    },
  },
};
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  display: grid;
  place-items: end center;
  overflow: hidden;
  background: #081211;
  color: #f2eee5;
  isolation: isolate;
}

.hero__media {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.hero__photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;
  object-position: 50% 33%;
  filter: saturate(0.75) contrast(1.05) brightness(0.9);
  /* Fade in, then a slow zoom and drift that goes back and forth forever */
  animation: photo-in 2.2s ease both, drift 22s ease-in-out 2.2s infinite alternate;
  will-change: transform;
}

/* Dark teal wash so the white text reads clearly, deeper at the edges and bottom */
.hero__shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(8, 20, 19, 0.5) 0%, rgba(8, 20, 19, 0) 20%, rgba(8, 20, 19, 0.25) 55%, #0b1716 100%),
    radial-gradient(ellipse 75% 75% at 50% 35%, transparent 35%, rgba(8, 20, 19, 0.55) 100%),
    rgba(14, 52, 48, 0.35);
}

.hero__content {
  width: 100%;
  max-width: 1100px;
  padding: 120px var(--gutter) clamp(110px, 14vh, 150px);
  text-align: center;
}

.hero__name {
  margin: 0 0 22px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 0.35em;
  font-family: var(--sans);
  font-size: clamp(3.2rem, 7.6vw, 7.5rem);
  font-weight: 200;
  line-height: 0.95;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.hero__name span {
  display: inline-block;
  animation: rise 1.2s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

.hero__title {
  margin: 0 0 22px;
  font-size: clamp(1.1rem, 2vw, 1.6rem);
  font-weight: 300;
  animation: fade 1.2s ease 0.6s both;
}

.hero__tagline {
  max-width: 640px;
  margin: 0 auto;
  font-size: clamp(0.98rem, 1.3vw, 1.12rem);
  line-height: 1.7;
  color: rgba(242, 238, 229, 0.78);
  animation: fade 1.2s ease 0.8s both;
}

.hero__scroll {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-size: 0.75rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  text-decoration: none;
  color: rgba(242, 238, 229, 0.75);
}

.hero__scroll-line {
  width: 1px;
  height: 36px;
  background: linear-gradient(rgba(242, 238, 229, 0.8), transparent);
  animation: drip 2.2s ease-in-out infinite;
  transform-origin: top;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes photo-in {
  from {
    opacity: 0;
    transform: scale(1.06);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes drift {
  from {
    transform: scale(1) translate(0, 0);
  }
  to {
    transform: scale(1.12) translate(-2%, -1.5%);
  }
}

@keyframes drip {
  0% {
    transform: scaleY(0);
  }
  50% {
    transform: scaleY(1);
  }
  100% {
    transform: scaleY(0);
    transform-origin: bottom;
  }
}

@media (max-width: 760px) {
  .hero__photo {
    object-position: 50% 20%;
  }

  .hero__name {
    font-size: clamp(3rem, 15vw, 4.5rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__name span,
  .hero__title,
  .hero__tagline,
  .hero__photo,
  .hero__scroll-line {
    animation: none;
  }
}
</style>
