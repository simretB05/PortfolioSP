<template>
  <section id="work" class="work">
    <div class="container">
      <p class="eyebrow" v-scrollanimation="'reveal'">Featured work</p>

      <div class="work__grid">
        <component
          :is="item.link ? 'a' : 'div'"
          v-for="item in items"
          :key="item.title"
          :href="item.link || null"
          :target="item.link ? '_blank' : null"
          :rel="item.link ? 'noopener' : null"
          class="card"
          v-scrollanimation="'reveal'"
        >
          <div class="card__media">
            <img v-if="item.image" :src="item.image" :alt="`${item.title} website`" loading="lazy" />

            <div v-else-if="item.chat" class="chat" aria-hidden="true">
              <p class="chat__head">AI Assistant</p>
              <div class="chat__row">
                <span class="chat__avatar"><i class="mdi mdi-robot-outline"></i></span>
                <p class="chat__bubble">Hi! I can help you with information about our products and services. What would you like to know?</p>
              </div>
              <div class="chat__input">Type your question… <i class="mdi mdi-send"></i></div>
            </div>
          </div>

          <div class="card__body">
            <h3 class="card__title">{{ item.title }}</h3>
            <p class="card__tags">{{ item.tags.join("  /  ") }}</p>
            <i v-if="item.link" class="mdi mdi-arrow-right card__arrow"></i>
          </div>
        </component>
      </div>
    </div>
  </section>
</template>

<script>
import { featuredWork } from "@/data/content";

export default {
  data() {
    return { items: featuredWork };
  },
};
</script>

<style scoped>
.work {
  padding: 72px 0 96px;
  background: var(--bg);
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

a.card:hover {
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

a.card:hover .card__media img {
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

a.card:hover .card__arrow {
  transform: translateX(4px);
  color: var(--text);
}

/* Mini chat window for the AI Chatbot card */
.chat {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  font-size: 0.78rem;
  background: #1d2a23;
  color: #e9e4d8;
}

.chat__head {
  margin: 0;
  font-weight: 400;
}

.chat__row {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.chat__avatar {
  flex: none;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #3e6b59;
  font-size: 0.85rem;
}

.chat__bubble {
  margin: 0;
  padding: 8px 10px;
  border-radius: 10px 10px 10px 2px;
  background: #e9e4d8;
  color: #1d2a23;
  line-height: 1.35;
}

.chat__input {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  padding: 7px 10px;
  border-radius: 999px;
  background: rgba(233, 228, 216, 0.12);
  color: rgba(233, 228, 216, 0.6);
}

@media (max-width: 1000px) {
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
