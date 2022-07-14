<template>
  <div class="article">
    <h1>
      <span class="title">{{ story?.title }}</span>
    </h1>
    <div class="author">by <span class="author-name">Dahye Kim</span></div>
    <img :src="story?.thumbnail" alt="thumbnail" />
    <div class="story">
      <p>{{ story?.text }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      story: undefined,
    };
  },
  async mounted() {
    const response = await axios.get(
      `https://mqpkhmv1db.execute-api.eu-central-1.amazonaws.com/stories/${this.$route.params.id}`
    );
    this.story = response.data;
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

.story {
  font-family: "brandeon-grotesque";
  font-size: 0.9em;
  letter-spacing: 0.1em;
  text-align: center;
}
</style>
