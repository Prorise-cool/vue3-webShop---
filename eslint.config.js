// eslint.config.js
import globals from "globals";
import eslintJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginVue from "eslint-plugin-vue";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  // 全局忽略配置
  {
    ignores: ["dist", "node_modules", "*.config.js", "public", ".DS_Store"],
  },
  // 基础配置，应用于所有文件
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
  },
  // ESLint 官方推荐规则
  eslintJs.configs.recommended,
  // TypeScript ESLint 推荐规则
  ...tseslint.configs.recommended,
  // Vue 插件推荐规则 (针对 Vue 3)
  ...eslintPluginVue.configs["flat/recommended"],
  // Prettier 配置，必须放在最后
  eslintConfigPrettier,
  // 自定义规则配置
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
      globals: {
        ElMessage: "readonly",
        ElMessageBox: "readonly",
        ElNotification: "readonly",
        ElLoading: "readonly",
      },
    },
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "always",
            normal: "never",
            component: "always",
          },
        },
      ],
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    },
  },
);
