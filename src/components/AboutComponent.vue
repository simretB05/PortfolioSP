<template>
  <div class="main">
    <section class="about-section">
      <div class="profile-container">
        <div class="profile-picture-container" v-scrollanimation="'fade-in'">
          <div class="outer-circle outer-circle-first"></div> <!-- First outer circle -->
          <div class="outer-circle outer-circle-second"></div> <!-- Second outer circle -->
          <div class="decorative-circle"></div>
          <div class="profile-picture">
            <img
              v-if="isDarkTheme"
              lazy-src="/images/pic1.jpg"
              max-height="200px"
              max-width="200px"
              src="/images/pic1.jpg"
              class="rounded-circle"
            />
            <img
              v-else
              lazy-src="/images/pic1.jpg"
              max-height="200px"
              max-width="200px"
              src="/images/pic1.jpg"
              class="rounded-circle"
            />
          </div>
        </div>
        <div class="about-description" v-scrollanimation="'enter-in'">
          <div class="title-container"  >
            <p class="my-name" v-scrollanimation="'enter-up'">Hi, I'm Simret Paulos</p>
            <p class="my-title" v-scrollanimation="'enter-up'">
              A Full Stack Web Developer with a versatile skill set.
            </p>
          </div>
          <div class="text-container">
            <p class="my-description" v-scrollanimation="'enter-up'">
              I go beyond just coding and design. With my knowledge in AWS cloud
              architecture and a solid grasp of Oracle technologies, I'm
              well-equipped to lead the charge in turning innovative concepts
              into reality through the power of cloud solutions.
            </p>
            <div class="mt-info" v-scrollanimation="'enter-up'">
              <!-- LinkedIn and GitHub icons with links -->
              <v-link class="btn" icon @click="goToLinkedIn" target="blank">
                <v-icon size="39" style="color: #1bae9c">mdi-linkedin</v-icon>
              </v-link>
              <v-link class="btn" icon @click="goToGitHub" target="blank">
                <v-icon size="39" style="color: #1bae9c">mdi-github</v-icon>
              </v-link>
            </div>
            <pdf-download-btn-util></pdf-download-btn-util>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PdfDownloadBtnUtil from "@/components/utils/PdfDownloadBtnUtil.vue";

export default {
  components: {
    PdfDownloadBtnUtil,
  },
  data() {
    return {
      isDarkTheme: true,
    };
  },
  methods: {
    goToLinkedIn() {
      window.open("https://www.linkedin.com/in/simret-webdev/", "_blank");
    },

    goToGitHub() {
      window.open("https://github.com/simretB05", "_blank");
    },
  },
};
</script>
<style scoped>
.main {
  display: grid;
  place-items: center;
  width: 100%;
}

.profile-container {
  margin: 0 auto;
}

.about-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  margin-top: 60px;
}

.profile-container {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  margin-right: 60px;
  margin-bottom: 80px;
}

.profile-picture-container {
  position: relative;
  width: 125px; 
  height: 125px; 
}

.outer-circle {
  position: absolute;
  border-radius: 50%;
  background-color: transparent;
  border: 1.3px dashed  #960631;
  opacity: 0.7;
  top: 50%;
  left: 50%; 
  transform: translate(-50%, -50%); 
}

.outer-circle-first {
  width: 410px; 
  height: 410px; 
}

.outer-circle-second {
  width: 350px;
  height: 350px; 
}

.decorative-circle {
  position: absolute;
  width: 312px; 
  height: 312px; 
  border-radius: 50%;
  background-color: #045644ca;
  opacity: 0.6;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
}

.profile-picture img {
  position: absolute;
  width: 300px; 
  height: 300px; 
  border-radius: 50%;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
  object-fit:cover;
}

.my-name {
  font-size: 2rem;
  font-weight: bold;
  color: #1bae9c;
  margin-bottom: 10px;
}

.my-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #1bae9c;
  margin-bottom: 20px;
}

.about-description {
  width: 40%;
  padding-top: 20px;
}

.my-description {
  font-size: 1rem;
  line-height: 1.5;
  text-align: start;
  color: #a2a0a0;
  font-weight: 400;
  margin-bottom: 20px;
}

.pdf-download-btn-util {
  margin-bottom: 20px;
}

.social-links {
  display: flex;
}

.btn {
  margin-right: 10px;
}

.before-fade-in {
  opacity: 0;
  transform: translateX(50px); 
  transition: opacity 1s ease-out, transform 1s ease-out;
}

.fade-in {
  opacity: 1;
  transform: translateX(-80px);
}

.before-enter-in {
  opacity: 0;
  transform: translateX(-100px); 
  transition: opacity 1s ease-out, transform 1s ease-out;
}

.enter-in {
  opacity: 1;
  transform: translateX(0px);
}

.before-enter-up {
  opacity: 0;
  transform: translateY(10px);
  transition: all 1s ease-out;
}

.enter-up {
  opacity: 1;
  transform: translateY(0px);
}

.mt-info {
  display: flex;
}

.btn {
  border: none;
  text-align: center;
  font-weight: 700;
  display: grid;
  place-items: center;
  grid-template-columns: 1fr;
  transition: background-color 0.5s ease;
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer;
}

.btn:hover {
  box-shadow: 0 3px 3px rgba(21, 181, 167, 0.4);
}

.btn:active {
  transform: translateY(3px);
  box-shadow: none;
}

/* Responsive Styles */
@media only screen and (max-width: 1200px) {
  .profile-container {
    flex-direction: column;
    text-align: center;
    margin-top: 0px;
    margin: 0;
  }

  .about-description {
    width: 100%;
    padding: 20px;
    display: grid;
    place-items: center;
  }

  .profile-picture-container {
    position: relative;
    margin-bottom: 20px;
  }

  .outer-circle {
    width: 350px;
    height: 350px; 
  }

  .outer-circle-first {
    width: 360px; 
    height: 360px; 
  }

  .outer-circle-second {
    width: 328px;
    height: 326px;
  }

  .decorative-circle {
    width: 307px;
    height: 307px; 
  }

  .profile-picture img {
    width: 307px; 
    height: 307px; 
  }

  .my-description {
    text-align: center;
  }

  .before-fade-in {
    opacity: 0;
    transform: translateY(-2px);
    transition: all 1s ease-out;
  }

  .fade-in {
    opacity: 1;
    transform: translateY(0px);
  }

  .before-enter-up {
    opacity: 0;
    transform: translateY(10px);
    transform: translateX(0px);
    transition: all 1s ease-out;
  }

  .enter-up {
    opacity: 1;
    transform: translateY(0px);
  }

  .before-enter-in {
    opacity: 0;
    transform: translateY(10px);
    transition: all 1s ease-out;
  }

  .enter-in {
    opacity: 1;
    transform: translateY(83px);
  }

  .mt-info {
    display: flex;
    justify-self: center;
  }

  .text-container {
    display: grid;
    place-items: center;
  }
}
</style>
