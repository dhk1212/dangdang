export const adoptionsRoutes = [
  {
    path: "/adoptions",
    name: "adoptions",
    component: () => import("../views/adoptions/AdoptionView.vue"),
  },
  {
    path: "/adoptions/:id",
    name: "adoptionsDetail",
    component: () => import("../views/adoptions/AdoptionDetailView.vue"),
  },
  {
    path: "/adoptions/:id/update",
    name: "adoptionsUpdate",
    component: () => import("../views/adoptions/UpdateAdoptionsView.vue"),
  },
  {
    path: "/adoptions/create",
    name: "adoptionsCreate",
    component: () => import("../views/adoptions/CreateAdoptionView.vue"),
  },
];
