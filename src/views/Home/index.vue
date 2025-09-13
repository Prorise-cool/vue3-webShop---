<script setup lang="ts">
import HomeBanner from "./components/HomeBanner.vue";
import HomeHotProduct from "./components/HomeHotProduct.vue"; // 1. 导入
</script>

<template>
  <div class="container">
    <HomeBanner />
  </div>

  <HomeHotProduct />
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: none;
}
</style>
