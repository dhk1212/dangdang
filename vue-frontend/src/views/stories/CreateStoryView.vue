<template>
  <div class="page">
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
        <button @click="createStory()">Create</button>
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
  methods: {
    async createStory() {
      await Api.createStory(this.title, this.content, this.thumbnail);
      window.alert("Successfully created! 👍");
      this.$router.push("/stories");
    },
  },
};
</script>

<style scoped>
input {
  padding: 0.5em;
}

.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

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

.form-element input,
.form-element textarea {
  padding: 8px;
  width: 100%;
  min-height: 44px;
  border: 1px solid black;
  border-radius: 4px;
  outline-color: black;
  background-color: white;
}

.form-element button {
  background: transparent;
  border: 1px solid black;
  width: 40%;
  align-self: center;
  transition: 0.3s;
}

.form-element button:hover {
  background: black;
  padding: 12px;
  color: white;
  border: 1px solid black;
  width: 40%;
  align-self: center;
}

.form-element-description {
  font-size: 16px;
  margin: 0.5em;
  text-align: center;
}
</style>
