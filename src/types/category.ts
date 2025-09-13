// src/types/category.ts

// 产品信息接口
export interface Product {
  id: string;
  name: string;
  desc: string;
  coverImage: string; // 封面图片
  detailImages: string[]; // 详情图片数组
  tip?: string; // 产品提示信息
  [key: string]: unknown; // 允许其他动态属性
}

// 子分类接口
export interface SubCategory {
  id: string;
  name: string;
  products: Product[]; // 该子分类下的产品列表
}

// 一级分类项
export interface CategoryItem {
  id: string;
  name: string;
  icon?: string;
  banners?: BannerItem[]; // 分类专属的轮播图
  subCategories?: SubCategory[]; // 子分类列表
  products?: Product[]; // 兼容原始数据结构中的直接产品列表
}

// Banner 项
export interface BannerItem {
  id: string;
  imgUrl: string;
  hrefUrl: string;
  type?: string; // 根据 mock 数据，这个字段可能存在
}
