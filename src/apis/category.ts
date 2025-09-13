// src/apis/category.ts
import httpInstance from "@/utils/http";
import type { CategoryItem, BannerItem } from "@/types/category";

/**
 * @description: 获取单个顶级分类数据 (包含子分类和轮播图)
 * @param {String} id - 顶级分类ID
 * @return {Promise<CategoryItem>}
 */
export const getCategoryItemAPI = async (id: string): Promise<CategoryItem> => {
  // 通过 json-server 获取包含 banners 和 subCategories 的完整分类数据
  // httpInstance 响应拦截器会自动处理响应数据
  return (await httpInstance.get(`/categories/${id}`)) as CategoryItem;
};

/**
 * @description: 获取分类页 Banner (为了简便使用，不在代码中进行提取，所以单独提供一个接口，现在 banners 包含在分类数据中)
 * @param {String} id - 顶级分类ID
 * @return {Promise<{ result: BannerItem[] }>}
 */
export const getCategoryBannerAPI = async (
  id: string,
): Promise<{ result: BannerItem[] }> => {
  return (await httpInstance.get(`/category/${id}/banners`)) as {
    result: BannerItem[];
  };
};
