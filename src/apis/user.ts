// src/apis/user.ts
import httpInstance from "@/utils/http";
import type { LoginForm, UserInfo } from "@/types/user";

// 登录接口
// 返回包含用户信息和双Token的完整数据
export const loginApi = (data: LoginForm): Promise<{ result: UserInfo }> => {
  return httpInstance({
    url: "/login",
    method: "POST",
    data,
  });
};
/**
 * 刷新 Access Token 的 API
 * @param refreshToken - 刷新令牌
 * @returns Promise<{ result: { accessToken: string } }>
 */
export const refreshTokenAPI = (
  refreshToken: string,
): Promise<{ result: { accessToken: string; refreshToken: string } }> => {
  return httpInstance({
    method: "POST",
    url: "/token/refresh",
    data: {
      refreshToken,
    },
  });
};
