// src/types/detail.ts

// 商品详情数据类型
// 根据实际数据结构定义接口
export interface GoodsDetail {
  /** 商品唯一标识符 */
  id: string;
  /** 商品名称 */
  name: string;
  /** 商品描述 */
  desc: string;
  /** 分类ID */
  categoryId: string;
  /** 分类名称 */
  categoryName: string;
  /** 商品封面图片路径 */
  cover: string;
  /** 商品图片画廊数组 */
  gallery: string[];
  /** 商品详情图片数组 */
  details: string[];
  /** 商品价格 */
  price: string;
  /** 商品原价 */
  originalPrice: string;
  /** 销量 */
  sales: number;
  /** 评分 */
  rating: number;
  /** 库存数量 */
  stock: number;
  /** 商品链接 */
  url: string;
}
