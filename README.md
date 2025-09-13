# vue3-webShop - 企业级电商前台项目实战

<p align="center">
  <img src="https://img.shields.io/badge/Vue.js-3.x-green" alt="Vue 3">
  <img src="https://img.shields.io/badge/Vite-5.x-blueviolet" alt="Vite 5">
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue" alt="TypeScript">
  <img src="https://img.shields.io/badge/Element%20Plus-2.x-409EFF" alt="Element Plus">
  <img src="https://img.shields.io/badge/Pinia-2.x-yellow" alt="Pinia">
  <img src="https://img.shields.io/badge/TanStack%20Query-5.x-FF4154" alt="TanStack Query">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License MIT">
</p>

这是一个基于 **Vue 3 + Vite + TypeScript** 技术栈，深度结合 **Element Plus**、**Pinia** 和 **TanStack Query** 构建的、对标企业级标准的现代化电商前台项目。

该项目不仅是一个功能完备的电商应用范例，其**整个开发过程本身，就是一篇高质量、重思路、轻罗列的实战教程**。

---

## 📖 查看完整教程

本项目的所有开发步骤、设计思路和最佳实践，都已沉淀为一篇详尽的实战教程。

**👉 [点击此处，在 prorise666.site 查看完整教程](https://prorise666.site/tags/%E5%89%8D%E7%AB%AF%E5%AE%9E%E6%88%98%E7%AF%87/)**

---

## 📸 项目预览

![项目首页预览图](https://prorise-blog.oss-cn-guangzhou.aliyuncs.com/cover/image-20250911090501818.png)
*首页与通用布局*

![登录页预览图](https://prorise-blog.oss-cn-guangzhou.aliyuncs.com/cover/image-20250911155106817.png)



![image-20250913115716375](https://prorise-blog.oss-cn-guangzhou.aliyuncs.com/cover/image-20250913115716375.png)



![image-20250913115746400](https://prorise-blog.oss-cn-guangzhou.aliyuncs.com/cover/image-20250913115746400.png)



![image-20250913115812464](https://prorise-blog.oss-cn-guangzhou.aliyuncs.com/cover/image-20250913115812464.png)

![image-20250913115833197](https://prorise-blog.oss-cn-guangzhou.aliyuncs.com/cover/image-20250913115833197.png)


## ✨ 项目特色

* **企业级认证体系**: 实现了基于双 Token (`Access` + `Refresh`) 的无感刷新认证机制，并深度封装 Axios 拦截器。
* **现代化状态管理**: 采用 `Pinia` (客户端状态) + `TanStack Query` (服务端状态) 的黄金组合，实现状态的清晰分层管理。
* **组件化开发**: 遵循“自底向上”和“单一职责”原则，将复杂页面拆分为高内聚、低耦合的可复用组件。
* **完整的购物流程**: 涵盖了从首页浏览、分类筛选、商品详情、加入购物车到下单结算的核心电商业务闭环。
* **专业的工程化**: 集成了 ESLint, Prettier, Husky, lint-staged 和 commitlint，建立了一套完整的自动化代码质量保障与提交流程。
* **数据驱动与类型安全**: 全面拥抱 TypeScript，从 API 请求到 Pinia Store，再到组件 Props，都具备严格的类型定义。

## 🛠️ 技术栈

* **核心框架**: Vue 3 (`<script setup>`)
* **脚本语言**: TypeScript 5.x
* **构建工具**: Vite 5.x
* **包管理器**: pnpm
* **路由**: Vue Router 4.x
* **状态管理**: Pinia (客户端状态) & TanStack Query (Vue Query) (服务端状态)
* **UI 组件库**: Element Plus
* **样式方案**: SCSS / Sass
* **HTTP 客户端**: Axios
* **代码规范**: ESLint + Prettier
* **Git Hooks**: Husky + lint-staged
* **提交规范**: commitlint
* **工具库**: VueUse
* **Mock 服务器**: json-server

## 🚀 快速开始

1.  **克隆项目**
    ```bash
    git clone [你的项目Git仓库地址]
    cd vue3-webShop
    ```

2.  **安装依赖**
    ```bash
    pnpm install
    ```

3.  **启动 Mock 后端服务器** (需要开启一个独立的终端窗口)
    ```bash
    pnpm run mock
    ```
    > Mock 服务器将运行在 `http://localhost:3001`。

4.  **启动前端开发服务器**
    ```bash
    pnpm run dev
    ```
    > 前端应用将运行在 `http://localhost:5173` (或其他可用端口)。

## 📜 可用脚本

| 命令 | 描述 |
| :--- | :--- |
| `pnpm run dev` | 启动本地开发服务器。 |
| `pnpm run build` | 对项目进行生产环境构建。 |
| `pnpm run preview` | 预览生产环境构建后的产物。 |
| `pnpm run mock` | 启动 `json-server` 模拟后端。 |
| `pnpm run lint` | 运行 ESLint 并自动修复代码质量问题。 |
| `pnpm run format`| 运行 Prettier 格式化所有代码。 |

## 📁 项目结构

```
.
├── mock/                 # Mock 服务器相关（数据生成、服务器脚本）
├── public/               # 静态资源
├── src/
│   ├── apis/             # API 请求函数封装
│   ├── assets/           # 本地静态资源（图片、图标）
│   ├── components/       # 全局通用组件
│   ├── router/           # Vue Router 路由配置
│   ├── stores/           # Pinia 状态管理
│   ├── styles/           # 全局样式与 SCSS 架构
│   ├── types/            # TypeScript 类型定义
│   ├── utils/            # 工具函数（如 Axios 实例）
│   └── views/            # 页面级组件
├── .eslintrc.js          # ESLint 配置文件
├── commitlint.config.js  # Commitlint 配置文件
├── vite.config.ts        # Vite 配置文件
└── ...
```

## 📄 开源协议

本项目基于 [MIT License](LICENSE) 开源。
