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
};
</script>

<style scoped>
.home {
  min-height: 100vh;
  overflow-x: clip;
}
</style>
