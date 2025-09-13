// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// 1. 引入所需插件
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// 引入 unplugin-icons
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

export default defineConfig({
  plugins: [
    vue(),
    // 2. 配置 unplugin-auto-import
    AutoImport({
      // 1. 指定需要自动导入的库
      imports: ["vue", "vue-router"],
      // 2. 指定生成 d.ts 文件的位置
      dts: "src/auto-imports.d.ts",
      // 3. 配置 ElementPlusResolver
      resolvers: [ElementPlusResolver()],
    }),
    // 3. 配置 unplugin-vue-components
    Components({
      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver({ importStyle: "sass" }),
        // 自动导入 Element Plus 图标
        // 我们约定图标组件的使用方式是 <i-ep-iconName />
        IconsResolver({
          prefix: "i", // 默认为 i, 可不写
          enabledCollections: ["ep"], // ep 是 element-plus 的图标库
        }),
      ],
    }),
    // 4. 配置 unplugin-icons
    Icons({
      autoInstall: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  server: {
    proxy: {
      // 代理 API 请求到 Mock 服务器
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      // 代理图片资源到 Mock 服务器
      "/images": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
  // 2. SCSS 自动化注入配置
  css: {
    preprocessorOptions: {
      scss: {
        // 只注入变量和mixins，避免重复导入CSS输出
        additionalData: `
          @use "@/styles/abstracts/variables" as *;
          @use "@/styles/abstracts/mixins" as *;
          @use "@/styles/abstracts/utilities" as *;
        `,
      },
    },
  },
});
