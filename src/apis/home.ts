// src/apis/home.ts
import httpInstance from "@/utils/http";
import type { BannerItem } from "@/types/home";

export const getBannerApi = (): Promise<{ result: BannerItem[] }> => {
  return httpInstance({
    url: "/home/banner",
  });
};
