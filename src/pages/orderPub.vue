<template>
  <div>
    <nav-header></nav-header>
    <div class="orderPubBox container">
      <div class="breadcrumb">
        <el-breadcrumb separator=">" class="container">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a>最新参与秒杀订单</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="order-list">
        <div
          class="pub-order-bar"
          v-for="item in purchasedOrder"
          :key="item.id"
          
        >
          号码 {{ item.phone | formatPhone }} 的
          {{ item.name | formatName }} 用户刚刚以{{
            item.discount
          }}折抢购到了心爱的宝贝
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader'

export default {
  components: {
    NavHeader,
  },
  data() {
    return {
      orderList: [],
      purchasedOrder: [
        {
          id: '23121231',
          name: 'bob',
          phone: '18381953871',
          discount: '5.5',
        },
        {
          id: '566536231',
          name: 'jerry',
          phone: '18381953982',
          discount: '5.5',
        },
        {
          id: '231245245245',
          name: 'tom',
          phone: '18381953474',
          discount: '5.6',
        },
      ],
    }
  },
  methods: {
    getPurchasedOrder() {
      this.axios.get('/orders/pub').then(res => {
        this.purchasedOrder = res.list
      })
    },
  },
  filters: {
    formatPhone(val) {
      if (!val) return '此用户电话异常'
      return val.replace(val.slice(3, 7), '****')
    },
    formatName(val) {
      if (!val) return '此用户账户异常'
      return val[0] + '****' + val[val.length - 1]
    },
  },
}
</script>

<style lang="scss" scoped>
.order-list .pub-order-bar{
  font-size: 16px;
  padding: 6px 0;
  box-shadow: 0 0 1px rgba($color: #000000, $alpha: 0.2);
}
</style>
