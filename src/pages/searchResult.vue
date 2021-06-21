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
      <ul class="order-list clearfix">
        <li
          @click=";(checked = 1), getProductInfo"
          :class="{ checked: checked == 1 }"
        >
          综合
        </li>
        <li
          @click=";(checked = 2), sortByDate"
          :class="{ checked: checked == 2 }"
        >
          新品
        </li>
        <li
          @click=";(checked = 3), sortByVolume"
          :class="{ checked: checked == 3 }"
        >
          销量
        </li>
        <li
          @click=";(checked = 4), (priceSort = !priceSort), sortByPrice"
          :class="{ checked: checked == 4 }"
        >
          价格
          <i
            :class="`fa fa-long-arrow-${priceSort ? 'down' : 'up'}`"
            aria-hidden="true"
          ></i>
        </li>
      </ul>
      <ul class="type-list clearfix">
        <li @click=";(checkedStock = !checkedStock), sortByStock">
          <span class="checkbox">
            <i
              :class="`fa ${checkedStock ? 'fa-check fill' : ''}`"
              aria-hidden="true"
            ></i> </span
          >仅看有货
        </li>
      </ul>
    </div>

    <div class="product-wrapper">
      <div class="product-list-box container">
        <div
          class="product-item"
          v-for="(item, index) in productList"
          :key="index + item.id"
        >
          <div class="figure">
            <a :href="`/#/detail/${item.id}`">
              <img v-lazy="item.mainImage" width="200" height="200" />
            </a>
          </div>
          <h2>{{ item.name }}</h2>
          <h3>{{ item.subTitle }}</h3>
          <p class="price">
            <span>{{ item.price }}元</span>
            <del v-if="item.oldPrice">{{ item.oldPrice }}元</del>
          </p>
          <div class="btn-group">
            <a
              href="javascript:;"
              class="btn"
              @click="addCart(item.id)"
              >加入购物车</a
            >
          </div>
        </div>
        <no-data v-if="productList.length == 0" :description="`抱歉，没有 ${$route.query.keyword} 相关结果，请尝试换个词试试`" style="margin: auto;"></no-data>
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
import NoData from '@/components/NoData'

export default {
  name: 'search-result',
  data() {
    return {
      checked: 0,
      showModal: false,
      checkedStock: false,
      priceSort: false, // false为升序，ture为降序
      productList: [],
    }
  },
  components: {
    ServiceBar,
    NavFooter,
    NavHeader,
    Modal,
    NoData
  },
  mounted() {
    this.getProductInfo()
  },
  methods: {
    getProductInfo() {
      let keyword = this.$route.query.keyword
      this.axios.get(`/products/search/${keyword}`).then(list => {
        this.productList = list
      })
    },
    sortByDate() {
      this.productList = this.productList.sort(
        (prev, curr) => curr.proDate - prev.proDate
      )
    },
    sortByVolume() {
      this.productList = this.productList.sort(
        (prev, curr) => curr.volume - prev.volume
      )
    },
    sortByPrice() {
      this.productList = this.productList.sort((prev, curr) => {
        if (this.priceSort) return prev.price - curr.price
        return curr.price - prev.price
      })
    },
    sortByStock() {
      this.productList = this.productList.filter(item => item.stock > 0)
    },
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
@import './../assets/scss/mixin.scss';
@import './../assets/scss/config.scss';

.search-result {
  .order-list-box {
    @include flex();
    margin: 20px auto;
    .order-list > li,
    .type-list > li {
      font-size: 14px;
      transition: color 0.3s;
      &:hover {
        color: $colorA;
      }
    }
    .order-list {
      li {
        cursor: pointer;
        float: left;
        padding: 0 30px;
        border-right: 1px solid #e0e0e0;
        &:last-child {
          border: none;
        }
      }
      .checked {
        color: $colorA;
      }
    }
    .type-list {
      li {
        span.checkbox {
          display: inline-block;
          width: 18px;
          height: 18px;
          margin-right: 8px;
          border: 1px solid #e0e0e0;
          background-color: #fff;
          font-size: 16px;
          line-height: 18px;
          text-align: center;

          .fill {
            width: 20px;
            height: 20px;
            color: #fff;
            background-color: $colorA;
            transform: translate(-1px, -2px);
          }
        }
      }
    }
  }

  .breadcrumb {
    padding: 20px 0;
    background-color: #f5f5f5;
  }

  .product-wrapper {
    padding: 20px 0;
    background-color: #f5f5f5;

    .product-list-box {
      display: flex;
      flex-wrap: wrap;
      .product-item {
        background-color: #fff;
        width: 24.14%;
        padding: 47px 0;
        margin: 7px;
        text-align: center;
        transition: box-shadow 0.5s linear;
        &:nth-child(4n + 1) {
          /* 每行的第一个去掉外边距 */
          margin-left: 0;
        }
        &:nth-child(4n) {
          /* 每行的最后一个去掉外边距 */
          margin-right: 0;
        }
        &:hover {
          box-shadow: 0 5px 15px rgba($color: #000000, $alpha: 0.2);
        }
        h2 {
          color: #424242;
          font-size: 14px;
          font-weight: normal;
        }
        h3 {
          color: #666;
          font-weight: normal;
          font-size: 13px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
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
