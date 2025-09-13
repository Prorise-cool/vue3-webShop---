<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore' // 1. 引入 cartStore

const cartStore = useCartStore() // 2. 获取实例
</script>

<template>
  <div class="app-header__cart">
    <router-link to="/cart">
      <i-ep-shopping-cart />
      <em>{{ cartStore.totalCount }}</em>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.app-header__cart {
  margin-left: 10px;

  a {
    position: relative;
    display: block;
    font-size: 22px;
    color: #666;

    em {
      position: absolute;
      top: -5px;
      right: -12px;
      height: 16px;
      line-height: 1;
      min-width: 16px;
      text-align: center;
      border-radius: 8px;
      background: $priceColor;
      color: #fff;
      font-size: 12px;
      font-style: normal;
      padding: 2px 4px;
    }
  }
}
</style>
