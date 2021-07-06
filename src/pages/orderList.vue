<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <loading v-if="loading"></loading>
          <div class="order" v-for="order in list" :key="order.orderId">
            <div class="order-title">
              <div class="item-info fl">
                {{ formatDate(order.createTime) }}
                <span>|</span>
                {{ order.receiverName }}
                <span>|</span>
                订单号：{{ order.orderId }}
                <span>|</span>
                {{ order.paymentTypeDesc }}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{ order.payment }}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div
                  class="good-list"
                  v-for="(item, i) in order.orderItemVoList"
                  :key="i"
                >
                  <div class="good-img">
                    <img v-lazy="proxyHost + item.productImage" alt="" />
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{ item.productName }}</div>
                    <div class="p-money" style="font-size: 14px;">
                      {{ item.totalPrice + 'X' + item.quantity }}
                      <span style="font-size: 12px;color: #b0b0b0;">
                        {{
                          (order.payment - 0) * 10 === item.totalPrice
                            ? '由于是前100名抢购到，实付只需一折'
                            : ''
                        }}
                        {{
                          (order.payment - 0) * 2 === item.totalPrice
                            ? '由于是前500名抢购到，实付只需五折'
                            : ''
                        }}
                        {{
                          (order.payment - 0) / 0.8 === item.totalPrice
                            ? '由于是前1000名抢购到，实付只需八折'
                            : ''
                        }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="order.status == 20">
                <a href="javascript:;">{{ order.statusDesc }}</a>
              </div>
              <div class="good-state fr" v-else>
                <a href="javascript:;" @click="goPay(order.orderId)">{{
                  order.statusDesc
                }}</a>
                <a
                  href="javascript:;"
                  class="icon-del-wrapper"
                  @click="delOrder(order.orderId)"
                >
                  <svg class="icon icon-del">
                    <use xlink:href="#icon-del"></use>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            style="position: absolute; width: 0px; height: 0px; overflow: hidden;"
          >
            <defs>
              <symbol id="icon-del" viewBox="0 0 32 32">
                <title>delete</title>
                <path
                  d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z"
                  class="path1"
                ></path>
                <path
                  d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
                  class="path2"
                ></path>
                <path
                  d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
                  class="path3"
                ></path>
                <path
                  d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
                  class="path4"
                ></path>
              </symbol>
            </defs>
          </svg>
          <el-pagination
            v-if="list.length"
            class="pagination"
            background
            layout="prev, pager, next"
            :pageSize="pageSize"
            :total="total"
            @current-change="handleChange"
          >
          </el-pagination>
          <no-data
            v-if="!loading && list.length == 0"
            description="当前暂无提交的订单记录"
          ></no-data>
        </div>
      </div>
    </div>
    <modal
      title="删除确认"
      btnType="1"
      :showModal="showDelModal"
      @cancel="showDelModal = false"
      @submit="submitOrder"
    >
      <template v-slot:body>
        <p>您确认要删除此订单吗？</p>
      </template>
    </modal>
  </div>
</template>
<script>
import OrderHeader from '@/components/OrderHeader'
import Loading from '@/components/Loading'
import NoData from '@/components/NoData'
import Modal from '@/components/Modal'
import { Pagination, Button } from 'element-ui'
import infiniteScroll from 'vue-infinite-scroll'
import { proxyHost } from '@/config.js'
export default {
  name: 'order-list',
  components: {
    OrderHeader,
    Loading,
    NoData,
    Modal,
    [Pagination.name]: Pagination,
    [Button.name]: Button,
  },
  directives: {
    infiniteScroll,
  },
  data() {
    return {
      loading: false,
      list: [],
      pageSize: 10,
      pageNum: 1,
      total: 0,
      showNextPage: true, //加载更多：是否显示按钮
      busy: false, //滚动加载，是否触发
      orderId: '',
      showDelModal: false,
      T: undefined,
      proxyHost: proxyHost.replace('8893', '8890'),
    }
  },
  mounted() {
    this.getOrderList()
  },
  methods: {
    getOrderList() {
      this.loading = true
      this.busy = true
      this.axios
        .get('/orders', {
          params: {
            pageSize: 10,
            pageNum: this.pageNum,
          },
        })
        .then(res => {
          this.loading = false
          this.list = []
          this.list = this.list.concat(res)
          this.total = res.total
          this.showNextPage = res.hasNextPage
          this.busy = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    goPay(orderNo) {
      this.$router.push({
        path: '/order/pay',
        query: {
          orderNo,
        },
      })
    },
    delOrder(orderId) {
      this.orderId = orderId
      this.showDelModal = true
    },
    submitOrder() {
      if (!this.T) {
        this.T = setTimeout(() => {
          this.T = null
          this.axios.delete(`/orders/${this.orderId}`).then(res => {
            this.$message.success(res.msg)
          })
          this.showDelModal = false
          this.list = []
          this.getOrderList()
        }, 500)
      }
    },
    // 第一种方法：分页器
    handleChange(pageNum) {
      this.pageNum = pageNum
      this.getOrderList()
    },
    formatDate(time) {
      var date = new Date(time)

      var year = date.getFullYear(),
        month = date.getMonth() + 1, //月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds()
      var newTime =
        year +
        '-' +
        (month < 10 ? '0' + month : month) +
        '-' +
        (day < 10 ? '0' + day : day) +
        ' ' +
        (hour < 10 ? '0' + hour : hour) +
        ':' +
        (min < 10 ? '0' + min : min) +
        ':' +
        (sec < 10 ? '0' + sec : sec)
      return newTime
    },
  },
}
</script>
<style lang="scss">
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';
@import './../assets/scss/button.scss';
.order-list {
  .wrapper {
    background-color: $colorJ;
    padding-top: 33px;
    padding-bottom: 110px;
    .order-box {
      .order {
        @include border();
        background-color: $colorG;
        margin-bottom: 31px;
        &:last-child {
          margin-bottom: 0;
        }
        .order-title {
          @include height(74px);
          background-color: $colorK;
          padding: 0 43px;
          font-size: 16px;
          color: $colorC;
          .item-info {
            span {
              margin: 0 9px;
            }
          }
          .money {
            font-size: 26px;
            color: $colorB;
          }
        }
        .order-content {
          padding: 0 43px;
          .good-box {
            width: 88%;
            .good-list {
              display: flex;
              align-items: center;
              height: 145px;
              .good-img {
                width: 112px;
                img {
                  width: 100%;
                }
              }
              .good-name {
                font-size: 20px;
                color: $colorB;
              }
            }
          }
          .good-state {
            @include height(145px);
            font-size: 20px;
            color: $colorA;
            a {
              color: $colorA;
            }
            .icon-del-wrapper {
              position: relative;
              bottom: 100%;
              display: inline-block;
              height: 100%;
              width: 100%;
              .icon {
                position: absolute;
                top: -50px;
                right: -30px;
                width: 20px;
                height: 20px;
                fill: #666666;
                vertical-align: middle;
                &:hover {
                  fill: #f75345;
                }
              }
            }
          }
        }
      }
      .pagination {
        text-align: right;
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: $colorA;
      }
      .el-button--primary {
        background-color: $colorA;
        border-color: $colorA;
      }
      .load-more,
      .scroll-more {
        text-align: center;
      }
    }
  }
}
</style>
