<template>
  <div class="page">
    <HeaderComponent :is-authenticated="isAuthenticated" />
    <div>
      <div class="container">
        <button @click="$router.push('/articles/create')" class="card new-card">
          <h3>Add new article!</h3>
        </button>
        <template v-for="story in articles" :key="story.id">
          <CardComponent
            class="card"
            @click="$router.push('/articles/' + story.id)"
            :author="story.author"
            :thumbnail="story.thumbnail"
            :title="story.title"
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
      articles: [],
    };
  },
  computed: {
    isAuthenticated: () => Api.isAuthenticated(),
  },
  async mounted() {
    this.articles = await Api.getArticles();
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
