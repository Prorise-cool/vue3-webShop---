<script setup lang="ts">
defineProps<{
  title: string;
  slogan: string;
}>();
</script>

<template>
  <!-- 顶部宣传标语区域 -->
  <div class="header">
    <h2 class="title">{{ title }}</h2>
    <p class="slogan">{{ slogan }}</p>
  </div>
</template>

<style lang="scss" scoped>
.header {
  text-align: center;
  margin-bottom: 40px;
}

.title {
  font-size: 48px;
  font-weight: 600;
  color: #111;
  line-height: 67px;
  margin-bottom: 10px;
}

.slogan {
  font-size: 32px;
  font-weight: 400;
  color: #666;
  line-height: 45px;
  margin: 0;
}
</style>
