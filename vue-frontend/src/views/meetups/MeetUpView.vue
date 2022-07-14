<template>
  <div class="page">
    <HeaderComponent :is-authenticated="isAuthenticated" />
    <div>
      <div class="container">
        <button @click="$router.push('/meetups/create')" class="card new-card">
          <h3>Add new Meetup!</h3>
        </button>
        <template v-for="meetups in meetups" :key="meetups.id">
          <CardComponent
            class="card"
            @click="$router.push('/meetups/' + meetups.id)"
            :author="meetups.author"
            :title="meetups.title"
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
      meetups: [],
    };
  },
  computed: {
    isAuthenticated: () => Api.isAuthenticated(),
  },
  async mounted() {
    this.meetups = await Api.getMeetUps();
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
