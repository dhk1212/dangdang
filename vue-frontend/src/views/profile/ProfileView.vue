<template>
  <div>
    <HeaderComponent :is-authenticated="!!user" :user="user" />
    <div class="body">
      <div class="user-profile">
        <div v-if="user">
          <img src="../../assets/login.png" class="round" alt="" />
          <div class="name">{{ user.firstName }} {{ user.lastName }}</div>
          <div class="username">{{ user.username }}</div>
          <div class="email">{{ user.email }}</div>
          <hr />
          <template v-if="stories.length > 0">
            <h3>Your stories</h3>
            <div class="story" v-for="story in stories" :key="story.id">
              <router-link class="text" :to="`/stories/${story.id}`"
                >{{ story.title }} from
                {{ formatDate(story.createdAt) }}
              </router-link>
              <div>
                <button class="button" @click="deleteStory(story.id)">
                  <img src="../../assets/delete.png" alt="" />
                </button>
                <button
                  class="button"
                  @click="$router.push(`/stories/${story.id}/update`)"
                >
                  <img src="../../assets/upload.png" alt="" />
                </button>
              </div>
            </div>
          </template>
          <template v-if="articles.length > 0">
            <h3>Your articles</h3>
            <div class="story" v-for="article in articles" :key="article.id">
              <router-link class="text" :to="`/articles/${article.id}`"
                >{{ article.title }} from
                {{ formatDate(article.createdAt) }}
              </router-link>
              <div>
                <button class="button" @click="deleteArticle(article.id)">
                  <img src="../../assets/delete.png" alt="" />
                </button>
                <button
                  class="button"
                  @click="$router.push(`/articles/${article.id}/update`)"
                >
                  <img src="../../assets/upload.png" alt="" />
                </button>
              </div>
            </div>
          </template>
          <template v-if="healthReports.length > 0">
            <h3>Your health reports</h3>
            <div
              class="story"
              v-for="healthReport in healthReports"
              :key="healthReport.id"
            >
              <router-link
                class="text"
                :to="`/health-reports/${healthReport.id}`"
                >{{ healthReport.title }} from
                {{ formatDate(healthReport.createdAt) }}
              </router-link>
              <div>
                <button
                  class="button"
                  @click="deleteHealthReports(healthReport.id)"
                >
                  <img src="../../assets/delete.png" alt="" />
                </button>
                <button
                  class="button"
                  @click="
                    $router.push(`/health-reports/${healthReport.id}/update`)
                  "
                >
                  <img src="../../assets/upload.png" alt="" />
                </button>
              </div>
            </div>
          </template>
          <template v-if="meetups.length > 0">
            <h3>Your meetups</h3>
            <div class="story" v-for="meetup in meetups" :key="meetup.id">
              <router-link class="text" :to="`/meetups/${meetup.id}`"
                >{{ meetup.title }} from
                {{ formatDate(meetup.createdAt) }}
              </router-link>
              <div>
                <button class="button" @click="deleteMeetup(meetup.id)">
                  <img src="../../assets/delete.png" alt="" />
                </button>
                <button
                  class="button"
                  @click="$router.push(`/meetups/${meetup.id}/update`)"
                >
                  <img src="../../assets/upload.png" alt="" />
                </button>
              </div>
            </div>
          </template>
          <template v-if="adoptions.length > 0">
            <h3>Your adoption entries</h3>
            <div class="story" v-for="adoption in adoptions" :key="adoption.id">
              <router-link class="text" :to="`/adoptions/${adoption.id}`"
                >{{ adoption.title }} from
                {{ formatDate(adoption.createdAt) }}
              </router-link>
              <div>
                <button class="button" @click="deleteAdoption(adoption.id)">
                  <img src="../../assets/delete.png" alt="" />
                </button>
                <button
                  class="button"
                  @click="$router.push(`/adoptions/${adoption.id}/update`)"
                >
                  <img src="../../assets/upload.png" alt="" />
                </button>
              </div>
            </div>
          </template>
        </div>
        <div v-else>Please login to see your profile</div>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import { Api } from "../../Api";
import HeaderComponent from "../../components/HeaderComponent.vue";
import FooterComponent from "../../components/FooterComponent.vue";
import dayjs from "dayjs";

export default {
  name: "ProfileView",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      user: undefined,
      stories: [],
      articles: [],
      healthReports: [],
      meetups: [],
      adoptions: [],
    };
  },
  async mounted() {
    if (Api.isAuthenticated()) {
      this.user = await Api.getUser();
      this.stories = await Api.getStories();
      this.stories = this.stories.filter(
        (story) => story.author === this.user.email
      );
      this.articles = await Api.getArticles();
      this.articles = this.articles.filter(
        (article) => article.author === this.user.email
      );
      this.healthReports = await Api.getHealthReports();
      this.healthReports = this.healthReports.filter(
        (healthReport) => healthReport.author === this.user.email
      );
      this.meetups = await Api.getMeetUps();
      this.meetups = this.meetups.filter(
        (meetup) => meetup.author === this.user.email
      );
      this.adoptions = await Api.getAdoptions();
      this.adoptions = this.adoptions.filter(
        (adoption) => adoption.author === this.user.email
      );
    }
  },
  methods: {
    formatDate(dateString) {
      return dayjs(dateString).format("YYYY-MM-DD");
    },
    async deleteStory(storyId) {
      await Api.deleteStoryById(storyId);
      this.stories = this.stories.filter((story) => story.id !== storyId);
    },
    async deleteArticle(articleId) {
      await Api.deleteArticleById(articleId);
      this.articles = this.articles.filter(
        (article) => article.id !== articleId
      );
    },
    async deleteHealthReports(healthId) {
      await Api.deleteHealthReportById(healthId);
      this.healthReports = this.healthReports.filter(
        (healthReport) => healthReport.id !== healthId
      );
    },
    async deleteMeetup(meetupId) {
      await Api.deleteMeetupById(meetupId);
      this.meetups = this.meetups.filter((meetup) => meetup.id !== meetupId);
    },
    async deleteAdoption(adoptionId) {
      await Api.deleteAdoptionById(adoptionId);
      this.adoptions = this.adoptions.filter(
        (adoption) => adoption.id !== adoptionId
      );
    },
  },
};
</script>

<style scoped>
.body {
  background-color: #d7dedc;
  font-family: Montserrat, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 57.5vh;
  margin: 0;
}

.username {
  margin: 10px 0;
}

.name {
  margin: 10px 0;
}

.email {
  margin: 10px 0;
}

.story {
  margin: 10px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-profile {
  margin: 16px;
  background-color: whitesmoke;
  border-radius: 5px;
  box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.75);
  padding-top: 30px;
  position: relative;
  width: 550px;
  max-width: 100%;
  text-align: center;
}

.user-profile .round {
  width: 40px;
  height: 40px;
  border: 1px solid #03bfcb;
  border-radius: 50%;
  padding: 7px;
}

button {
  cursor: pointer;
}

img {
  margin-top: 2px;
  width: 20px;
  height: 20px;
}

.text {
  text-decoration: none;
  color: black;
}

.text:hover {
  color: blue;
}
</style>
