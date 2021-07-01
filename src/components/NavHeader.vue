<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">嗨商城</a>
          <a href="javascript:;">后台管理</a>
          <a href="javascript:;">项目视频</a>
          <a href="javascript:;">项目文档</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{ username }}</a>
          <a href="javascript:;" v-if="!username" @click="login">登录</a>
          <a href="javascript:;" v-if="username" @click="logout">退出</a>
          <a href="/#/order/list" v-if="username">我的订单</a>
          <a href="javascript:;" v-else>注册</a>

          <a href="javascript:;" class="my-cart" @click="goToCart"
            ><span class="icon-cart"></span> 购物车
            <span v-if="cartCount">{{ cartCount }}</span>
          </a>
        </div>
      </div>
    </div>

    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>热销商品</span>
            <div class="children">
              <ul>
                <li class="product" v-for="item in productList" :key="item.id">
                  <a :href="`/#/product/${item.id}`" target="_blank">
                    <div class="pro-img">
                      <img
                        :src="proxyHost + item.mainImage"
                        :alt="item.details"
                        width="160"
                        height="110"
                      />
                    </div>
                    <div class="pro-name">{{ item.tradeName }}</div>
                    <div class="pro-price">{{ item.price | currency }}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>今日特价</span>
            <div class="children">
              <ul>
                <li
                  class="product"
                  v-for="item in specialProductList"
                  :key="item.id"
                >
                  <a :href="`/#/product/${item.id}`" target="_blank">
                    <div class="pro-img">
                      <img
                        :src="proxyHost + item.mainImage"
                        :alt="item.details"
                        width="160"
                        height="110"
                      />
                    </div>
                    <div class="pro-name">{{ item.tradeName }}</div>
                    <div class="pro-price">{{ item.price | currency }}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword" v-model="keyword" />
            <span class="search-btn" @click="search" @keyup.13="search"
              ><a href="javascript:;"></a
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import storage from '@/storage'
import { proxyHost } from '@/config.js'

export default {
  name: 'nav-header',
  data() {
    return {
      keyword: '',
      productList: [],
      specialProductList: [],
      proxyHost: proxyHost.replace('8893','8890')
    }
  },
  computed: {
    username() {
      return this.$store.state.username
    },
    cartCount() {
      return this.$store.state.cartCount
    },
  },
  filters: {
    currency(val) {
      if (!val) return '0.00'
      return '￥' + val.toFixed(2) + '元'
    },
  },
  mounted() {
    this.getProductList()
    let params = this.$route.params
    if (params) {
      this.getCartCount()
    }
  },
  methods: {
    login() {
      this.$router.push('/login')
    },
    getProductList() {
      this.axios
        .get('/products', {
          params: {
            productType: '1',
            pageSize: 6,
          },
        })
        .then(res => {
          this.productList = res
          this.specialProductList = res.sort(
            (prev, curr) => curr.price - prev.price
          )
        })
    },
    getCartCount() {
      this.axios.get('/carts/products/sum').then((res = 0) => {
        storage.setItem('cartCount', res)
        this.$store.dispatch('saveCartCount', res)
      })
    },
    logout() {
      this.axios
        .post(`/user/logout?token=${storage.getItem('token')}`)
        .then(() => {
          storage.clear('username')
          storage.clear('cartCount')
          this.$message.success('退出成功')
          this.$store.dispatch('saveUserName', '')
          this.$store.dispatch('saveCartCount', '0')
        })
    },
    goToCart() {
      if (!this.username.length) {
        this.$message.warning('请先登录')
        return
      }
      this.$router.push('/cart')
    },
    search() {
      this.$router.push(`/search?keyword=${this.keyword}`)
    },
  },
}
</script>

<style lang="scss" scoped>
@import './../assets/scss/base.scss';
@import './../assets/scss/mixin.scss';
@import './../assets/scss/config.scss';

.header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: #333;
    color: #b0b0b0;
    .container {
      @include flex();
      a {
        display: inline-block;
        color: #b0b0b0;
        margin-right: 17px;
        &:last-child {
          margin-right: 0;
        }
      }
      .my-cart {
        width: 110px;
        background-color: #424242;
        text-align: center;
        color: #fff;
        .icon-cart {
          @include bgImg(16px, 12px, '/imgs/icon-cart-checked.png');
          margin-right: 4px;
        }
      }
    }
  }
  .nav-header {
    .container {
      @include flex();
      position: relative;
      height: 112px;
      .header-logo {
        display: inline-block;
        width: 55px;
        height: 55px;
        background-color: $colorA;
        a {
          display: inline-block;
          width: 110px;
          height: 55px;
          &::before {
            content: '';
            @include bgImg(55px, 55px, '/imgs/hi-logo.png', 55px);
            transition: margin 0.3s;
          }
          &::after {
            content: '';
            @include bgImg(55px, 55px, '/imgs/hi-home.png', 55px);
          }
          &:hover::before {
            margin-left: -55px;
            transition: margin 0.3s;
          }
        }
      }
      .header-menu {
        display: inline-block;
        width: 643px;
        padding-left: 209px;
        .item-menu {
          display: inline-block;
          color: #333;
          font-size: 16px;
          line-height: 112px;
          margin-right: 20px;
          span {
            cursor: pointer;
          }
          &:hover {
            color: $colorA;
            .children {
              height: 220px;
              opacity: 1;
            }
          }
          .children {
            position: absolute;
            top: 112px;
            left: 0;
            width: 1226px;
            height: 0px;
            border: 1px solid #e5e5e5;
            opacity: 0;
            overflow: hidden;
            box-shadow: 0px 3px 2px 0px rgba($color: #000000, $alpha: 0.11);
            background-color: #fff;
            z-index: 10;
            transition: all 0.3s;
            .product {
              position: relative;
              float: left;
              width: 16.6%;
              height: 220px;
              font-size: 12px;
              line-height: 12px;
              text-align: center;
              a {
                display: inline-block;
              }
              img {
                width: auto;
                height: 111px;
                margin-top: 26px;
              }
              .pro-img {
                height: 137px;
              }
              .pro-name {
                margin-top: 19px;
                margin-bottom: 8px;
                color: $colorB;
              }
              .pro-price {
                color: $colorA;
              }
              &::before {
                content: '';
                position: absolute;
                top: 28px;
                right: 0;
                border-left: 1px solid $colorF;
                width: 1px;
              }
              &:last-child::before {
                display: none;
              }
            }
          }
        }
      }
      .header-search {
        width: 319px;
        .wrapper {
          height: 50px;
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          input {
            box-sizing: border-box;
            border: none;
            border-right: 1px solid #e0e0e0;
            width: 264px;
            height: 50px;
            padding-left: 14px;
          }
          .search-btn {
            display: inline-block;
            width: 52px;
            height: 50px;
            line-height: 55px;
            text-align: center;
            cursor: pointer;
          }
          a {
            @include bgImg(18px, 18px, '/imgs/icon-search.png');
          }
        }
      }
    }
  }
}
</style>
