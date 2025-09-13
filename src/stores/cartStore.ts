// src/stores/cartStore.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { CartItem } from "@/types/cart";
import { useUserStore } from "./user";

export const useCartStore = defineStore("cart", () => {
  const userStore = useUserStore();
  // Pinia store 中 state 的最佳实践是使用 ref
  const userInfo = computed(
    () => userStore.userInfo as { accessToken?: string }
  );

  // State: 购物车列表
  const cartList = ref<CartItem[]>([]);

  // Action: 添加商品到购物车
  const addCart = (goods: CartItem) => {
    if (userInfo.value.accessToken) {
      const existingItem = cartList.value.find(
        (item: CartItem) => item.id === goods.id
      );
      if (existingItem) {
        existingItem.count += goods.count;
      } else {
        cartList.value.push(goods);
      }
      ElMessage.success("添加成功");
    } else {
      ElMessage.warning("请先登录");
    }
  };

  // Action: 从购物车删除商品
  const delCart = (id: string) => {
    const index = cartList.value.findIndex((item: CartItem) => item.id === id);
    if (index > -1) {
      cartList.value.splice(index, 1);
      ElMessage.info("商品已删除");
    }
  };

  // Action: 更新单个商品的选中状态
  const updateCartSelected = (id: string, selected: boolean) => {
    const item = cartList.value.find((item: CartItem) => item.id === id);
    if (item) {
      item.selected = selected;
    }
  };

  // Action: 更新所有商品的选中状态
  const updateAllCart = (selected: boolean) => {
    cartList.value.forEach((item: CartItem) => (item.selected = selected));
  };

  // Action: 清空购物车
  const clearCart = () => {
    cartList.value = [];
  };

  // Getter: 是否全选
  const isAllSelected = computed(
    () =>
      cartList.value.length > 0 &&
      cartList.value.every((item: CartItem) => item.selected)
  );

  // Getter: 商品总数
  const totalCount = computed(() =>
    cartList.value.reduce((sum: number, item: CartItem) => sum + item.count, 0)
  );

  // Getter: 商品总价
  const totalPrice = computed(() =>
    cartList.value.reduce(
      (sum: number, item: CartItem) => sum + item.count * Number(item.price),
      0
    )
  );

  // Getter: 已选商品数量
  const selectedCount = computed(() =>
    cartList.value
      .filter((item: CartItem) => item.selected)
      .reduce((sum: number, item: CartItem) => sum + item.count, 0)
  );

  // Getter: 已选商品总价
  const selectedPrice = computed(() =>
    cartList.value
      .filter((item: CartItem) => item.selected)
      .reduce(
        (sum: number, item: CartItem) => sum + item.count * Number(item.price),
        0
      )
  );

  return {
    cartList,
    addCart,
    delCart,
    updateCartSelected,
    updateAllCart,
    clearCart,
    isAllSelected,
    totalCount,
    totalPrice,
    selectedCount,
    selectedPrice,
  };
});
