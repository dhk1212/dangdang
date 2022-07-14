import axios from "axios";

const URL = "https://mqpkhmv1db.execute-api.eu-central-1.amazonaws.com";

const authHeaders = () => {
  const idToken = localStorage.getItem("IdToken");
  return {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  };
};

const User = {
  getUser: async () => {
    try {
      const { data } = await axios.get(`${URL}/user`, authHeaders());
      return data;
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  },
};

const Auth = {
  login: async (username, password) => {
    try {
      const { data } = await axios.post(`${URL}/auth/login`, {
        username,
        password,
      });
      localStorage.setItem("IdToken", data.IdToken);
    } catch (e) {
      console.error(e);
      window.alert("Login failed.");
    }
  },
  createLogin: async (firstName, lastName, username, email, password) => {
    try {
      await axios.post(`${URL}/auth/create-login`, {
        firstName,
        lastName,
        username,
        email,
        password,
      });
    } catch (e) {
      console.error(e);
      window.alert("Registration failed.");
    }
  },
};

const Story = {
  getStories: async () => {
    const { data } = await axios.get(`${URL}/stories`);
    return data;
  },
  getStoryById: async (storyId) => {
    const { data } = await axios.get(`${URL}/stories/${storyId}`);
    return data;
  },
  deleteStoryById: async (storyId) => {
    await axios.delete(`${URL}/stories/${storyId}`, authHeaders());
  },
  createStory: async (title, text, thumbnail) => {
    const body = { title, text, thumbnail };
    try {
      await axios.post(`${URL}/stories`, body, authHeaders());
    } catch (error) {
      console.error(error);
    }
  },
  updateStory: async (storyId, title, text, thumbnail) => {
    const body = { title, text, thumbnail };
    try {
      await axios.put(`${URL}/stories/${storyId}`, body, authHeaders());
    } catch (error) {
      console.error(error);
    }
  },
};

const Article = {
  getArticles: async () => {
    const { data } = await axios.get(`${URL}/articles`);
    return data;
  },
  getArticleById: async (articleId) => {
    const { data } = await axios.get(`${URL}/articles/${articleId}`);
    return data;
  },
  deleteArticleById: async (articleId) => {
    await axios.delete(`${URL}/articles/${articleId}`, authHeaders());
  },
  createArticle: async (title, text, thumbnail, price) => {
    const body = { title, text, thumbnail, price };
    try {
      await axios.post(`${URL}/articles`, body, authHeaders());
    } catch (error) {
      console.error(error);
    }
  },
  updateArticle: async (articleId, title, text, thumbnail, price) => {
    const body = { title, text, thumbnail, price };
    try {
      await axios.put(`${URL}/articles/${articleId}`, body, authHeaders());
    } catch (error) {
      console.error(error);
    }
  },
};

const HealthReports = {
  getHealthReports: async () => {
    const { data } = await axios.get(`${URL}/health-reports`);
    return data;
  },
  getHealthReportsById: async (healthId) => {
    const { data } = await axios.get(`${URL}/health-reports/${healthId}`);
    return data;
  },
  deleteHealthReportById: async (healthId) => {
    await axios.delete(`${URL}/health-reports/${healthId}`, authHeaders());
  },
  createHealthReport: async (title, text, rating, address) => {
    const body = { title, text, rating, address };
    try {
      await axios.post(`${URL}/health-reports`, body, authHeaders());
    } catch (error) {
      console.error(error);
    }
  },
  updateHealthReport: async (healthId, title, text, rating) => {
    const body = { title, text, rating };
    try {
      await axios.put(`${URL}/health-reports/${healthId}`, body, authHeaders());
    } catch (error) {
      console.error(error);
    }
  },
};

const MeetUps = {
  getMeetUps: async () => {
    const { data } = await axios.get(`${URL}/meetups`);
    return data;
  },
  getMeetUpById: async (meetupId) => {
    const { data } = await axios.get(`${URL}/meetups/${meetupId}`);
    return data;
  },
  deleteMeetupById: async (meetupId) => {
    await axios.delete(`${URL}/meetups/${meetupId}`, authHeaders());
  },
  createMeetup: async (title, text, time, address) => {
    const body = { title, text, time, address };
    try {
      await axios.post(`${URL}/meetups`, body, authHeaders());
    } catch (error) {
      console.error(error);
    }
  },
  updateMeetup: async (meetupId, title, text, time, address) => {
    const body = { title, text, time, address };
    try {
      await axios.put(`${URL}/meetups/${meetupId}`, body, authHeaders());
    } catch (error) {
      console.error(error);
    }
  },
};

const Adoptions = {
  getAdoptions: async () => {
    const { data } = await axios.get(`${URL}/adoptions`);
    return data;
  },
  getAdoptionById: async (adoptionId) => {
    const { data } = await axios.get(`${URL}/adoptions/${adoptionId}`);
    return data;
  },
  deleteAdoptionById: async (adoptionId) => {
    await axios.delete(`${URL}/adoptions/${adoptionId}`, authHeaders());
  },
  createAdoption: async (title, text, thumbnail, price, breed, age, gender) => {
    const body = { title, text, thumbnail, price, breed, age, gender };
    try {
      await axios.post(`${URL}/adoptions`, body, authHeaders());
    } catch (error) {
      console.error(error);
    }
  },
  updateAdoption: async (
    adoptionId,
    title,
    text,
    thumbnail,
    price,
    breed,
    age,
    gender
  ) => {
    const body = { title, text, thumbnail, price, breed, age, gender };
    try {
      await axios.put(`${URL}/adoptions/${adoptionId}`, body, authHeaders());
    } catch (error) {
      console.error(error);
    }
  },
};

export const Api = {
  ...User,
  ...Auth,
  ...Story,
  ...Article,
  ...HealthReports,
  ...MeetUps,
  ...Adoptions,
  isAuthenticated: () => !!localStorage.getItem("IdToken"),
};
