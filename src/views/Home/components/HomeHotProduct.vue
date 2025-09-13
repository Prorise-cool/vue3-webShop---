<script setup lang="ts">
import { ref, computed } from "vue";
import type { Product } from "@/types/category";
import HotProductHeader from "./components/HotProductHeader.vue";
import HotProductContent from "./components/HotProductContent.vue";
// 1. 引入 TanStack Query 和 API
import { useQuery } from "@tanstack/vue-query";
import { getCategoryAPI } from "@/apis/layout";

const activeTab = ref("new");

// 2. 使用 useQuery 获取数据
const { data: categories } = useQuery({
  queryKey: ["categories"],
  queryFn: getCategoryAPI,
  select: (data) => data.result, // 关键：通过 select 转换，直接获取 result 数组
});

// 计算属性现在依赖于 useQuery 返回的数据
const activeProducts = computed(() => {
  // 当 categories.value 存在时才进行查找
  return (
    categories.value?.find((cat) => cat.id === activeTab.value)?.products || []
  );
});

// 事件处理函数
const handleProductClick = (product: Product) => {
  console.log("点击产品:", product);
  // 这里可以跳转到产品详情页
};

const handleProductHover = (product: Product) => {
  console.log("悬停产品:", product);
  // 这里可以做预加载等操作
};

const handleProductButtonClick = (product: Product) => {
  console.log("点击了解更多按钮:", product);
  // 这里可以打开产品详情弹窗或跳转
};
</script>

<template>
  <div class="hot-product">
    <div class="container">
      <HotProductHeader title="热销产品" slogan="核心科技 品质精选" />

      <!-- 分类标签区域 -->
      <div class="hot-product__category">
        <el-tabs
          v-model="activeTab"
          class="hot-product__tabs"
          tab-position="top"
        >
          <el-tab-pane
            v-for="category in categories"
            :key="category.id"
            :label="category.name"
            :name="category.id"
          >
            <!-- 自定义标签 -->
            <template #label>
              <div class="hot-product__tab-label">
                <div class="hot-product__tab-icon">
                  <img :src="category.icon" :alt="category.name" />
                </div>
                <span class="hot-product__tab-text">{{ category.name }}</span>
              </div>
            </template>

            <!-- 产品 -->
            <HotProductContent
              :products="activeProducts"
              @product-click="handleProductClick"
              @product-hover="handleProductHover"
              @product-button-click="handleProductButtonClick"
            />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hot-product {
  padding: 32px 0;
  background: #fff;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  &__category {
    margin-top: 40px;
  }

  // Element Plus Tabs 样式覆盖
  &__tabs {
    :deep(.el-tabs__header) {
      margin-bottom: 40px;
    }

    :deep(.el-tabs__nav-wrap) {
      &::after {
        display: none;
      }
    }

    :deep(.el-tabs__nav) {
      display: flex;
      width: 100%;
      border-bottom: 1px solid $borderColor;
    }

    :deep(.el-tabs__active-bar) {
      display: none;
    }

    :deep(.el-tabs__item) {
      flex: 1;
      height: 130px;
      padding: 0;
      position: relative;

      &.is-active,
      &:hover {
        &::after {
          content: "";
          position: absolute;
          bottom: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 2px;
          background: $GLColor;
        }

        .hot-product__tab-text {
          font-weight: 600;
          color: #111;
        }
      }
    }
  }

  &__tab-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  &__tab-icon {
    width: 64px;
    height: 64px;
    margin-bottom: 18px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__tab-text {
    font-size: 18px;
    font-weight: 400;
    color: #333;
    line-height: 27px;
  }
}
</style>
