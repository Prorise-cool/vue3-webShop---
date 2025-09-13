<script setup lang="ts">
import { ref } from 'vue' // 引入 ref
import { useGoods } from './composables/useGoods'
import GoodsImage from './components/GoodsImage.vue' // <-- 稍后会创建
import { useCartStore } from '@/stores/cartStore' // 1. 引入 cartStore

const { goodsDetail, isLoading } = useGoods()
const cartStore = useCartStore() // 2. 获取 store 实例

const count = ref(1) // 3. 绑定商品数量

// 4. "加入购物车"事件处理函数
const addToCart = () => {
  if (goodsDetail.value) {
    cartStore.addCart({
      id: goodsDetail.value.id,
      name: goodsDetail.value.name,
      picture: goodsDetail.value.cover, // 使用封面图
      price: goodsDetail.value.price,
      count: count.value,
      selected: true, // 默认选中
      // 注意：由于我们还未实现 SKU 功能，attrsText 和 skuId 暂时留空或不传
      attrsText: '',
      skuId: '', // 暂时使用商品 id 或一个临时值
    })
  }
}
</script>

<template>
  <div class="detail-page">
    <div v-if="!isLoading && goodsDetail" class="container">
      <!-- 1. 面包屑导航 -->
      <el-breadcrumb class="detail-page__breadcrumb" separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${goodsDetail.categoryId}` }">
          {{ goodsDetail.categoryName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ goodsDetail.name }}</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 2. 商品信息区 -->
      <div class="detail-page__info-panel">
        <el-row :gutter="20">
          <!-- 左侧：图片预览 -->
          <el-col :span="12">
            <div class="info-panel__media">
              <GoodsImage :products="goodsDetail" />
            </div>
          </el-col>

          <!-- 右侧：商品信息与操作 -->
          <el-col :span="12">
            <div class="info-panel__spec">
              <h2 class="spec__name">{{ goodsDetail.name }}</h2>
              <p class="spec__desc">{{ goodsDetail.desc }}</p>
              <p class="spec__price">&yen;{{ goodsDetail.price }}</p>

              <div class="spec__quantity">
                <span class="quantity-label">数量</span>
                <el-input-number v-model="count" :min="1" />
              </div>

              <div class="spec__actions">
                <el-button size="large" type="primary" @click="addToCart">加入购物车</el-button>
              </div>

              <!-- 使用 ElDescriptions 展示服务信息，更规整 -->
              <el-descriptions class="spec__service" :column="1" border>
                <el-descriptions-item>
                  <template #label>
                    <div class="service-label">促销</div>
                  </template>
                  12月好物放送，App领券购买直降120元
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="service-label">服务</div>
                  </template>
                  <el-tag type="success" size="small" effect="plain">无忧退货</el-tag>
                  <el-tag type="success" size="small" effect="plain">快速退款</el-tag>
                  <el-tag type="success" size="small" effect="plain">免费包邮</el-tag>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 3. 商品介绍区区 -->
      <div class="detail-page__detail-panel">
        <h2 class="detail-page__detail-panel__title">商品介绍</h2>
        <div v-for="value in goodsDetail.details" :key="value" class="detail-page__detail-panel__content">
          <el-image :src="value" fit="contain" lazy :preview-src-list="goodsDetail.details" />
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-else class="container loading-container">
      <el-skeleton style="width: 100%" animated>
        <template #template>
          <div style="display: flex; gap: 20px; padding: 20px;">
            <el-skeleton-item variant="image" style="width: 580px; height: 600px;" />
            <div style="flex: 1; padding-top: 20px;">
              <el-skeleton-item variant="p" style="width: 80%" />
              <el-skeleton-item variant="p" style="width: 60%; margin-top: 10px;" />
              <el-skeleton-item variant="h1" style="width: 40%; margin-top: 20px;" />
              <el-skeleton-item variant="rect" style="width: 100%; height: 120px; margin-top: 20px;" />
            </div>
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.detail-page {
  background: #f5f5f5;
  padding-top: 20px;

  &__breadcrumb {
    padding: 20px 0;
  }

  &__info-panel {
    background: #fff;
    padding: 30px;
  }

  &__detail-panel {
    background: #fff;
    margin-top: 20px;
    padding: 30px;

    &__title {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    &__content {
      // 图片居中
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
  }
}

.info-panel {
  &__media {
    width: 580px;
    height: 600px;
  }

  &__spec {
    flex: 1;
  }
}

.spec {
  &__name {
    font-size: 22px;
  }

  &__desc {
    color: #999;
    margin-top: 10px;
  }

  &__price {
    font-size: 22px;
    color: $priceColor;
    margin-top: 10px;
  }


  &__quantity {
    display: flex;
    align-items: center;
    margin-top: 20px;

    .quantity-label {
      width: 50px;
      color: #999;
    }
  }

  &__actions {
    margin-top: 30px;
  }

  &__service {
    margin-top: 20px;

    .service-label {
      width: 50px;
      color: #999;
    }
  }
}

.loading-container {
  background-color: #fff;
  min-height: 800px;
}
</style>
