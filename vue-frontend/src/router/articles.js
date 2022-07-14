export const articleRoutes = [
  {
    path: "/articles",
    name: "articles",
    component: () => import("../views/articles/ArticlesView.vue"),
  },
  {
    path: "/articles/:id",
    name: "articlesDetail",
    component: () => import("../views/articles/ArticleDetailView.vue"),
  },
  {
    path: "/articles/:id/update",
    name: "articlesUpdate",
    component: () => import("../views/articles/UpdateArticleView.vue"),
  },
  {
    path: "/articles/create",
    name: "articlesCreate",
    component: () => import("../views/articles/CreateArticleView.vue"),
  },
];
