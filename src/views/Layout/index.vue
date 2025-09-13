<script setup lang="ts">
import LayoutNav from "./components/LayoutNav.vue";
import LayoutHeader from "./components/LayoutHeader.vue";
import LayoutFooter from "./components/LayoutFooter.vue";
</script>

<template>
  <!-- 顶层盒 -->
  <el-container>
    <!-- 头部区域 - 包含nav和header，覆盖在banner上 -->
    <el-header class="header-overlay">
      <LayoutNav />
      <LayoutHeader />
    </el-header>

    <!-- 内容区域 -->
    <el-main>
      <RouterView />
    </el-main>

    <!-- 底部区域 -->
    <el-footer>
      <LayoutFooter />
    </el-footer>
  </el-container>
</template>

<style lang="scss" scoped>
// 为 el-main 设置最小高度，确保页脚在内容不足时也能置底
.el-main {
  min-height: calc(100vh - 281px); // 281px 是页头和页脚的大致总高度
}

// 移除 el-header 和 el-footer 的默认 padding
.el-header,
.el-footer {
  padding: 0;
  height: auto;
}
</style>
