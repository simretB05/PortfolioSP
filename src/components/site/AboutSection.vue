<template>
  <section id="about" class="about">
    <div class="about__intro" v-scrollanimation="'reveal'">
      <p class="eyebrow">{{ about.eyebrow }}</p>
      <h2 class="serif-heading">
        {{ about.heading[0] }}<br />{{ about.heading[1] }}
      </h2>
      <p v-for="(para, i) in about.text" :key="i" class="body-text about__text">{{ para }}</p>
      <p class="about__signature">{{ about.signature }}</p>
      <a :href="profile.resume" target="_blank" rel="noopener" class="about__resume">
        Download resume <i class="mdi mdi-arrow-down"></i>
      </a>
    </div>

    <div class="about__photo">
      <img :src="about.photo" alt="Simret Paulos" loading="lazy" />
    </div>

    <div id="services" class="about__services" v-scrollanimation="'reveal'">
      <p class="eyebrow">Services</p>
      <ul>
        <li v-for="service in services" :key="service.title">
          <span class="about__icon"><i :class="['mdi', service.icon]"></i></span>
          <div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.text }}</p>
          </div>
        </li>
      </ul>

      <!-- How I got here, from engineering to AI -->
      <ol class="journey" aria-label="My journey">
        <li v-for="step in journey.steps" :key="step.title">
          <span class="journey__dot"><i :class="['mdi', step.icon]"></i></span>
          <span class="journey__title">{{ step.title }}</span>
          <span class="journey__detail">{{ step.detail }}</span>
        </li>
        <li class="journey__next">Next Chapter</li>
      </ol>
    </div>
  </section>
</template>

<script>
import { about, services, journey, profile } from "@/data/content";

export default {
  data() {
    return { about, services, journey, profile };
  },
};
</script>

<style scoped>
.about {
  display: grid;
  grid-template-columns: 1fr minmax(280px, 0.85fr) 1fr;
  background: var(--bg-alt);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.about__intro,
.about__services {
  padding: 72px clamp(24px, 4vw, 64px);
}

.about__text {
  margin-top: 22px;
}

.about__text + .about__text {
  margin-top: 14px;
}

.about__signature {
  margin: 26px 0 0;
  font-family: var(--script);
  font-size: 1.9rem;
  color: var(--accent);
}

.about__resume {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 26px;
  padding: 10px 20px;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}

.about__resume:hover {
  background: var(--text);
  border-color: var(--text);
  color: var(--bg);
}

.about__photo {
  position: relative;
  min-height: 460px;
}

/* Inset from the section edges so the photo has breathing room around it */
.about__photo img {
  position: absolute;
  inset: 72px 0;
  width: 100%;
  height: calc(100% - 144px);
  border-radius: 4px;
  object-fit: cover;
  object-position: 50% 20%;
  filter: var(--photo-tone);
  transition: transform 1.2s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.about__photo:hover img {
  transform: scale(1.03);
}

/* Keeps the Services heading clear of the fixed nav when jumped to */
.about__services {
  scroll-margin-top: 80px;
}

.about__services ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 26px;
}

.about__services li {
  display: flex;
  gap: 18px;
  align-items: flex-start;
}

.about__icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  font-size: 1.3rem;
  color: var(--text);
}

.about__services h3 {
  margin: 4px 0 4px;
  font-size: 1.02rem;
  font-weight: 400;
}

.about__services p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--muted);
}

/* Small journey timeline under the services list */
.journey {
  position: relative;
  margin: 32px 0 0;
  padding: 26px 0 0;
  list-style: none;
  display: grid;
  gap: 12px;
  border-top: 1px solid var(--line);
}

/* Thin line linking the dots */
.journey::before {
  content: "";
  position: absolute;
  top: 40px;
  bottom: 20px;
  left: 14px;
  width: 1px;
  background: var(--line-strong);
}

.journey li {
  position: relative;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0 8px;
  padding-left: 44px;
  font-size: 0.85rem;
  line-height: 1.5;
}

.journey__dot {
  position: absolute;
  left: 0;
  top: -3px;
  display: grid;
  place-items: center;
  width: 29px;
  height: 29px;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  background: var(--bg-alt);
  font-size: 0.9rem;
}

.journey__title {
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.journey__detail {
  color: var(--muted);
}

.journey .journey__next {
  font-family: var(--serif);
  font-size: 1.15rem;
  color: var(--accent);
}

/* Small accent dot where the line ends */
.journey__next::before {
  content: "";
  position: absolute;
  left: 10px;
  top: 50%;
  width: 9px;
  height: 9px;
  margin-top: -4px;
  border-radius: 50%;
  background: var(--accent);
}

@media (max-width: 1000px) {
  .about {
    grid-template-columns: 1fr 1fr;
  }
  .about__photo {
    grid-row: span 2;
    grid-column: 2;
    grid-row-start: 1;
  }
  .about__services {
    padding-top: 0;
  }
}

@media (max-width: 680px) {
  .about {
    grid-template-columns: 1fr;
  }
  .about__photo {
    grid-column: auto;
    grid-row: auto;
    order: -1;
    min-height: 444px;
  }
  .about__photo img {
    inset: 24px var(--gutter) 0;
    width: calc(100% - 2 * var(--gutter));
    height: calc(100% - 24px);
  }
}
</style>
