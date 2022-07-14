<template>
  <div>
    <HeaderComponent :is-authenticated="isAuthenticated" />
    <div class="article">
      <h1>
        <span class="title">{{ article?.title }}</span>
      </h1>
      <div class="author">
        by <span class="author-name">{{ article?.author }}</span>
      </div>
      <img :src="article?.thumbnail" alt="thumbnail" />
      <div class="article-information">
        <p>Price: {{ article?.price }} €</p>
        <p>{{ article?.text }}</p>
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
      article: undefined,
    };
  },
  async mounted() {
    this.article = await Api.getArticleById(this.$route.params.id);
  },
};
</script>

<style scoped>
.article {
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

.article-information {
  font-family: "brandeon-grotesque";
  font-size: 0.9em;
  letter-spacing: 0.1em;
  text-align: center;
}
</style>
