<template>
  <section class="exploring">
    <div class="exploring__top">
      <div class="exploring__media" aria-hidden="true">
        <img :src="exploring.photo" alt="" loading="lazy" />
      </div>

      <div class="container">
        <div class="exploring__intro" v-scrollanimation="'reveal'">
          <p class="eyebrow">{{ exploring.eyebrow }}</p>
          <h2 class="serif-heading exploring__heading">{{ exploring.heading[0] }}<br />{{ exploring.heading[1] }}</h2>
          <p class="body-text exploring__text">{{ exploring.text }}</p>

          <ul class="exploring__tags" :aria-label="exploring.itemsLabel">
            <li v-for="item in exploring.items" :key="item.title" :title="item.text">
              <i :class="['mdi', item.icon]"></i>{{ item.title }}
            </li>
          </ul>

          <a :href="profile.linkedin" target="_blank" rel="noopener" class="text-link exploring__link">
            Follow my journey <i class="mdi mdi-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { exploring, profile } from "@/data/content";

export default {
  data() {
    return { exploring, profile };
  },
};
</script>

<style scoped>
.exploring__top {
  position: relative;
  background: var(--bg-alt);
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  padding: clamp(48px, 6vw, 72px) 0;
  overflow: hidden;
  isolation: isolate;
}

/* Warm-toned black-and-white landscape across the right, fading into the text side */
.exploring__media {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 62%;
  z-index: -1;
}

.exploring__media img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;
  object-position: 50% 45%;
  filter: var(--photo-tone) brightness(0.88);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.4) 18%, rgba(0, 0, 0, 0.85) 36%, #000 50%);
  mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.4) 18%, rgba(0, 0, 0, 0.85) 36%, #000 50%);
}

.exploring__intro {
  max-width: 520px;
}

/* A step down from the other section headings */
.exploring__heading {
  font-size: clamp(1.9rem, 3vw, 2.5rem);
}

.exploring__text {
  margin-top: 16px;
}

/* What I'm exploring, as one slim row of tags */
.exploring__tags {
  margin: 22px 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.exploring__tags li {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  font-size: 0.82rem;
  white-space: nowrap;
}

.exploring__tags i {
  font-size: 1rem;
  color: var(--accent);
}

.exploring__link {
  margin-top: 28px;
}

@media (max-width: 760px) {
  .exploring__top {
    flex-direction: column;
    align-items: stretch;
    min-height: 0;
    padding-top: 0;
  }

  /* Photo sits above the text so nothing is printed over it */
  .exploring__media {
    position: relative;
    width: 100%;
    height: 240px;
    margin-bottom: 8px;
  }

  .exploring__media img {
    object-position: 50% 30%;
    -webkit-mask-image: linear-gradient(0deg, transparent 0%, #000 35%);
    mask-image: linear-gradient(0deg, transparent 0%, #000 35%);
  }
}


/* Day mode: a shorter fade so more of the photo shows (wide screens only) */
@media (min-width: 761px) {
  /* Starts after the text column so the shorter fade never sits under the words */
  :root[data-theme="light"] .exploring__media {
    width: 54%;
  }

  :root[data-theme="light"] .exploring__media img {
    -webkit-mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.6) 10%, #000 24%);
    mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.6) 10%, #000 24%);
  }
}
</style>
