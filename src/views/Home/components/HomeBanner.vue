<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { getBannerApi } from "@/apis/home";

const { data: bannerList, isLoading } = useQuery({
  // queryKey: 唯一的查询键，用于缓存和识别
  // 当 key 变化时，TanStack Query 会重新执行查询
  queryKey: ["homeBanner"],

  // queryFn: 一个返回 Promise 的查询函数
  queryFn: async () => {
    const res = await getBannerApi();
    return res.result;
  },
});
</script>

<template>
  <div class="home-banner">
    <el-skeleton
      style="width: 100%; height: 500px"
      :loading="isLoading"
      animated
    >
      <!-- 骨架屏内部使用#template用于渲染占位内容 -->
      <template #template>
        <el-skeleton-item variant="image" style="width: 100%; height: 100%" />
      </template>

      <!-- 骨架屏内部使用#default用于渲染实际内容 -->
      <template #default>
        <el-carousel height="500px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img :src="item.imgUrl" :alt="item.id" />
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-skeleton>
  </div>
</template>

<style scoped lang="scss">
.home-banner {
  // 占满整个屏幕宽度，跳出父容器限制
  width: 100%;
  max-width: none;
  height: 500px;
  margin: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; // 确保图片完全填充容器，保持比例
    object-position: center; // 居中显示
    display: block; // 消除图片底部的默认间距
  }
}
</style>
