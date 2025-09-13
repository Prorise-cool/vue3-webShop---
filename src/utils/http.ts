// src/utils/http.ts
import axios from "axios";
import { useUserStore } from "@/stores/user";
import router from "@/router"; // 引入 router 实例
import { refreshTokenAPI } from "@/apis/user"; // 引入刷新 token 的 API
import type { UserInfo } from "@/types/user";

const httpInstance = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// axios请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.getAccessToken;
    if (token) {
      // 按照后端的要求，将 token 放入请求头
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (e) => Promise.reject(e),
);

// 防止重复刷新token的标识
let isRefreshing = false;

// axios响应式拦截器
httpInstance.interceptors.response.use(
  // 剥离了一层 data，后续直接拿到的就是响应 data
  (res) => res.data,
  async (error) => {
    // 检查是否是 401 未授权错误，且不是刷新token的请求，且没有重试过
    if (
      error.response?.status === 401 &&
      error.config.url !== "/token/refresh" &&
      !error.config._retry &&
      !isRefreshing
    ) {
      error.config._retry = true; // 标记已重试
      isRefreshing = true; // 标记正在刷新

      const userStore = useUserStore();
      const refreshToken = userStore.getRefreshToken;

      // 如果没有 refreshToken，说明用户从未登录或登录已彻底失效
      if (!refreshToken) {
        isRefreshing = false;
        userStore.clearUserInfo();
        router.push("/login");
        return Promise.reject(error);
      }

      try {
        // 尝试使用 refreshToken 获取新的 accessToken
        const refreshRes = await refreshTokenAPI(refreshToken);
        const newAccessToken = refreshRes.result.accessToken;

        // 更新 Pinia 中的 accessToken
        const currentUserInfo = userStore.userInfo as UserInfo;
        userStore.setUserInfo({
          ...currentUserInfo,
          accessToken: newAccessToken,
        });

        // 重试刚才失败的请求
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        isRefreshing = false; // 重置刷新标识
        return await httpInstance(error.config);
      } catch (refreshError) {
        // 如果刷新 token 也失败了，则清除所有用户信息并跳转到登录页
        isRefreshing = false; // 重置刷新标识
        userStore.clearUserInfo();
        router.push("/login");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default httpInstance;
