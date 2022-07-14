export const meetupRoutes = [
  {
    path: "/meetups",
    name: "meetups",
    component: () => import("../views/meetups/MeetUpView.vue"),
  },
  {
    path: "/meetups/:id",
    name: "meetupsDetail",
    component: () => import("../views/meetups/MeetUpDetailView.vue"),
  },
  {
    path: "/meetups/:id/update",
    name: "meetupsUpdate",
    component: () => import("../views/meetups/UpdateMeetUpView.vue"),
  },
  {
    path: "/meetups/create",
    name: "meetupsCreate",
    component: () => import("../views/meetups/CreateMeetUpView.vue"),
  },
];
