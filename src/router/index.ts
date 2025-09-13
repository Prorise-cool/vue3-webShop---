// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/views/Layout/index.vue";
import Login from "@/views/Login/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "", // 默认二级路由
          component: () => import("@/views/Home/index.vue"),
        },
        {
          path: "category/:id", // 使用 path parameter 接收 id
          component: () => import("@/views/Category/index.vue"),
        },
        {
          path: "product/:id", // 使用 path parameter 接收 id
          component: () => import("@/views/Detail/index.vue"),
        },
        {
          path: "/cart",
          component: () => import("@/views/Cart/index.vue"),
        },
      ],
    },
    {
      path: "/login",
      component: Login,
    },
  ],
});

export default router;
