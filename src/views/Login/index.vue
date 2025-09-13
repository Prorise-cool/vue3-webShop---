<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useEventListener } from "@vueuse/core";
// 1. 引入所需的核心工具
import { useMutation } from "@tanstack/vue-query";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { loginApi } from "@/apis/user"; // 确保 loginAPI 已在 user.ts 中创建
const userStore = useUserStore();
const router = useRouter();

// 获取 ElForm 组件实例，用于后续的统一校验
const formRef = ref<FormInstance>();

// 表单数据模型
const formModel = reactive({
  account: "",
  password: "",
  agree: true, // 同意协议，默认为 true
});

// 表单验证规则
const rules: FormRules = {
  account: [
    { required: true, message: "请输入邮箱或手机号", trigger: "blur" },
    {
      pattern: /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|1[3-9]\d{9})$/,
      message: "请输入正确的邮箱或手机号",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "密码长度应为6-20位", trigger: "blur" },
  ],
  agree: [
    {
      validator: (
        _rule: unknown,
        value: boolean,
        callback: (error?: string) => void,
      ) => {
        if (!value) {
          callback("请同意用户协议");
        } else {
          callback();
        }
      },
      trigger: "change",
    },
  ],
};

// 动画元素引用
const peopleRef = ref<HTMLImageElement>();
const sphereRef = ref<HTMLImageElement>();

// 处理登录
// 2. 使用 useMutation 封装登录逻辑
const { mutate, isPending } = useMutation({
  mutationFn: loginApi, // 指定实际执行的异步函数
  onSuccess: (data) => {
    // 登录成功后的回调
    // 2.1 使用 ElMessage 显示成功提示
    ElMessage({
      message: "登录成功！",
      type: "success",
      showClose: true,
    });

    // 2.2 将用户信息和 Token 存入 Pinia
    userStore.setUserInfo(data.result);

    // 2.3 跳转到首页
    router.push("/");
  },
  onError: (error) => {
    // 登录失败的回调
    ElMessage({
      message: "登录失败，请检查账号密码",
      type: "error",
      showClose: true,
    });
    console.error("登录错误:", error);
  },
});

// 处理登录表单提交
const handleLogin = async () => {
  if (!formRef.value) return;

  try {
    // 验证表单
    await formRef.value.validate();
    // 调用 mutation 进行登录
    mutate({
      account: formModel.account,
      password: formModel.password,
    });
  } catch {
    ElMessage({
      message: "请检查输入信息",
      type: "error",
      showClose: true,
    });
  }
};

// 处理忘记密码
const handleForgotPassword = () => {
  ElMessage({
    message: "忘记密码功能待开发",
    type: "info",
    showClose: true,
  });
};

// 处理第三方登录
const handleThirdPartyLogin = (type: string) => {
  ElMessage({
    message: `${type}登录功能待开发`,
    type: "info",
    showClose: true,
  });
};

// 处理导航点击
const handleNavClick = (item: string) => {
  ElMessage({
    message: `${item}功能待开发`,
    type: "info",
    showClose: true,
  });
};

// 动画处理 - 使用 VueUse 优化
const handlePeopleAnimationEnd = () => {
  if (peopleRef.value) {
    peopleRef.value.classList.remove("p-animation");
    peopleRef.value.classList.add("p-other-animation");
  }
};

const handleSphereAnimationEnd = () => {
  if (sphereRef.value) {
    sphereRef.value.classList.remove("s-animation");
    sphereRef.value.classList.add("s-other-animation");
  }
};

// 使用 VueUse 的 useEventListener 自动处理事件监听和清理
useEventListener(peopleRef, "animationend", handlePeopleAnimationEnd);
useEventListener(sphereRef, "animationend", handleSphereAnimationEnd);
</script>

<template>
  <div class="login-page">
    <div class="login-content">
      <!-- 左侧动画区域 -->
      <div class="left-section">
        <img
          ref="peopleRef"
          src="@/assets/login/img2.png"
          class="people p-animation"
          alt="people"
        />
        <img
          ref="sphereRef"
          src="@/assets/login/img1.png"
          class="sphere s-animation"
          alt="sphere"
        />
      </div>

      <!-- 右侧表单区域 -->
      <div class="right-section">
        <!-- 顶部导航 -->
        <div class="top-navigation">
          <div class="nav-item" @click="handleNavClick('首页')">
            <span class="nav-text">首页</span>
          </div>
          <div class="nav-item" @click="handleNavClick('注册')">
            <span class="nav-text">注册</span>
          </div>
        </div>

        <!-- 表单区域 -->
        <div class="form-wrapper">
          <h1 class="form-title">欢迎登录我们的平台</h1>

          <el-form
            ref="formRef"
            :model="formModel"
            :rules="rules"
            @submit.prevent="handleLogin"
          >
            <el-form-item prop="account">
              <el-input
                v-model="formModel.account"
                placeholder="请输入邮箱或手机号"
                size="large"
                clearable
              />
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                v-model="formModel.password"
                type="password"
                placeholder="请输入密码"
                size="large"
                show-password
                clearable
              />
            </el-form-item>

            <el-form-item>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  width: 100%;
                "
              >
                <el-form-item prop="agree" style="margin: 0">
                  <el-checkbox v-model="formModel.agree">
                    我同意用户协议和隐私政策
                  </el-checkbox>
                </el-form-item>
                <a
                  href="#"
                  class="forgot-password"
                  @click.prevent="handleForgotPassword"
                >
                  忘记密码？
                </a>
              </div>
            </el-form-item>

            <button
              type="submit"
              class="login-button"
              :disabled="isPending"
              @click="handleLogin"
            >
              {{ isPending ? "登录中..." : "登录" }}
            </button>
          </el-form>

          <!-- 第三方登录 -->
          <div class="other-login">
            <div class="divider">
              <span class="line"></span>
              <span class="divider-text">或使用以下方式登录</span>
              <span class="line"></span>
            </div>
            <div class="other-login-wrapper">
              <div
                class="other-login-item"
                @click="handleThirdPartyLogin('QQ')"
              >
                <img src="@/assets/login/QQ.png" alt="QQ" />
              </div>
              <div
                class="other-login-item"
                @click="handleThirdPartyLogin('微信')"
              >
                <img src="@/assets/login/WeChat.png" alt="WeChat" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/styles/login.scss" as *;
</style>
