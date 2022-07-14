<template>
  <div>
    <HeaderComponent :is-authenticated="isAuthenticated" />
    <div class="adoption">
      <h1>
        <span class="title">{{ adoption?.title }}</span>
      </h1>
      <div class="author">
        by <span class="author-name">{{ adoption?.author }}</span>
      </div>
      <img :src="adoption?.thumbnail" alt="thumbnail" />
      <div class="adoption-information">
        <p>Price: {{ adoption?.price }} €</p>
        <h3>Description</h3>
        <p>{{ adoption?.text }}</p>
        <h3>Information about the dog</h3>
        <p>Breed: {{ adoption?.breed }}</p>
        <p>Age: {{ adoption?.age }}</p>
        <p>Gender: {{ adoption?.gender }}</p>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "../../components/HeaderComponent.vue";
import FooterComponent from "../../components/FooterComponent.vue";
import { Api } from "../../api";

export default {
  components: {
    HeaderComponent,
    FooterComponent,
  },
  computed: {
    isAuthenticated: () => Api.isAuthenticated(),
  },
  data() {
    return {
      adoption: undefined,
    };
  },
  async mounted() {
    this.adoption = await Api.getAdoptionById(this.$route.params.id);
  },
};
</script>

<style scoped>
.adoption {
  margin: auto;
  max-width: 1000px;
  text-align: center;
}

h1 {
  grid-column: 2;
  text-align: center;
}

img {
  width: 200px;
  height: 200px;
}

h1 span {
  display: block;
}

.title {
  margin-bottom: -10px;
  font-family: "questa-grande";
  text-transform: uppercase;
  font-size: 1em;
}

.author {
  text-align: center;
}

.author-name {
  font-family: "brandeon-grotesque";
  font-style: normal;
  text-transform: uppercase;
  text-align: center;
}

.adoption-information {
  font-family: "brandeon-grotesque";
  font-size: 0.9em;
  letter-spacing: 0.1em;
  text-align: center;
}
</style>
