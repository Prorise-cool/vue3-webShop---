<script setup lang="ts">
const footerLinks = [
  { text: "关于我们", href: "#" },
  { text: "帮助中心", href: "#" },
  { text: "售后服务", href: "#" },
  { text: "配送与验收", href: "#" },
  { text: "商务合作", href: "#" },
  { text: "搜索推荐", href: "#" },
  { text: "友情链接", href: "#" },
];
</script>

<template>
  <div class="app-footer">
    <div class="app-footer__content">
      <p class="app-footer__links">
        <a
          v-for="(link, index) in footerLinks"
          :key="index"
          :href="link.href"
          class="app-footer__link"
        >
          {{ link.text }}
        </a>
      </p>
      <p>CopyRight © 格力商城</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-footer {
  background-color: #333;

  .app-footer__content {
    height: 170px;
    padding-top: 40px;
    text-align: center;
    color: #999;
    font-size: 15px;

    .app-footer__links {
      margin-bottom: 20px;
    }

    .app-footer__link {
      color: #999;
      padding: 0 10px;
      text-decoration: none;

      &:not(:first-child) {
        border-left: 1px solid #999;
      }
    }
  }
}
</style>
