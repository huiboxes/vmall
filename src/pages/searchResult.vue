<template>
  <div class="search-result">
    <nav-header></nav-header>
    <div class="breadcrumb">
      <el-breadcrumb separator=">" class="container">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a :href="`/#/search?keyword=${$route.query.keyword}`">
            全部结果
          </a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.query.keyword }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="order-list-box container">
      orderlistbox
    </div>

    <div class="product-wrapper">
      <div class="product-list-box container">
        <div
          class="product-item clearfix"
          v-for="(item, index) in productList"
          :key="index + item.id"
        >
          <div class="figure">
            <a :href="`/#/detail/${item.id}`">
              <img v-lazy="item.mainImage" width="200" height="200" />
            </a>
          </div>
          <h2>{{ item.name }}</h2>
          <p class="price">
            <span>{{ item.price }}元</span>
            <del v-if="item.oldPrice">{{ item.oldPrice }}元</del>
          </p>
          <div class="btn-group">
            <a href="javascript:;" class="btn" @click="addCart(item.id)"
              >加入购物车</a
            >
          </div>
        </div>
      </div>
    </div>

    <service-bar></service-bar>
    <modal
      title="提示"
      sureText="查看购物车"
      btnType="1"
      modalType="middle"
      v-bind:showModal="showModal"
      v-on:submit="goToCart"
      v-on:cancel="showModal = false"
    >
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </modal>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Modal from '@/components/Modal'
import ServiceBar from '@/components/ServiceBar'
import NavFooter from '@/components/NavFooter'
import NavHeader from '@/components/NavHeader'

export default {
  name: 'search-result',
  data() {
    return {
      showModal: false,
      productList: [
        {
          id: 14151245,
          name: '测试商品',
          subTitle: '测试',
          price: 1799,
          mainImage:
            'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1590401157.67326.png',
        },
        {
          id: 14151245,
          name: '测试商品',
          subTitle: '测试',
          price: 1799,
          mainImage:
            'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1590401157.67326.png',
        },
        {
          id: 14151245,
          name: '测试商品',
          subTitle: '测试',
          price: 1799,
          mainImage:
            'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1590401157.67326.png',
        },
        {
          id: 14151245,
          name: '测试商品',
          subTitle: '测试',
          price: 1799,
          mainImage:
            'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1590401157.67326.png',
        },
        {
          id: 14151245,
          name: '测试商品',
          subTitle: '测试',
          price: 1799,
          mainImage:
            'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1590401157.67326.png',
        },
        {
          id: 14151245,
          name: '测试商品',
          subTitle: '测试',
          price: 1799,
          mainImage:
            'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1590401157.67326.png',
        },
      ],
    }
  },
  components: {
    ServiceBar,
    NavFooter,
    NavHeader,
    Modal,
  },
  mounted() {
    /**
     * this.$route.query.keyword
     * 发请求，productList改为返回结果
     */
  },
  methods: {
    addCart(id) {
      if (!this.username.length) {
        this.$message.warning('请先登录')
        return
      }
      this.axios
        .post('/carts', {
          productId: id,
          selected: true,
        })
        .then(res => {
          this.showModal = true
          this.$store.dispatch('saveCartCount', res.cartTotalQuantity)
        })
    },
    goToCart() {
      this.$router.push('/cart')
    },
  },
  computed: {
    ...mapState(['username']),
  },
}
</script>

<style lang="scss" scoped>
.search-result {
  .breadcrumb {
    padding: 20px 0;
    background-color: #f5f5f5;
  }

  .product-wrapper {
    background-color: #f5f5f5;
    .product-list-box {
      display: flex;
      flex-wrap: wrap;
      .product-item {
        background-color: #fff;
        width: 22.999999%;
        margin: 7px;
        padding: 47px 0;
        text-align: center;
        // background-color: #fff;
        // box-shadow: 0 5px 15px rgb(0 0 0 / 20%) ;

        h2 {
          color: #424242;
          font-size: 14px;
          font-weight: 500;
        }
        .figure {
          margin: 0 auto 16px;
        }
        .price {
          margin: 0 0 15px;
          font-size: 14px;
          color: #f84d50;
          del {
            color: #b0b0b0;
            margin-left: 4px;
          }
        }
      }
    }
  }
}
</style>
