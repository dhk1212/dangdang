<template>
  <div>
    <HeaderComponent :is-authenticated="isAuthenticated" :user="user" />
    <div class="body">
      <h1>Welcome to DangDang</h1>
      <p>We love our dogs 🐶</p>
      <hr />
      <p>Categories</p>
      <div class="container">
        <HomeCard
          :asset-url="storiesImage"
          headline="Stories"
          @click="$router.push('/stories')"
        />
        <HomeCard
          :asset-url="articlesImage"
          headline="Articles"
          @click="$router.push('/articles')"
        />
        <HomeCard
          :asset-url="healthReportsImage"
          headline="Health"
          @click="$router.push('/health-reports')"
        />
        <HomeCard
          :asset-url="meetupsImage"
          headline="Meetups"
          @click="$router.push('/meetups')"
        />
        <HomeCard
          :asset-url="adoptionsImage"
          headline="Adoptions"
          @click="$router.push('/adoptions')"
        />
      </div>
      <hr />
      <p style="margin-top: 50px">About Us</p>
      <AboutUsComponent />
      <DogAnimation />
    </div>
    <FooterComponent />
  </div>
</template>

<script setup>
import storiesImage from "@/assets/1.jpg";
import articlesImage from "@/assets/2.jpg";
import healthReportsImage from "@/assets/3.jpg";
import meetupsImage from "@/assets/4.jpg";
import adoptionsImage from "@/assets/5.jpg";
</script>
<script>
import DogAnimation from "../components/DogAnimation.vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";
import AboutUsComponent from "../components/AboutUsComponent.vue";
import { Api } from "../Api";
import HomeCard from "../components/HomeCard.vue";

export default {
  components: {
    HomeCard,
    DogAnimation,
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
  },
  data() {
    return {
      user: undefined,
    };
  },
  computed: {
    isAuthenticated: () => {
      return Api.isAuthenticated();
    },
  },
  async mounted() {
    if (Api.isAuthenticated()) {
      console.log(await Api.getUser());
      this.user = await Api.getUser();
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@600&family=Nunito:wght@300&display=swap");

h1 {
  text-align: center;
  font-size: 60px;
  font-family: "Cinzel", serif;
  text-transform: uppercase;
}

p {
  text-align: center;
  font-size: 20px;
  font-family: "Cinzel", serif;
}

hr {
  width: 50%;
}

.body {
  padding: 1rem;
  background: linear-gradient(
    to top,
    whitesmoke 0%,
    whitesmoke 25%,
    #d8d8d8 50%,
    #d8d8d8 100%
  );
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 80px;
}

.container figure {
  position: relative;
  overflow: hidden;
  margin: 10px 1%;
  min-width: 320px;
  max-width: 480px;
  max-height: 360px;
  width: 48%;
  background-color: #3085a3;
  text-align: center;
  cursor: pointer;
}

.container figure img {
  position: relative;
  display: block;
  min-height: 100%;
  max-width: 100%;
  opacity: 0.8;
}

.container figure figcaption {
  padding: 2em;
  color: whitesmoke;
  text-transform: uppercase;
  font-size: 1.25em;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.container figure figcaption::before,
.container figure figcaption::after {
  pointer-events: none;
}

.container figure figcaption,
.container figure figcaption > a {
  position: absolute;
  top: 0;
  left: 0;
  width: 400px;
  height: 280px;
}

.container figure figcaption > a {
  z-index: 1000;
  text-indent: 200%;
  white-space: nowrap;
  font-size: 0;
  opacity: 0;
}

.container figure h2 {
  word-spacing: -0.15em;
  font-weight: 300;
}

.container figure h2 span {
  font-weight: 800;
}

.container figure h2,
.container figure p {
  margin: 0;
}

.container figure p {
  letter-spacing: 1px;
  font-size: 68.5%;
}

figure.effect {
  background: #9e5406;
}

figure.effect img {
  opacity: 0.7;
  -webkit-transition: opacity 0.35s;
  transition: opacity 0.35s;
}

figure.effect:hover img {
  opacity: 0.4;
}

figure.effect figcaption::before,
figure.effect figcaption::after {
  position: absolute;
  top: 30px;
  right: 30px;
  bottom: 30px;
  left: 30px;
  content: "";
  opacity: 0;
  -webkit-transition: opacity 0.35s, -webkit-transfom 0.35s;
  transition: opacity 0.35s, transform 0.35s;
}

figure.effect figcaption::before {
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  -webkit-transform: scale(0, 1);
  transform: scale(0, 1);
}

figure.effect figcaption::after {
  border-right: 1px solid #fff;
  border-left: 1px solid #fff;
  -webkit-transform: scale(1, 0);
  transform: scale(1, 0);
}

figure.effect h2 {
  padding-top: 30%;
  -webkit-transition: -webkit-transform 0.35s;
  transition: transform 0.35s;
  -webkit-transform: translate3d(0, -20px, 0);
  transform: translate3d(0, -20px, 0);
}

figure.effect p {
  padding: 20px 2.5em;
  opacity: 0;
  -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
  transition: opacity 0.35s, transform 0.35s;
  -webkit-transform: translate3d(0, 20px, 0);
  transform: translate3d(0, 20px, 0);
}

figure.effect:hover figcaption::before,
figure.effect:hover figcaption::after {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}

figure.effect:hover h2,
figure.effect:hover p {
  opacity: 1;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
</style>
