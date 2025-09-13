// src/apis/detail.ts
import httpInstance from "@/utils/http";
import type { GoodsDetail } from "@/types/detail";

/**
 * @description: 获取商品详情
 * @param {String} id - 商品ID
 */
export const getDetailAPI = (id: string): Promise<GoodsDetail> => {
  // 直接请求由 json-server 自动生成的 RESTful 接口
  // 我们的 httpInstance 响应拦截器会自动剥离 .data
  return httpInstance.get(`/products/${id}`);
};
