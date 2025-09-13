// src/views/Category/composables/useBanner.ts
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { getCategoryBannerAPI } from "@/apis/category";

export function useBanner() {
  const route = useRoute();
  const categoryId = computed(() => route.params.id as string);

  const {
    data: bannerData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categoryBanner", categoryId],
    queryFn: ({ queryKey }) => {
      const id = queryKey[1] as string;
      return getCategoryBannerAPI(id);
    },
    select: (data) => data.result,
    enabled: computed(() => !!categoryId.value),
  });

  return {
    bannerData,
    isLoading,
    isError,
  };
}
