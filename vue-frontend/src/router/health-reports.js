export const healthRoutes = [
  {
    path: "/health-reports",
    name: "health-reports",
    component: () => import("../views/health/HealthView.vue"),
  },
  {
    path: "/health-reports/:id",
    name: "healthReportsDetail",
    component: () => import("../views/health/HealthDetailView.vue"),
  },
  {
    path: "/health-reports/:id/update",
    name: "healthReportsUpdate",
    component: () => import("../views/health/UpdateHealthView.vue"),
  },
  {
    path: "/health-reports/create",
    name: "healthReportsCreate",
    component: () => import("../views/health/CreateHealthView.vue"),
  },
];
