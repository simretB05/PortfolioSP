<template>
  <section class="exploring">
    <div class="container exploring__inner">
      <div v-scrollanimation="'reveal'">
        <p class="eyebrow">{{ exploring.eyebrow }}</p>
        <h2 class="serif-heading">{{ exploring.heading[0] }}<br />{{ exploring.heading[1] }}</h2>
      </div>

      <ul class="exploring__list" v-scrollanimation="'reveal'">
        <li v-for="item in exploring.items" :key="item.title">
          <i :class="['mdi', item.icon]"></i>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { exploring } from "@/data/content";

export default {
  data() {
    return { exploring };
  },
};
</script>

<style scoped>
.exploring {
  padding: 80px 0;
  background: var(--bg-alt);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.exploring__inner {
  display: grid;
  grid-template-columns: minmax(240px, 0.9fr) 2.2fr;
  gap: 48px;
  align-items: center;
}

.exploring__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.exploring__list li {
  padding: 22px 16px;
  border-radius: 6px;
  text-align: center;
  transition: background-color 0.3s ease;
}

.exploring__list li:hover {
  background: var(--line);
}

.exploring__list i {
  display: block;
  margin-bottom: 12px;
  font-size: 1.9rem;
  color: var(--accent);
}

.exploring__list h3 {
  margin: 0 0 6px;
  font-size: 0.98rem;
  font-weight: 400;
}

.exploring__list p {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--muted);
}

@media (max-width: 1000px) {
  .exploring__inner {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 680px) {
  .exploring__list {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
}
</style>
