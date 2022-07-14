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
        <span class="form-element-description">Content</span>
        <textarea v-model="content" />
      </label>
      <label class="form-element">
        <button @click="updateStory()">Update</button>
      </label>
    </div>
    <div v-else>You have to be logged in to create a story</div>
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
    };
  },
  async mounted() {
    const { title, thumbnail, text } = await Api.getStoryById(
      this.$route.params.id
    );
    this.title = title;
    this.thumbnail = thumbnail;
    this.content = text;
  },
  methods: {
    async updateStory() {
      await Api.updateStory(
        this.$route.params.id,
        this.title,
        this.content,
        this.thumbnail
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
