<template>
  <div>
    <HeaderComponent :is-authenticated="isAuthenticated" />
    <div class="meetup">
      <h1>
        <span class="title">{{ meetup?.title }}</span>
      </h1>
      <div class="author">
        by <span class="author-name">{{ meetup?.author }}</span>
      </div>
      <div class="meetup-info">
        <h3>When do we meet?</h3>
        <p>{{ formatTime(meetup?.time) }}</p>
        <h3>What is the meeting about?</h3>
        <p>{{ meetup?.text }}</p>
        <hr />
        <h3>Where to meet?</h3>
        <p>
          {{ meetup?.address?.streetName }}
          {{ meetup?.address?.houseNumber }}
        </p>
        <p>{{ meetup?.address?.city }} {{ meetup?.address?.zip }}</p>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "../../components/HeaderComponent.vue";
import FooterComponent from "../../components/FooterComponent.vue";
import { Api } from "../../api";
import dayjs from "dayjs";

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
      meetup: undefined,
    };
  },
  methods: {
    formatTime(time) {
      return dayjs(time).format("YYYY-MM-DD HH:mm");
    },
  },
  async mounted() {
    this.meetup = await Api.getMeetUpById(this.$route.params.id);
  },
};
</script>

<style scoped>
.meetup {
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

.meetup-info {
  font-family: "brandeon-grotesque";
  font-size: 0.9em;
  letter-spacing: 0.1em;
  text-align: center;
}
</style>
