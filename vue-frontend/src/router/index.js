import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { articleRoutes } from "./articles";
import { storiesRoutes } from "./stories";
import { healthRoutes } from "./health-reports";
import { meetupRoutes } from "./meetups";
import { adoptionsRoutes } from "./adoptions";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...articleRoutes,
    ...storiesRoutes,
    ...healthRoutes,
    ...meetupRoutes,
    ...adoptionsRoutes,
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/health",
      name: "health",
      component: () => import("../views/health/HealthView.vue"),
    },
    {
      path: "/meetup",
      name: "meetup",
      component: () => import("../views/meetups/MeetUpView.vue"),
    },
    {
      path: "/adoption",
      name: "adoption",
      component: () => import("../views/adoptions/AdoptionView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/auth/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/auth/RegisterView.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/profile/ProfileView.vue"),
    },
  ],
});

export default router;
