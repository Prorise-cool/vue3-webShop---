// src/types/cart.ts

/**
 * 购物车商品项的类型接口
 */
export interface CartItem {
  id: string; // 商品ID，作为唯一标识
  name: string; // 商品名称
  picture: string; // 商品图片
  price: string; // 商品单价
  count: number; // 商品数量
  selected: boolean; // 商品是否被选中
  attrsText?: string; // 商品选择的规格文本 (可选)
}
