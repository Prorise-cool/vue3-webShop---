// src/types/user.ts

// 定义用户信息的类型接口
export interface UserInfo {
  id: string;
  account: string;
  password?: string; // 登录后不返回密码
  accessToken: string; // 统一使用 accessToken
  refreshToken: string; // 添加刷新令牌
  avatar: string;
  nickname: string;
  mobile: string;
  gender: string;
  birthday: string;
  cityCode: string;
  provinceCode: string;
  profession: string;
}

// 定义登录表单的类型接口
export interface LoginForm {
  account: string;
  password: string;
}
