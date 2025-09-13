<script lang="ts" setup>
import { ref,watch } from 'vue'
import type { GoodsDetail } from '@/types/detail'
// 导入vueuse的鼠标相对位置
import { useMouseInElement } from '@vueuse/core'
// products数据
defineProps<{
  products: GoodsDetail
}>()


// 小图切换大图显示
const activeIndex = ref(0)

const ImgHanderler = (index: number) => {
  activeIndex.value = index
}

// 获取鼠标相对位置
const target = ref(null)
const { elementX, elementY, isOutside } = useMouseInElement(target)

// =====滑块与大图位置变量=========
const left = ref(0)
const top = ref(0)
const positionX = ref(0)
const positionY = ref(0)
const show = ref(false)  // 控制大图显示状态
// =====滑块与大图位置变量=========

// 计算放大系数
const scale = 2

watch(
  [elementX, elementY, isOutside],
  () => {
    if (isOutside.value) {
      show.value = false
      return
    }
    show.value = true

    // 计算目标位置，考虑边界情况
    let targetX = Math.min(Math.max(elementX.value - 100, 0), 200)
    let targetY = Math.min(Math.max(elementY.value - 100, 0), 200)

    // 设置滑块位置
    left.value = targetX
    top.value = targetY

    // 计算大图位置 - 根据滑块位置计算背景图的偏移
    positionX.value = -targetX * scale
    positionY.value = -targetY * scale
  }
)




</script>



<template>
  <div class="product-image">
    <!-- 左侧大图 -->
    <div ref="target" class="middle">
      <img draggable="false" :src="products.gallery[activeIndex]" alt="" />
      <!-- 蒙层小滑块 -->
      <div v-if="show" class="layer" :style="{ left: `${left}px`, top: `${top}px` }"></div>
    </div>

    <!-- 小图列表 -->
    <ul class="small">
      <li
v-for="(img, index) in products.gallery" :key="index" :class="{ active: activeIndex === index }"
        @mouseenter="ImgHanderler(index)">
        <img draggable="false" :src="img" :alt="products.name" />
      </li>
    </ul>
    <!-- 放大镜大图 -->
    <Transition name="preview">
      <div
v-if="show" class="large" :style="[{
        backgroundImage: `url(${products.gallery[activeIndex]})`,
        backgroundPositionX: `${positionX}px`,
        backgroundPositionY: `${positionY}px`,
      }]">
      </div>
    </Transition>

  </div>
</template>

<style scoped lang="scss">
.product-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    cursor: move;
  }

  .large {
    position: absolute;
    top: 0;
    left: 400px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
    border-radius: 8px;
    overflow: hidden;
    transform-origin: left center;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    left: 0;
    top: 0;
    position: absolute;
    transition: all 0.1s ease-out;
    pointer-events: none;
    border-radius: 4px;
    backdrop-filter: blur(2px);
  }

  .small {
    width: 80px;
    margin-left: 20px; // 增加间距

    li {
      width: 68px;
      height: 68px;
      margin-bottom: 15px;
      cursor: pointer;
      border: 1px solid #e8e8e8;
      padding: 1px;
      border-radius: 4px;
      overflow: hidden;
      transition: all 0.3s ease;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      &:hover,
      &.active {
        border: 2px solid $GLColor;
        padding: 0;
        transform: translateX(3px) scale(1.05);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);

        img {
          transform: scale(1.1);
        }
      }
    }
  }

  // 预览图动画
  .preview-enter-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: left center;
  }

  .preview-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: left center;
  }

  .preview-enter-from,
  .preview-leave-to {
    opacity: 0;
    transform: translateX(-80px) scale(0.6);
    filter: brightness(1.2) contrast(1.1);
  }

  .preview-enter-to,
  .preview-leave-from {
    opacity: 1;
    transform: translateX(0) scale(1);
    filter: brightness(1) contrast(1);
  }
}
</style>
