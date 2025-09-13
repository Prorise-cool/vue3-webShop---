// src/stores/categoryStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { getCategoryAPI } from "@/apis/layout";
import type { CategoryItem } from "@/types/category";

export const useCategoryStore = defineStore("category", () => {
  const categoryList = ref<CategoryItem[]>([]);

  const getCategory = async () => {
    const res = await getCategoryAPI();
    categoryList.value = res.result;
  };

  return {
    categoryList,
    getCategory,
  };
});
