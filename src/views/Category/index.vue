<script setup lang="ts">
// 1. 引入我们的组合式函数
import { useCategory } from "./composables/useCategory";
import { useBanner } from "./composables/useBanner";
// 后续将引入商品组件
import GoodsItem from "./components/GoodsItem.vue"; // 假设已创建

// 2. 调用函数，获取所有需要的数据和状态
const { categoryData } = useCategory();
const { bannerData, isLoading: isBannerLoading } = useBanner();
</script>

<template>
  <div class="category-page">
    <div class="container">
      <!-- 1. 面包屑导航 -->
      <el-breadcrumb
        v-if="categoryData"
        class="category-page__breadcrumb"
        separator=">"
      >
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 2. Banner 轮播图 -->
      <el-skeleton :loading="isBannerLoading" animated>
        <template #template>
          <el-skeleton-item
            variant="image"
            class="category-page__banner-skeleton"
          />
        </template>
        <template #default>
          <el-carousel
            class="category-page__banner"
            height="500px"
            :arrow="'never'"
          >
            <el-carousel-item v-for="item in bannerData" :key="item.id">
              <img :src="item.imgUrl" :alt="item.id" />
            </el-carousel-item>
          </el-carousel>
        </template>
      </el-skeleton>

      <!-- 3. 子分类与商品列表 -->
      <div v-if="categoryData" class="category-page__content">
        <div class="category-page__sub-title">
          <h3>全部分类</h3>
        </div>

        <!-- 4. 按子分类展示商品 -->
        <div
          v-for="sub in categoryData.subCategories"
          :key="sub.id"
          class="category-page__goods-section"
        >
          <div class="goods-section__header">
            <h3>- {{ sub.name }} -</h3>
          </div>
          <div class="goods-section__body">
            <!-- 这里我们将使用一个可复用的 GoodsItem 组件 -->
            <GoodsItem
              v-for="product in sub.products"
              :key="product.id"
              :goods="product"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.category-page {
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;

  .container {
    width: 100%;
    margin: 0;
    padding: 0;
    position: relative;
  }

  &__breadcrumb {
    margin: 20px;
    margin-bottom: 20px;
  }

  &__banner-skeleton {
    width: 100%;
    height: 500px;
  }

  &__banner {
    width: 100%;
    height: 500px;
    z-index: 98; // 确保在某些布局下层级正确

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    margin-top: 20px;
    background-color: #fff;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
  }

  &__sub-title {
    h3 {
      font-size: 28px;
      color: #666;
      font-weight: normal;
      text-align: center;
      line-height: 100px;
    }
  }

  &__item-img {
    width: 100px;
    height: 100px;
  }

  &__item-name {
    line-height: 1.5;
    color: #666;
  }
}

.goods-section {
  &__header {
    padding: 40px 0;

    h3 {
      font-size: 28px;
      color: #666;
      font-weight: normal;
      text-align: center;
      line-height: 1.2;
    }
  }

  &__body {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: flex-start;
    width: 100%;
  }
}
</style>
