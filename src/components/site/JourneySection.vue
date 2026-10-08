<template>
  <section class="journey">
    <div class="container journey__inner">
      <div class="journey__intro" v-scrollanimation="'reveal'">
        <p class="eyebrow">{{ journey.eyebrow }}</p>
        <h2 class="serif-heading">{{ journey.heading[0] }}<br />{{ journey.heading[1] }}</h2>
        <p class="body-text journey__text">{{ journey.text }}</p>
      </div>

      <ol class="timeline" v-scrollanimation="'reveal'">
        <li v-for="step in journey.steps" :key="step.title">
          <span class="timeline__dot"><i :class="['mdi', step.icon]"></i></span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.detail }}</p>
        </li>
        <li class="timeline__next">
          <span class="serif-heading">Next<br />Chapter</span>
        </li>
      </ol>
    </div>
  </section>
</template>

<script>
import { journey } from "@/data/content";

export default {
  data() {
    return { journey };
  },
};
</script>

<style scoped>
.journey {
  padding: 88px 0;
  background: var(--bg);
}

.journey__inner {
  display: grid;
  grid-template-columns: minmax(220px, 0.8fr) 2.4fr;
  gap: 48px;
  align-items: center;
}

.journey__text {
  margin-top: 18px;
  font-size: 0.95rem;
}

.timeline {
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr) auto;
  gap: 12px;
}

/* The connecting line runs through the middle of the icons */
.timeline::before {
  content: "";
  position: absolute;
  top: 28px;
  left: 0;
  right: 110px;
  height: 1px;
  background: var(--line-strong);
}

.timeline li {
  position: relative;
  text-align: center;
}

.timeline__dot {
  position: relative;
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  margin: 0 auto 16px;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  background: var(--bg);
  font-size: 1.4rem;
  transition: border-color 0.3s ease, transform 0.3s ease;
}

.timeline li:hover .timeline__dot {
  border-color: var(--accent);
  transform: translateY(-3px);
}

.timeline h3 {
  margin: 0 0 6px;
  font-size: 0.82rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.timeline p {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.45;
  color: var(--muted);
}

.timeline__next {
  display: flex;
  align-items: flex-start;
  padding-top: 6px;
  padding-left: 12px;
}

.timeline__next .serif-heading {
  font-size: 1.6rem;
  text-align: left;
}

@media (max-width: 1000px) {
  .journey__inner {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 680px) {
  .timeline {
    grid-template-columns: 1fr;
    gap: 22px;
    padding-left: 4px;
  }

  .timeline::before {
    top: 0;
    bottom: 40px;
    left: 32px;
    right: auto;
    width: 1px;
    height: auto;
  }

  .timeline li {
    display: grid;
    grid-template-columns: 56px 1fr;
    column-gap: 18px;
    text-align: left;
  }

  .timeline__dot {
    grid-row: span 2;
    margin: 0;
  }

  .timeline h3 {
    align-self: end;
  }

  .timeline__next {
    padding: 0 0 0 74px;
  }
}
</style>
