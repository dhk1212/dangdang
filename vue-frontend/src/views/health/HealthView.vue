<template>
  <div class="page">
    <HeaderComponent :is-authenticated="isAuthenticated" />
    <div>
      <div class="container">
        <button @click="$router.push('/health-reports/create')" class="card new-card">
          <h3>Add new health report!</h3>
        </button>
        <template
          v-for="healthReports in healthReports"
          :key="healthReports.id"
        >
          <CardComponent
            class="card"
            @click="$router.push('/health-reports/' + healthReports.id)"
            :author="healthReports.author"
            :title="healthReports.title"
          />
        </template>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "../../components/HeaderComponent.vue";
import CardComponent from "../../components/CardComponent.vue";
import FooterComponent from "../../components/FooterComponent.vue";
import { Api } from "../../api";

export default {
  components: {
    HeaderComponent,
    CardComponent,
    FooterComponent,
  },
  data() {
    return {
      healthReports: [],
    };
  },
  computed: {
    isAuthenticated: () => Api.isAuthenticated(),
  },
  async mounted() {
    this.healthReports = await Api.getHealthReports();
  },
};
</script>

<style scoped>
.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.router-button {
  text-align: center;
  margin: 8px;
  text-decoration: initial;
  color: black;
  font-size: x-large;
}

.router-button:hover {
  color: blue;
}

.container {
  display: flex;
  flex-wrap: wrap;
  margin-left: 80px;
}

.card {
  min-height: 330px;
  width: 24rem;
  max-width: 330px;
  margin: 10px;
  flex: 1 0 calc(33% - 10px);
}

.new-card {
  background: transparent;
  transition: 0.5s;
  border: 1px solid black;
  border-radius: 180px;
  cursor: pointer;
}

.new-card:hover {
  border: 1px solid black;
  border-radius: unset;
}
</style>
