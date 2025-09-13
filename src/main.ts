// src/main.ts

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // 导入路由
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";
import ElementPlus from "element-plus";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; // 1. 导入插件
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "@/styles/main.scss"; // 导入全局样式

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); // 2. 注册插件
app.use(pinia);
app.use(router); // 注册路由
app.use(VueQueryPlugin); // 注册 TanStack Query

app.use(ElementPlus, {
  locale: zhCn,
});

app.mount("#app");
