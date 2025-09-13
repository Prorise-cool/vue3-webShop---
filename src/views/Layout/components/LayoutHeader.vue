<script setup lang="ts">
import LayoutCart from "./LayoutCart.vue";
import { useScroll } from "@vueuse/core";
import { useCategoryStore } from "@/stores/categoryStore"; // 1. 导入 categoryStore
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

// 2. 获取 categoryStore 实例
const categoryStore = useCategoryStore();

// 3.解构出Store中的List数据
const { categoryList } = storeToRefs(categoryStore);
console.log(categoryList);
// 4.. 在组件挂载时，触发 action 获取数据
onMounted(() => {
  categoryStore.getCategory();
});
const { y } = useScroll(window);
</script>

<template>
  <header :class="{ 'app-header': true, 'app-header-sticky': y > 100 }">
    <div class="container">
      <!-- 左边logo -->
      <div class="app-header__logo">
        <RouterLink to="/">
          <img
            src="@/assets/images/logo.png"
            alt="格力专卖店"
            class="app-header__logo-img"
          />
        </RouterLink>
      </div>

      <!-- 中间导航 -->
      <ul class="app-header__nav">
        <li
          v-for="item in categoryList"
          :key="item.id"
          class="app-header__nav-item"
        >
          <!-- 使用模板字符串拼接出正确的路由地址 -->
          <RouterLink :to="`/category/${item.id}`" class="app-header__nav-link">
            {{ item.name }}
          </RouterLink>
        </li>
      </ul>

      <!-- 右边功能区 -->
      <div class="app-header__actions">
        <!-- 搜索 -->
        <div class="app-header__search">
          <i-ep-search />
          <button class="app-header__search-btn">查询</button>
        </div>

        <!-- 购物车 -->
        <LayoutCart />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  background: #fff;
  height: 70px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.1);

  .container {
    @include flex-center;
    margin-left: 40px;
    margin-right: 40px;
    justify-content: space-between;
    height: 70px;
    max-width: calc(100vw - 80px);
  }
}

.app-header-sticky {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  @extend %slide-down-animation;
}

.app-header__logo {
  width: 160px;
  flex-shrink: 0;

  a {
    display: block;
    height: 40px;
    width: 100%;
  }

  &-img {
    height: 40px;
    width: auto;
    max-width: 100%;
    object-fit: contain;
  }
}

.app-header__nav {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  z-index: 998;
  flex: 1;
  padding-left: 40px;
  overflow: hidden;

  &-item {
    margin-right: 0;
    position: relative;
    flex-shrink: 0;

    // 使用border添加竖杠装饰，除了最后一个
    &:not(:last-child) {
      border-right: 1px solid $borderColor;
      margin-right: 32px;
      padding-right: 32px;
    }
  }

  &-link {
    font-size: 1.6rem;
    line-height: 3.2rem;
    height: 3.2rem;
    padding: 0.8rem 1.2rem;
    display: inline-block;
    color: $textColor-secondary;
    text-decoration: none;
    transition: all $transition-duration ease;
    @include truncate-text;
    position: relative;
    white-space: nowrap;

    &:hover {
      color: $GLColor;
      background-color: $bgColor;
    }

    // 活跃状态
    &.router-link-exact-active {
      color: $GLColor;
      font-weight: 500;
    }
  }
}

.app-header__actions {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}

.app-header__search {
  &-btn {
    font-size: 1.6rem;
    color: $textColor-secondary;
    background: none;
    border: none;
    padding: 0.8rem 1.2rem;
    cursor: pointer;
    transition: color $transition-duration ease;

    &:hover {
      color: $GLColor;
    }
  }
}
</style>
