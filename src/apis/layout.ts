// src/apis/layout.ts
import httpInstance from "@/utils/http";
import type { CategoryItem } from "@/types/category";

// 定义接口返回数据的外层结构
interface ApiResponse {
  code: string;
  msg: string;
  result: CategoryItem[];
}

// 获取导航分类数据的 API
export const getCategoryAPI = (): Promise<ApiResponse> => {
  return httpInstance({
    url: "/categories",
  });
};
