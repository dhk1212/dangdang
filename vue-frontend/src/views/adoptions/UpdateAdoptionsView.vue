<template>
  <div>
    <HeaderComponent :is-authenticated="isAuthenticated" />
    <div v-if="isAuthenticated" class="form">
      <label class="form-element">
        <span class="form-element-description">Title</span>
        <input v-model="title" />
      </label>
      <label class="form-element">
        <span class="form-element-description">Link to thumbnail</span>
        <input v-model="thumbnail" />
      </label>
      <label class="form-element">
        <span class="form-element-description">Price</span>
        <input v-model="price" />
      </label>
      <label class="form-element">
        <span class="form-element-description">Content</span>
        <textarea v-model="content" />
      </label>
      <label class="form-element">
        <button @click="updateArticle()">Update</button>
      </label>
    </div>
    <div v-else>You have to be logged in to create an article</div>
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
      title: "",
      thumbnail: "",
      content: "",
      price: 0,
    };
  },
  async mounted() {
    const { title, thumbnail, text, price } = await Api.getArticleById(
      this.$route.params.id
    );
    this.title = title;
    this.thumbnail = thumbnail;
    this.content = text;
    this.price = price;
  },
  methods: {
    async updateArticle() {
      await Api.updateArticle(
        this.$route.params.id,
        this.title,
        this.content,
        this.thumbnail,
        this.price
      );
      this.$router.push("/profile");
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.form-element {
  margin: 0.5em;
  width: 20rem;
  display: flex;
  flex-direction: column;
}

.form-element-description {
  text-align: center;
}
</style>
