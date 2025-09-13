// src/stores/user.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { loginApi } from "@/apis/user"; // 导入登录接口
import type { UserInfo, LoginForm } from "@/types/user";

export const useUserStore = defineStore(
  "user",
  () => {
    // 1. 定义 state - 统一使用 UserInfo
    const userInfo = ref<UserInfo | object>({});

    // 2. 定义 action - 获取用户信息 (登录)
    const getUserInfo = async (form: LoginForm) => {
      const res = await loginApi(form);
      userInfo.value = res.result;
    };

    // 3. 定义 action - 清除用户信息
    const clearUserInfo = () => {
      userInfo.value = {};
    };

    // 4. 统一设置用户信息的方法
    const setUserInfo = (data: UserInfo) => {
      userInfo.value = data;
    };

    // 5. 计算属性 - 检查是否已登录
    const isLoggedIn = computed(() => {
      const info = userInfo.value as UserInfo;
      return !!info.accessToken;
    });

    // 6. 获取访问令牌
    const getAccessToken = computed(() => {
      const info = userInfo.value as UserInfo;
      return info.accessToken || null;
    });

    // 7. 获取刷新令牌
    const getRefreshToken = computed(() => {
      const info = userInfo.value as UserInfo;
      return info.refreshToken || null;
    });

    return {
      userInfo,
      getUserInfo,
      clearUserInfo,
      setUserInfo,
      isLoggedIn,
      getAccessToken,
      getRefreshToken,
    };
  },
  {
    persist: true,
  },
);
