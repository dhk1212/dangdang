<template>
  <div>
    <HeaderComponent :is-authenticated="isAuthenticated" />
    <div v-if="isAuthenticated" class="form">
      <label class="form-element">
        <span class="form-element-description">Title</span>
        <input v-model="title" />
      </label>
      <label class="form-element">
        <span class="form-element-description">Rating</span>
        <input v-model="rating" />
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
        <button @click="updateHealthReport()">Update</button>
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
      content: "",
      rating: 0,
      streetName: "",
      houseNumber: "",
      city: "",
      zip: "",
    };
  },
  async mounted() {
    const { title, text, rating, address } = await Api.getHealthReportsById(
      this.$route.params.id
    );
    this.title = title;
    this.content = text;
    this.rating = rating;
    this.streetName = address.streetName;
    this.houseNumber = address.houseNumber;
    this.city = address.city;
    this.zip = address.zip;
  },
  methods: {
    async updateHealthReport() {
      await Api.updateHealthReport(
        this.$route.params.id,
        this.title,
        this.content,
        this.rating
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

.form-element-address {
  display: flex;
  flex-direction: column;
}

.form-element-address-field {
  margin-bottom: 4px;
}
</style>
