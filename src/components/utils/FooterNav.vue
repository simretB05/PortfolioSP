<template>
  <div class="footer">
    <div class="fo-div">
      <div class="footer-content">
        <div class="logo-and-info" v-scrollanimation="'enter'">
          <v-btn
            @click="routeHome"
            class="btn-custom"
            style="
              background-color: transparent;
              border: none;
              box-shadow: none;
              color: #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <v-img
              v-if="$vuetify.theme.dark"
              lazy-src="/images/sim_logo_footer.png"
              max-height="150"
              max-width="250"
              src="/images/sim_logo_footer.png"
            ></v-img>
            <v-img
              v-else
              lazy-src="/images/sim_logo_footer.png"
              max-height="150"
              max-width="250"
              src="/images/sim_logo_footer.png"
            ></v-img>
          </v-btn>

          <div class="mt-info animated-content">
            <p class="mt-2">Full Stack Web Developer</p>
            <div class="mt-phone animated-content">
              <i class="mdi mdi-phone-in-talk" style="font-size: 20px; color: white;"></i>
              <p>+1(204)333-7744</p>
            </div>
          </div>
        </div>

        <div class="social-media" v-scrollanimation="'enter'">
          <!-- LinkedIn icon and link -->
          <button @click="goToLinkedIn" class="animated-link">
            <i class="mdi mdi-linkedin" style="font-size: 34px; color: white;"></i>
          </button>
          <!-- GitHub icon and link -->
          <button @click="goToGitHub" class="animated-link">
            <i class="mdi mdi-github" style="font-size: 34px; color: white;"></i>
          </button>
        </div>
      </div>

      <div class="copy-right animated-content" v-scrollanimation="'enter'">
        <p>
          © 2024 Simret Paulos - All rights reserved.
          Powered by Vue.js
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // ... your existing methods ...

    // Updated method to open links in a new tab
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
.footer {
  padding: 10px;
  width: 100%;
  min-height: 5vh;
  background-color: #1bae9c; 
  color: #fff; 
}

.fo-div {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0; 
}

.footer-content {
  display: flex;
  flex-direction: column; 
  align-items: center; 
  width: 100%;
}

.logo-and-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mt-info {
  margin-top: 5px; 
}
.mt-phone{
  display: flex;
  justify-content: space-around;
}
.social-media{
  display: flex;
}
.animated-link {
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
.animated-link:hover {
  box-shadow: 0 3px 3px rgba(21, 181, 167, 0.4);
}
.animated-link:active {
  transform: translateY(3px);
  box-shadow: none;
}


.copy-right {
  margin-top: 10px; 
  text-align: center;
}
.before-enter {
  opacity: 0;
  transform: translateY(10px);
  transition: all .5s ease-out;
}

.enter {
  opacity: 1;
  transform: translateY(0px);
  transition: all .5s ease-in;

}

@media only screen and (min-width: 600px) {
  /* Adjust styles for larger screens if needed */
  .footer-content {
    flex-direction: row; /* Switch back to row for larger screens */
    justify-content: space-between;
  }
  
  .social-media button {
    margin-top: 0; /* Reset margin for larger screens */
  }
}
</style>
