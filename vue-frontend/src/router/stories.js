export const storiesRoutes = [
  {
    path: "/stories",
    name: "stories",
    component: () => import("../views/stories/StoriesView.vue"),
  },
  {
    path: "/stories/create",
    name: "storiesCreate",
    component: () => import("../views/stories/CreateStoryView.vue"),
  },
  {
    path: "/stories/:id",
    name: "storyDetail",
    component: () => import("../views/stories/StoryDetailView.vue"),
  },
  {
    path: "/stories/:id/update",
    name: "storyUpdate",
    component: () => import("../views/stories/UpdateStoryView.vue"),
  },
];
