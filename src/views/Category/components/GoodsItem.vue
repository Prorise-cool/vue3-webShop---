<script setup lang="ts">
import type { GoodsDetail } from "@/types/detail";

defineProps<{
  goods: GoodsDetail;
}>();
</script>

<template>
  <RouterLink :to="`/product/${goods.id}`" class="goods-item">
    <el-card class="goods-item__card" shadow="hover">
      <!-- 【核心】使用 Element Plus 的 ElImage 组件 -->
      <el-image
        :src="goods.cover"
        :alt="goods.name"
        lazy
        class="goods-item__image"
      >
        <!-- #placeholder 插槽：自定义加载时的占位内容 -->
        <template #placeholder>
          <div class="image-slot">加载中<span class="dot">...</span></div>
        </template>
        <!-- #error 插槽：自定义加载失败时的内容 -->
        <template #error>
          <div class="image-slot">
            <el-icon>
              <Picture />
            </el-icon>
          </div>
        </template>
      </el-image>

      <div class="goods-item__info">
        <p class="goods-item__name ellipsis">{{ goods.name }}</p>
        <p class="goods-item__desc ellipsis">{{ goods.desc }}</p>
      </div>
    </el-card>
  </RouterLink>
</template>

<style lang="scss" scoped>
.goods-item {
  display: block;
  flex: 1;
  min-width: 200px;
  max-width: 250px;
  text-align: center;
  text-decoration: none;
  transition: all 0.5s;

  &__card {
    --el-card-padding: 15px;
  }

  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  }

  &__image {
    width: 160px;
    height: 160px;
  }

  &__info {
    padding-top: 10px;
  }

  &__name {
    font-size: 16px;
    color: #333;
  }

  &__desc {
    color: #999;
    height: 29px;
  }

  &__price {
    color: $priceColor;
    font-size: 20px;
  }
}

// 通用工具类，用于单行文本溢出显示省略号
.ellipsis {
  @include truncate-text;
}

// ElImage 组件插槽的统一样式
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  color: #909399;
  font-size: 14px;
}
</style>
