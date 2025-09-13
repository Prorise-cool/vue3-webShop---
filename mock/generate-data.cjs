// mock/generate-data.cjs
const { faker } = require("@faker-js/faker");
const fs = require("fs");
const path = require("path");

// 简单的Banner读取函数
const readCategoryBanners = (categoryId) => {
  const bannerPath = path.join(
    __dirname,
    `../public/data/${categoryId}/banner`
  );

  if (fs.existsSync(bannerPath)) {
    // 读取目录下的所有图片文件
    return fs
      .readdirSync(bannerPath)
      .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file))
      .map((file, index) => ({
        id: `${categoryId}-banner-${index + 1}`,
        imgUrl: `/data/${categoryId}/banner/${file}`,
        hrefUrl: `/category/${categoryId}`,
      }));
  }
  return [];
};

// 读取指定文件夹中的图片文件
const readImageFiles = (folderPath) => {
  if (!fs.existsSync(folderPath)) return [];
  return fs
    .readdirSync(folderPath)
    .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file))
    .sort();
};

// 读取分类的子分类和产品
const readCategoryData = (categoryId) => {
  const categoryPath = path.join(__dirname, `../public/data/${categoryId}`);
  if (!fs.existsSync(categoryPath)) return { subCategories: [], products: [] };

  const subCategories = [];
  const products = [];
  const items = fs.readdirSync(categoryPath, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory() && !["banner", "Banner"].includes(item.name)) {
      const subCategoryPath = path.join(categoryPath, item.name);
      const subCategoryProducts = [];

      const productDirs = fs
        .readdirSync(subCategoryPath, { withFileTypes: true })
        .filter((d) => d.isDirectory());

      for (const productDir of productDirs) {
        const productPath = path.join(subCategoryPath, productDir.name);
        const productInfoFile = path.join(productPath, "product_info.json");

        let productInfo = { name: productDir.name };
        if (fs.existsSync(productInfoFile)) {
          try {
            productInfo = JSON.parse(fs.readFileSync(productInfoFile, "utf-8"));
          } catch (e) {}
        }

        // 读取各个文件夹中的图片
        const coverPath = path.join(productPath, "cover");
        const galleryPath = path.join(productPath, "gallery");
        const detailPath = path.join(productPath, "detail");

        const coverImages = readImageFiles(coverPath);
        const galleryImages = readImageFiles(galleryPath);
        const detailImages = readImageFiles(detailPath);

        // 获取封面图片（优先使用cover文件夹中的第一张图片）
        const coverImage =
          coverImages.length > 0
            ? `/data/${categoryId}/${item.name}/${productDir.name}/cover/${coverImages[0]}`
            : galleryImages.length > 0
              ? `/data/${categoryId}/${item.name}/${productDir.name}/gallery/${galleryImages[0]}`
              : "";

        // 构建gallery数组
        const gallery = galleryImages.map(
          (img) =>
            `/data/${categoryId}/${item.name}/${productDir.name}/gallery/${img}`
        );

        // 构建details数组
        const details = detailImages.map(
          (img) =>
            `/data/${categoryId}/${item.name}/${productDir.name}/detail/${img}`
        );

        // 使用faker生成模拟数据
        const basePrice = faker.commerce.price({
          min: 1000,
          max: 50000,
          dec: 0,
        });
        const discount = faker.number.float({
          min: 0.7,
          max: 0.95,
          fractionDigits: 2,
        });
        const discountedPrice = Math.round(basePrice * discount);

        const product = {
          // GoodsDetail接口要求的字段
          id: faker.string.uuid(),
          name: productInfo.name || productDir.name,
          desc: productInfo.tip || faker.commerce.productDescription(),
          categoryId: categoryId,
          categoryName: productInfo.category_name || item.name,
          cover: coverImage,
          gallery: gallery,
          details: details,
          price: discountedPrice.toString(),
          originalPrice: basePrice.toString(),
          sales: faker.number.int({ min: 10, max: 9999 }),
          rating: faker.number.float({ min: 4.0, max: 5.0, fractionDigits: 1 }),
          stock: faker.number.int({ min: 0, max: 999 }),
          url: productInfo.url || "",

          // 保留原有字段以兼容现有接口
          coverImage: coverImage, // 保持向后兼容
          detailImages: details, // 保持向后兼容
          tip: productInfo.tip,
          category_id: productInfo.category_id,
          tab_name: productInfo.tab_name,
        };

        subCategoryProducts.push(product);
        products.push(product); // 添加到顶层products数组
      }

      subCategories.push({
        id: `${categoryId}-${item.name}`.replace(/[^a-zA-Z0-9-]/g, "-"),
        name: item.name,
        products: subCategoryProducts,
      });
    }
  }

  return { subCategories, products };
};

module.exports = () => {
  // 1. 读取静态的 mock-data.json 作为基础
  const staticDataPath = path.join(__dirname, "mock-data.json");
  const staticData = JSON.parse(fs.readFileSync(staticDataPath, "utf-8"));

  // 2. 为每个分类添加 banners 和 subCategories，同时收集所有products
  const allProducts = [];
  const categories = staticData.categories.map((category) => {
    const categoryData = readCategoryData(category.id);
    allProducts.push(...categoryData.products);

    return {
      ...category,
      banners: readCategoryBanners(category.id),
      subCategories: categoryData.subCategories,
    };
  });

  const data = {
    users: [],
    categories: categories,
    products: allProducts, // 添加顶层products数组
    // 全局 banners 保持不变，用于首页等场景
    banners: [
      {
        id: "banner-001",
        imgUrl: "/images/carousel/carousel1.jpg",
        hrefUrl: "/category/new",
      },
      {
        id: "banner-002",
        imgUrl: "/images/carousel/carousel2.jpg",
        hrefUrl: "/category/home-ac",
      },
      {
        id: "banner-003",
        imgUrl: "/images/carousel/carousel3.jpg",
        hrefUrl: "/category/central-air-conditioner",
      },
    ],
  };

  // 3. 生成模拟用户数据 (逻辑不变)
  for (let i = 1; i <= 20; i++) {
    const account = "3381292732@qq.com";
    data.users.push({
      id: faker.string.uuid(),
      account: account,
      password: "123456",
      accessToken: faker.string.uuid(),
      refreshToken: faker.string.uuid(),
      avatar: faker.image.avatar(),
      nickname: faker.person.firstName(),
      mobile: faker.phone.number({ style: "international" }),
      gender: faker.person.sex(),
      birthday: faker.date.past({ years: 30 }).toISOString().split("T")[0],
      cityCode: faker.location.zipCode(),
      provinceCode: faker.location.state({ abbreviated: true }),
      profession: faker.person.jobTitle(),
    });
  }

  return data;
};
