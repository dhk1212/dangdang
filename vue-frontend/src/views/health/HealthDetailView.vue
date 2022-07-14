<template>
  <div>
    <HeaderComponent :is-authenticated="isAuthenticated" />
    <div class="health">
      <h1>
        <span class="title">{{ healthReport?.title }}</span>
      </h1>
      <div class="author">
        by <span class="author-name">{{ healthReport?.author }}</span>
      </div>
      <div class="health-information">
        <h3>Rating: {{ healthReport?.rating }} / 10</h3>
        <h3>What was the experience like?</h3>
        <p>{{ healthReport?.text }}</p>
        <hr />
        <h3>Address of clinic / doctor</h3>
        <p>
          {{ healthReport?.address?.streetName }}
          {{ healthReport?.address?.houseNumber }}
        </p>
        <p>
          {{ healthReport?.address?.city }} {{ healthReport?.address?.zip }}
        </p>
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
      healthReport: undefined,
    };
  },
  async mounted() {
    this.healthReport = await Api.getHealthReportsById(this.$route.params.id);
  },
};
</script>

<style scoped>
.health {
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

.health-information {
  font-family: "brandeon-grotesque";
  font-size: 0.9em;
  letter-spacing: 0.1em;
  text-align: center;
}
</style>
