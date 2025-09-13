<script setup lang="ts">
import { Product } from "@/types/category";

interface Props {
  product: Product;
  index: number;
  showMask?: boolean;
  showInfo?: boolean;
}

interface Emits {
  (e: "click", product: Product): void;
  (e: "hover", product: Product): void;
  (e: "button-click", product: Product): void;
}

const props = withDefaults(defineProps<Props>(), {
  showMask: true,
  showInfo: true,
});

const emit = defineEmits<Emits>();

const handleClick = () => {
  emit("click", props.product);
};

const handleHover = () => {
  emit("hover", props.product);
};

const handleButtonClick = (event: Event) => {
  event.stopPropagation(); // 阻止事件冒泡
  emit("button-click", props.product);
};
</script>

<template>
  <!-- 产品卡片内容 -->
  <div class="product-card" @click="handleClick" @mouseenter="handleHover">
    <div class="product-card__image-wrapper">
      <img
        :src="product.picture"
        :alt="product.name"
        class="product-card__image"
      />

      <!-- 悬停遮罩 -->
      <div
        v-if="showMask"
        class="product-card__mask"
        :class="{ 'product-card__mask--no-text': index === 0 }"
      >
        <!-- 根据网页设计，第一页不需要悬停 -->
        <h3 v-if="index !== 0" class="product-card__mask-title">
          {{ product.name }}
          <span class="product-card__mask-desc">{{ product.desc }}</span>
        </h3>
        <button class="product-card__btn" @click="handleButtonClick">
          了解更多
        </button>
      </div>
    </div>

    <!-- 产品信息 -->
    <!-- 根据设计，第一页也不需要显示产品信息 -->
    <div v-if="showInfo && index !== 0" class="product-card__info">
      <h3 class="product-card__name">
        {{ product.name }}
        <span class="product-card__desc">{{ product.desc }}</span>
      </h3>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.product-card {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
}

.product-card__image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.product-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.5s ease;
}

.product-card__mask {
  @include product-mask;

  // 第一个产品的特殊遮罩样式（无文字）
  &--no-text {
    justify-content: flex-end;
    padding-bottom: 40px;

    .product-card__btn {
      transform: translateY(0);
      opacity: 0;
    }
  }
}

.product-card__mask-title {
  @include product-text-style(#fff);
  margin: 0 0 20px 0;
  transform: translateY(-100px);
  transition: all 0.2s ease-in-out;
}

.product-card__mask-desc {
  display: block;
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  line-height: 20px;
  margin-top: 8px;
}

.product-card__btn {
  padding: 0 20px;
  height: 36px;
  line-height: 36px;
  color: #fff;
  font-size: 14px;
  border: 1px solid #fff;
  border-radius: 36px;
  background: transparent;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s ease-in-out;
  transition-delay: 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
}

.product-card__info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  transition: opacity 0.2s ease-in-out;
}

.product-card__name {
  @include product-text-style(#111);
  margin: 0;
}

.product-card__desc {
  display: block;
  font-size: 14px;
  font-weight: 400;
  color: #111;
  line-height: 20px;
  margin-top: 8px;
}

// 悬停效果
.product-card:hover {
  .product-card__image {
    transform: scale(1.1);
  }

  .product-card__mask {
    opacity: 1;
  }

  .product-card__mask-title,
  .product-card__btn {
    opacity: 1;
    transform: translateY(0);
  }

  .product-card__info {
    opacity: 0;
  }
}
</style>
