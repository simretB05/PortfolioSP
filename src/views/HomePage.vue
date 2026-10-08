<template>
  <div class="home">
    <site-nav />
    <main>
      <hero-section />
      <work-section />
      <about-section />
      <journey-section />
      <exploring-section />
    </main>
    <contact-section />
  </div>
</template>

<script>
import SiteNav from "@/components/site/SiteNav.vue";
import HeroSection from "@/components/site/HeroSection.vue";
import WorkSection from "@/components/site/WorkSection.vue";
import AboutSection from "@/components/site/AboutSection.vue";
import JourneySection from "@/components/site/JourneySection.vue";
import ExploringSection from "@/components/site/ExploringSection.vue";
import ContactSection from "@/components/site/ContactSection.vue";
import { profile } from "@/data/content";

export default {
  components: {
    SiteNav,
    HeroSection,
    WorkSection,
    AboutSection,
    JourneySection,
    ExploringSection,
    ContactSection,
  },
  metaInfo() {
    const baseUrl = "https://portfolio.simret.codes";
    const title = `${profile.name} — Web Developer & AI`;
    return {
      title,
      meta: [
        { name: "description", content: profile.tagline },
        { property: "og:title", content: title },
        { property: "og:description", content: profile.tagline },
        { property: "og:type", content: "website" },
        { property: "og:url", content: baseUrl },
        { property: "og:image", content: `${baseUrl}/images/website_image.png` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: profile.tagline },
        { name: "twitter:image", content: `${baseUrl}/images/website_image.png` },
      ],
    };
  },
};
</script>

<style scoped>
.home {
  min-height: 100vh;
  overflow-x: clip;
}
</style>
