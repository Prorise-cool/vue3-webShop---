// src/views/Category/composables/useCategory.ts
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { getCategoryItemAPI } from "@/apis/category";

export function useCategory() {
  const route = useRoute();
  // 使用 computed 确保 categoryId 是响应式的
  const categoryId = computed(() => route.params.id as string);

  // 使用 TanStack Query 来获取数据
  const {
    data: categoryData,
    isLoading,
    isError,
  } = useQuery({
    // queryKey 必须是一个数组，并且包含响应式的数据源
    // 当 categoryId.value 变化时，TanStack Query 会自动重新执行查询
    queryKey: ["categoryItem", categoryId],

    // queryFn 接收一个包含 queryKey 的上下文对象
    queryFn: ({ queryKey }) => {
      // queryKey[1] 就是 categoryId.value
      const id = queryKey[1] as string;
      return getCategoryItemAPI(id);
    },

    // enabled 选项用于控制查询是否执行
    // 只有当 categoryId.value 存在 (truthy) 时，查询才会触发
    enabled: computed(() => !!categoryId.value),

    // TanStack Query 默认不返回 { result: ... } 结构
    // 我们在这里保持 API 的原始返回，因为拦截器已处理了 .data
    // 如果需要转换，可以使用 `select` 选项
  });

  return {
    categoryData,
    isLoading,
    isError,
  };
}
