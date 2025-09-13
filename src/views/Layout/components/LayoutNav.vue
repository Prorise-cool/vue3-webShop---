<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import type { UserInfo } from "@/types/user";
const userStore = useUserStore();
const router = useRouter();

// 退出登录
const handleLogout = () => {
  userStore.clearUserInfo();
  router.push("/login");
};
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul class="app-topnav__list">
        <template v-if="userStore.isLoggedIn">
          <li class="app-topnav__item">
            <a href="javascript:;" class="app-topnav__link"
              ><i-ep-user app-topnav__icon />{{
                (userStore.userInfo as UserInfo).nickname
              }}</a
            >
          </li>
          <li class="app-topnav__item">
            <el-popconfirm
              title="确认退出吗?"
              confirm-button-text="确认"
              cancel-button-text="取消"
              @confirm="handleLogout"
            >
              <template #reference>
                <a href="javascript:;" class="app-topnav__link">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li class="app-topnav__item">
            <router-link to="/member/order" class="app-topnav__link"
              >我的订单</router-link
            >
          </li>
          <li class="app-topnav__item">
            <router-link to="/member" class="app-topnav__link"
              >会员中心</router-link
            >
          </li>
        </template>

        <template v-else>
          <li class="app-topnav__item">
            <a
              href="javascript:;"
              class="app-topnav__link"
              @click="$router.push('/login')"
              >请先登录</a
            >
          </li>
          <li class="app-topnav__item">
            <a href="javascript:;" class="app-topnav__link">帮助中心</a>
          </li>
          <li class="app-topnav__item">
            <a href="javascript:;" class="app-topnav__link">关于我们</a>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.app-topnav {
  background: #333;

  &__list {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
  }

  &__item {
    // ~ 选择器：选择所有在当前元素之后的同级元素
    ~ .app-topnav__item {
      .app-topnav__link {
        border-left: 2px solid #666;
      }
    }
  }

  &__link {
    padding: 0 15px;
    color: #cdcdcd;
    line-height: 1;
    display: inline-block;

    &:hover {
      // 此处使用了我们在 var.scss 中定义的全局品牌色变量
      color: $GLColor;
    }
  }

  &__icon {
    font-size: 14px;
    margin-right: 2px;
  }
}
</style>
