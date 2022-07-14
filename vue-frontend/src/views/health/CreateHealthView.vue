<template>
  <div class="page">
    <HeaderComponent :is-authenticated="isAuthenticated" />
    <div v-if="isAuthenticated" class="form">
      <label class="form-element">
        <span class="form-element-description">Title</span>
        <input v-model="title" />
      </label>
      <label class="form-element">
        <span class="form-element-description">Content</span>
        <textarea v-model="content" />
      </label>
      <label class="form-element">
        <span class="form-element-description">Rating</span>
        <input v-model="rating" />
      </label>
      <div class="form-element">
        <span class="form-element-description">Address</span>
        <div class="form-element-address">
          <input
            class="form-element-address-field"
            v-model="streetName"
            placeholder="Street Name"
          />
          <input
            class="form-element-address-field"
            v-model="houseNumber"
            placeholder="House Number"
          />
          <input
            class="form-element-address-field"
            v-model="city"
            placeholder="City"
          />
          <input
            class="form-element-address-field"
            v-model="zip"
            placeholder="ZIP"
          />
        </div>
      </div>
      <label class="form-element">
        <button @click="createHealthReport()">Create</button>
      </label>
    </div>
    <div v-else>You have to be logged in to create a health report</div>
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
      content: "",
      rating: 0,
      streetName: "",
      houseNumber: "",
      city: "",
      zip: "",
    };
  },
  methods: {
    async createHealthReport() {
      await Api.createHealthReport(this.title, this.content, this.rating, {
        streetName: this.streetName,
        houseNumber: this.houseNumber,
        city: this.city,
        zip: this.zip,
      });
      window.alert("Successfully created! 👍");
      this.$router.push("/health-reports");
    },
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

.form-element-address {
  display: flex;
  flex-direction: column;
}

.form-element-address-field {
  margin-bottom: 4px;
}
</style>
