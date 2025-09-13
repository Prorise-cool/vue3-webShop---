// src/views/Detail/composables/useGoods.ts
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { getDetailAPI } from '@/apis/detail'

export function useGoods() {
  const route = useRoute();
  const goodsId = computed(() => route.params.id as string);

  const {
    data: goodsDetail,
    isLoading,
    isError
  } = useQuery({
    // queryKey 格式: ['业务模块', 响应式参数]
    queryKey: ['goodsDetail', goodsId],

    queryFn: ({ queryKey }) => {
      // 从 queryKey 中解构出 ID
      const id = queryKey[1] as string;
      return getDetailAPI(id);
    },

    // 只有在 goodsId.value 存在时，才执行查询
    enabled: computed(() => !!goodsId.value)
  });

  return {
    goodsDetail,
    isLoading,
    isError,
  };
}
