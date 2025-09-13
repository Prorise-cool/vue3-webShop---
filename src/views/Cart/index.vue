<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const cartStore = useCartStore()
const router = useRouter()

const handleSettlement = () => {
  if (cartStore.selectedCount === 0) {
    ElMessage.warning('请至少选择一件商品进行结算')
    return
  }
  router.push('/checkout')
}
</script>

<template>
  <div class="cart-page">
    <div class="container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>购物车</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="cart-page__content">
        <el-table :data="cartStore.cartList" class="cart-page__table" style="width: 100%">
          <template #empty>
            <el-empty description="购物车中还没有商品">
              <el-button type="primary" @click="router.push('/')">随便逛逛</el-button>
            </el-empty>
          </template>

          <el-table-column width="60" align="center">
            <template #header>
              <el-checkbox
:model-value="cartStore.isAllSelected"
                @change="(selected) => cartStore.updateAllCart(selected as boolean)" />
            </template>
            <template #default="{ row }">
              <el-checkbox
:model-value="row.selected"
                @change="(selected) => cartStore.updateCartSelected(row.id, selected as boolean)" />
            </template>
          </el-table-column>

          <el-table-column label="商品信息" width="400">
            <template #default="{ row }">
              <div class="goods-info">
                <router-link :to="`/product/${row.id}`"><img :src="row.picture" :alt="row.name"/></router-link>
                <div>
                  <p class="name">{{ row.name }}</p>
                  <p class="attr">{{ row.attrsText }}</p>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="单价" width="220" align="center">
            <template #default="{ row }">
              <span class="price">&yen;{{ row.price }}</span>
            </template>
          </el-table-column>

          <el-table-column label="数量" width="180" align="center">
            <template #default="{ row }">
              <el-input-number v-model="row.count" :min="1" />
            </template>
          </el-table-column>

          <el-table-column label="小计" width="180" align="center">
            <template #default="{ row }">
              <span class="price subtotal">&yen;{{ (Number(row.price) * row.count).toFixed(2) }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="140" align="center">
            <template #default="{ row }">
              <el-popconfirm title="确认删除吗?" @confirm="cartStore.delCart(row.id)">
                <template #reference>
                  <a href="javascript:;" class="action-link">删除</a>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="cart-page__action-bar">
        <div class="batch-info">
          共 {{ cartStore.totalCount }} 件商品，已选择 {{ cartStore.selectedCount }} 件，商品合计：
          <span class="total-price">&yen; {{ cartStore.selectedPrice.toFixed(2) }} </span>
        </div>
        <div class="buttons">
          <el-button size="large" type="primary" @click="handleSettlement">下单结算</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart-page {
  margin-top: 20px;

  .container {
    max-width: 1240px;
    margin: 0 auto;
  }

  &__content {
    background: #fff;
    margin-top: 20px;
  }

  &__table {
    .goods-info {
      display: flex;
      align-items: center;

      img {
        width: 100px;
        height: 100px;
      }

      div {
        width: 280px;
        font-size: 16px;
        padding-left: 10px;

        .name {
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .attr {
          font-size: 14px;
          color: #999;
        }
      }
    }

    .price {
      font-size: 16px;
      color: $priceColor;
    }

    .subtotal {
      font-weight: bold;
    }

    .action-link {
      color: $GLColor;

      &:hover {
        color: lighten($GLColor, 10%);
      }
    }
  }

  &__action-bar {
    display: flex;
    background: #fff;
    margin-top: 20px;
    height: 80px;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
    padding: 0 30px;

    .batch-info {
      color: #666;
    }

    .total-price {
      font-size: 18px;
      margin-right: 20px;
      font-weight: bold;
      color: $priceColor;
    }
  }
}
</style>
