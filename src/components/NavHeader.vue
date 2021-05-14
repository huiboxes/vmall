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
          <a href="javascript:;" v-else @click="login">登录</a>
          <a href="javascript:;" v-if="username">我的订单</a>
          <a href="javascript:;" v-else>注册</a>

          <a href="javascript:;" class="my-cart" @click="goToCart"
            ><span class="icon-cart"></span> 购物车</a
          >
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
                        :src="item.mainImage"
                        :alt="item.details"
                        width="160"
                        height="110"
                      />
                    </div>
                    <div class="pro-name">{{ item.tradeName }}</div>
                    <div class="pro-price">{{ item.price | currency }}</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img
                        src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/acd0f27496ccdf81ef42124c35e8bfc4.png?thumb=1&amp;w=200&amp;h=138&amp;f=webp&amp;q=90"
                        alt="K40 游 戏增强版"
                        width="160"
                        height="110"
                      />
                    </div>
                    <div class="pro-name">K40 游戏增强版</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img
                        src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/acd0f27496ccdf81ef42124c35e8bfc4.png?thumb=1&amp;w=200&amp;h=138&amp;f=webp&amp;q=90"
                        alt="K40 游 戏增强版"
                        width="160"
                        height="110"
                      />
                    </div>
                    <div class="pro-name">K40 游戏增强版</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img
                        src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/acd0f27496ccdf81ef42124c35e8bfc4.png?thumb=1&amp;w=200&amp;h=138&amp;f=webp&amp;q=90"
                        alt="K40 游 戏增强版"
                        width="160"
                        height="110"
                      />
                    </div>
                    <div class="pro-name">K40 游戏增强版</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img
                        src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/acd0f27496ccdf81ef42124c35e8bfc4.png?thumb=1&amp;w=200&amp;h=138&amp;f=webp&amp;q=90"
                        alt="K40 游 戏增强版"
                        width="160"
                        height="110"
                      />
                    </div>
                    <div class="pro-name">K40 游戏增强版</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img
                        src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/acd0f27496ccdf81ef42124c35e8bfc4.png?thumb=1&amp;w=200&amp;h=138&amp;f=webp&amp;q=90"
                        alt="K40 游 戏增强版"
                        width="160"
                        height="110"
                      />
                    </div>
                    <div class="pro-name">K40 游戏增强版</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>今日特价</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img
                        src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/acd0f27496ccdf81ef42124c35e8bfc4.png?thumb=1&amp;w=200&amp;h=138&amp;f=webp&amp;q=90"
                        alt="K40 游 戏增强版"
                        width="160"
                        height="110"
                      />
                    </div>
                    <div class="pro-name">K40 游戏增强版</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img
                        src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/acd0f27496ccdf81ef42124c35e8bfc4.png?thumb=1&amp;w=200&amp;h=138&amp;f=webp&amp;q=90"
                        alt="K40 游 戏增强版"
                        width="160"
                        height="110"
                      />
                    </div>
                    <div class="pro-name">K40 游戏增强版</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img
                        src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/acd0f27496ccdf81ef42124c35e8bfc4.png?thumb=1&amp;w=200&amp;h=138&amp;f=webp&amp;q=90"
                        alt="K40 游 戏增强版"
                        width="160"
                        height="110"
                      />
                    </div>
                    <div class="pro-name">K40 游戏增强版</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img
                        src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/acd0f27496ccdf81ef42124c35e8bfc4.png?thumb=1&amp;w=200&amp;h=138&amp;f=webp&amp;q=90"
                        alt="K40 游 戏增强版"
                        width="160"
                        height="110"
                      />
                    </div>
                    <div class="pro-name">K40 游戏增强版</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img
                        src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/acd0f27496ccdf81ef42124c35e8bfc4.png?thumb=1&amp;w=200&amp;h=138&amp;f=webp&amp;q=90"
                        alt="K40 游 戏增强版"
                        width="160"
                        height="110"
                      />
                    </div>
                    <div class="pro-name">K40 游戏增强版</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img
                        src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/acd0f27496ccdf81ef42124c35e8bfc4.png?thumb=1&amp;w=200&amp;h=138&amp;f=webp&amp;q=90"
                        alt="K40 游 戏增强版"
                        width="160"
                        height="110"
                      />
                    </div>
                    <div class="pro-name">K40 游戏增强版</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword" />
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-header',
  data() {
    return {
      username: 'jack',
      productList: [],
    }
  },
  filters: {
    currency(val) {
      if (!val) return '0.00'
      return '￥' + val.toFixed(2) + '元'
    },
  },
  mounted() {
    this.getProductList()
  },
  methods: {
    login() {
      this.$router.push('/login')
    },
    async getProductList() {
      const { list } = await this.axios.get('/products', {
        params: {
          tradeType: '普通',
        },
      })
      this.productList = list.slice(0, 6)
    },
    goToCart() {
      this.$router.push('/cart')
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
        background-color: $colorA;
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
          a {
            @include bgImg(18px, 18px, '/imgs/icon-search.png');
            margin-left: 17px;
          }
        }
      }
    }
  }
}
</style>
