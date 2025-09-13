// mock/server.cjs
const jsonServer = require("json-server");
const { faker } = require("@faker-js/faker"); // 引入 faker
const path = require("path");
const generateData = require("./generate-data.cjs");

const server = jsonServer.create();
const router = jsonServer.router(generateData()); // 使用动态生成的数据
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser); // 启用请求体解析器

// 添加 token 过期检查中间件
server.use((req, res, next) => {
  // 跳过登录和刷新token接口
  if (req.path === "/login" || req.path === "/token/refresh") {
    return next();
  }

  // 检查Authorization头
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);

    // 解析token中的过期时间戳
    const parts = token.split("_");
    if (parts.length === 2) {
      const expirationTime = parseInt(parts[1]);
      const currentTime = Date.now();

      // 如果token已过期，返回401
      if (currentTime > expirationTime) {
        return res.status(401).json({
          message: "Token已过期，请重新登录",
          code: "401",
        });
      }
    }
  }

  next();
});

// 自定义 /login 路由
server.post("/login", (req, res) => {
  const { account, password } = req.body;
  const db = router.db; // 获取 lowdb 实例
  const user = db.get("users").find({ account, password }).value();

  if (user) {
    // 登录成功，返回完整的用户信息（除了密码）
    const { password, ...userInfo } = user; // 排除密码字段

    // 【核心】生成一个短期的 accessToken（带过期时间戳）
    const accessToken = `${faker.string.uuid()}_${Date.now() + 30 * 60 * 1000}`; // 30分钟后过期

    res.status(200).json({
      code: "200",
      msg: "操作成功",
      result: {
        ...userInfo,
        accessToken, // 覆盖原有的 accessToken
      },
    });
  } else {
    // 登录失败
    res.status(400).json({
      message: "用户名或密码错误",
      code: "400",
    });
  }
});

// 【新增】Token 刷新接口
server.post("/token/refresh", (req, res) => {
  const { refreshToken } = req.body;
  const db = router.db;
  // 校验 refreshToken 是否有效
  const user = db.get("users").find({ refreshToken }).value();

  if (user && refreshToken) {
    // 刷新成功，生成一个新的 accessToken（带过期时间戳）
    const newAccessToken = `${faker.string.uuid()}_${Date.now() + 30 * 60 * 1000}`; // 30分钟后过期
    res.status(200).json({
      code: "200",
      msg: "刷新成功",
      result: {
        accessToken: newAccessToken,
      },
    });
  } else {
    // 刷新失败，要求用户重新登录
    res.status(401).json({
      message: "登录状态无效，请重新登录",
      code: "401",
    });
  }
});

// 自定义 /categories 路由以符合 OpenAPI 规范
server.get("/categories", (req, res) => {
  const db = router.db;
  const categories = db.get("categories").value();

  // 返回符合 OpenAPI 规范的结构
  res.status(200).json({
    code: "200",
    msg: "操作成功",
    result: categories,
  });
});

// 新增：自定义 /home/banner 路由
server.get("/home/banner", (req, res) => {
  const db = router.db;
  const banners = db.get("banners").value();

  res.status(200).json({
    code: "1",
    msg: "操作成功",
    result: banners,
  });
});

// 特殊的Banner接口 - 方便前端直接获取分类Banner
server.get("/category/:categoryId/banners", (req, res) => {
  const { categoryId } = req.params;
  const db = router.db;
  const categories = db.get("categories").value();
  const category = categories.find((cat) => cat.id === categoryId);

  res.status(200).json({
    code: "200",
    msg: "操作成功",
    result: category?.banners || [],
  });
});

// JSON Server 自动提供的 RESTful API：
// GET /categories - 获取所有分类
// GET /categories?id=water-heater - 根据ID筛选分类
// GET /categories/1 - 根据数组索引获取分类

// 将所有其他请求交给 json-server 的默认路由处理
server.use(router);

server.listen(3001, () => {
  console.log("JSON Server is running on http://localhost:3001");
});
