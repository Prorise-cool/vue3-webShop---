<script setup lang="ts">
import { Product } from "@/types/category";
import ProductCard from "@/components/ProductCard.vue";

interface Props {
  products: Product[];
  showMask?: boolean;
  showInfo?: boolean;
}

interface Emits {
  (e: "product-click", product: Product): void;
  (e: "product-hover", product: Product): void;
  (e: "product-button-click", product: Product): void;
}

const props = withDefaults(defineProps<Props>(), {
  showMask: true,
  showInfo: true,
});

const emit = defineEmits<Emits>();

const handleProductClick = (product: Product) => {
  emit("product-click", product);
};

const handleProductHover = (product: Product) => {
  emit("product-hover", product);
};

const handleProductButtonClick = (product: Product) => {
  emit("product-button-click", product);
};
</script>

<template>
  <div class="hot-product-content">
    <div class="hot-product__grid">
      <div
        v-for="(product, index) in products"
        :key="product.id"
        :class="[
          'hot-product__item',
          `hot-product__item--${product.type}`,
          `hot-product__item--${index + 1}`,
        ]"
      >
        <!-- 使用全局 ProductCard 组件 -->
        <ProductCard
          :product="product"
          :index="index"
          :show-mask="props.showMask"
          :show-info="props.showInfo"
          @click="handleProductClick"
          @hover="handleProductHover"
          @button-click="handleProductButtonClick"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 产品网格布局
.hot-product__grid {
  display: grid;
  grid-template-columns: repeat(4, 283px);
  grid-template-rows: repeat(2, 283px);
  gap: 10px;
  padding: 3px;
  justify-content: center;
}

.hot-product__item {
  position: relative;
  overflow: hidden;

  // 大型项目（左上角）
  &--large {
    grid-row: span 2;
  }

  // 普通项目（顶部中间、右侧）
  &--normal {
    grid-row: span 1;
  }

  // 高项目（右侧，跨2行）
  &--tall {
    grid-row: span 2;
  }

  // 宽项目（底部，跨2列）
  &--wide {
    grid-column: span 2;
    width: 576px;
  }

  // 特定位置
  &--1 {
    // 大型项目
    grid-column: 1;
    grid-row: 1 / 3;
    width: 283px;
    height: 576px;
  }

  &--2 {
    // 普通项目1
    grid-column: 2;
    grid-row: 1;
    width: 283px;
    height: 283px;
  }

  &--3 {
    // 普通项目2
    grid-column: 3;
    grid-row: 1;
    width: 283px;
    height: 283px;
  }

  &--4 {
    // 宽项目
    grid-column: 2 / 4;
    grid-row: 2;
    width: 576px;
    height: 283px;
  }

  &--5 {
    // 高项目
    grid-column: 4;
    grid-row: 1 / 3;
    width: 283px;
    height: 576px;
  }
}
</style>
