<template>
  <section id="work" class="work">
    <div class="container work__layout">
      <div class="work__intro" v-scrollanimation="'reveal'">
        <p class="eyebrow">{{ work.eyebrow }}</p>
        <h2 class="serif-heading">
          <span v-for="line in work.heading" :key="line" class="work__line">{{ line }}</span>
        </h2>
        <p class="body-text work__text">{{ work.text }}</p>
      </div>

      <div class="work__grid">
        <a
          v-for="item in items"
          :key="item.title"
          :href="item.link"
          target="_blank"
          rel="noopener"
          class="card"
          v-scrollanimation="'reveal'"
        >
          <div class="card__media">
            <img :src="item.image" :alt="`${item.title} website`" loading="lazy" />
          </div>

          <h3 class="card__title">
            {{ item.title }}
            <i class="mdi mdi-arrow-top-right card__arrow"></i>
          </h3>
          <p class="card__desc">{{ item.summary }}</p>
          <p class="card__tags">{{ item.tags.join("  /  ") }}</p>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import { work, featuredWork } from "@/data/content";

export default {
  data() {
    return { work, items: featuredWork };
  },
};
</script>

<style scoped>
.work {
  padding: clamp(80px, 10vw, 120px) 0;
  background: var(--bg);
  border-bottom: 1px solid var(--line);
}

.work__layout {
  display: grid;
  grid-template-columns: minmax(260px, 0.8fr) 2fr;
  gap: clamp(40px, 6vw, 88px);
  align-items: start;
}

/* Text stays in view while the project cards scroll past */
.work__intro {
  position: sticky;
  top: 120px;
}

.work__line {
  display: block;
}

.work__text {
  margin-top: 24px;
}

.work__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(40px, 5vw, 56px) clamp(24px, 3vw, 40px);
}

.card {
  display: block;
  text-decoration: none;
  color: var(--text);
}

.card__media {
  aspect-ratio: 16 / 10;
  margin-bottom: 22px;
  border: 1px solid var(--line);
  border-radius: 4px;
  overflow: hidden;
  background: var(--surface);
  transition: border-color 0.3s ease;
}

.card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  filter: saturate(0.85);
  transition: transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1), filter 0.4s ease;
}

.card:hover .card__media {
  border-color: var(--accent);
}

.card:hover .card__media img {
  transform: scale(1.04);
  filter: saturate(1);
}

.card__title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin: 0 0 10px;
  font-size: 1.05rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.card__arrow {
  font-size: 1.15rem;
  color: var(--muted);
  transition: transform 0.3s ease, color 0.3s ease;
}

.card:hover .card__arrow {
  transform: translate(3px, -3px);
  color: var(--accent);
}

.card__desc {
  margin: 0 0 14px;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--muted);
}

.card__tags {
  margin: 0;
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  white-space: pre-wrap;
}

@media (max-width: 1000px) {
  .work__layout {
    grid-template-columns: 1fr;
  }
  .work__intro {
    position: static;
    max-width: 560px;
  }
}

@media (max-width: 600px) {
  .work__grid {
    grid-template-columns: 1fr;
  }
}
</style>
