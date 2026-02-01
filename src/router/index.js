import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/auth/login",
    name: "login",
    component: () => import("../views/auth/LoginPage.vue"),
    meta: {
      title: "Login",
      group: "auth",
      layout: "auth",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isSuperAdmin = user?.email === "info@stree.agency";

  if (isAuthenticated) {
    if (to.meta.requiresSuperAdmin) {
      if (isSuperAdmin) {
        next();
      } else {
        next({ name: "dashboard" });
      }
    } else if (
      isSuperAdmin &&
      to.meta.group &&
      to.meta.group !== "super-admin" &&
      to.meta.group !== "dashboard" &&
      to.meta.group !== "settings"
    ) {
      next({ name: "manage-tenants" });
    } else {
      next();
    }
  } else {
    if (to.meta.layout === "main-layout") {
      next({ name: "login" });
    } else {
      next();
    }
  }
});

export default router;
