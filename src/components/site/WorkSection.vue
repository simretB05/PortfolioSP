<template>
  <section id="work" class="work">
    <div class="container">
      <div class="work__intro" v-scrollanimation="'reveal'">
        <div>
          <p class="eyebrow">{{ work.eyebrow }}</p>
          <h2 class="serif-heading">{{ work.heading[0] }}<br />{{ work.heading[1] }}</h2>
        </div>
        <p class="body-text">{{ work.text }}</p>
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

          <div class="card__body">
            <h3 class="card__title">{{ item.title }}</h3>
            <p class="card__tags">{{ item.tags.join("  /  ") }}</p>
            <i class="mdi mdi-arrow-right card__arrow"></i>
          </div>
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
  padding: 72px 0 96px;
  background: var(--bg);
}

.work__intro {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: end;
  margin-bottom: 44px;
}

.work__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--line-strong);
  border-radius: 6px;
  overflow: hidden;
  text-decoration: none;
  color: var(--text);
  background: var(--bg-alt);
  transition: opacity 0.9s ease, transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1), border-color 0.3s ease;
}

.card:hover {
  transform: translateY(-6px);
  border-color: var(--accent);
}

.card__media {
  aspect-ratio: 16 / 10;
  margin: 12px 12px 0;
  border-radius: 3px;
  overflow: hidden;
  background: var(--surface);
}

.card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  filter: saturate(0.85);
  transition: transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1), filter 0.4s ease;
}

.card:hover .card__media img {
  transform: scale(1.05);
  filter: saturate(1);
}

.card__body {
  position: relative;
  flex: 1;
  padding: 18px 16px 44px;
}

.card__title {
  margin: 0 0 8px;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.card__tags {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--muted);
  white-space: pre-wrap;
}

.card__arrow {
  position: absolute;
  right: 16px;
  bottom: 12px;
  font-size: 1.15rem;
  color: var(--muted);
  transition: transform 0.3s ease, color 0.3s ease;
}

.card:hover .card__arrow {
  transform: translateX(4px);
  color: var(--text);
}

@media (max-width: 1000px) {
  .work__intro {
    grid-template-columns: 1fr;
    gap: 18px;
  }
  .work__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .work__grid {
    grid-template-columns: 1fr;
  }
}
</style>
