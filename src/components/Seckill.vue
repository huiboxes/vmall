<template>
  <div class="flash-sale">
    <div class="box-header">
      <h2 class="box-title">嗨！秒杀</h2>
      <div class="slide-control">
        <span class="slide-left slide-button" @click="prev">
          <i class="fa fa-angle-left"></i>
        </span>
        <span class="divider"></span>
        <span class="slide-right slide-button" @click="next">
          <i class="fa fa-angle-right"></i>
        </span>
      </div>
    </div>
    <div class="box-sale">
      <div class="sale-count-down">
        <div class="sale-round">{{ round }} 场</div>
        <img src="/imgs/seckill-icon.jpg" style="" alt="小米闪购" />
        <div class="time-left">距离结束还有</div>
        <div class="count-down">
          <span>{{ hour }}</span>
          <i>:</i>
          <span>{{ minute }}</span>
          <i>:</i>
          <span>{{ second }}</span>
        </div>
      </div>
      <slide :slideItems="slideItems" ref="slide"></slide>
    </div>
    <div class="box-footer">
      <transition-group name="fade">
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
      </transition-group>
      <p><el-link type="info" href="/#/order/pub">查看更多</el-link></p>
    </div>
  </div>
</template>

<script>
import Slide from '@/components/Slide.vue'

export default {
  data() {
    return {
      round: new Date().getHours() + ' : 00',
      hour: '',
      minute: '',
      second: '',
      countDownTimer: '',
      T: '',
      slideItems: [
      ],
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
    countDown() {
      clearInterval(this.countDownTimer)
      this.countDownTimer = setInterval(() => {
        this.timeComput()
      }, 1000)
    },
    timeComput() {
      let hour = new Date().getHours() - new Date().getHours() + 1
      let minute = 60 - new Date().getMinutes() - 1
      let second = 60 - new Date().getSeconds() - 1

      this.hour = this.addZero(hour)
      this.minute = this.addZero(minute)
      this.second = this.addZero(second)
    },
    getPurchasedOrder() {
      this.axios.get('/orders/pub').then(res => {
        this.purchasedOrder = res.list
      })
    },
    getSeckillProduct() {
      this.axios.get('/seckill/products').then(res => {
        this.slideItems = res
      })
    },
    addZero(m) {
      return m < 10 ? '0' + m : m
    },
    prev() {
      this.$refs.slide.prev()
    },
    next() {
      this.$refs.slide.next()
    },
    // 轮询最新抢购订单
    loopPubOrderState() {
      this.T = setInterval(() => {
        this.axios.get('/orders/pub').then(res => {
          this.purchasedOrder = res.list
        })
      }, 1000)
    },
  },
  components: {
    Slide,
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
  mounted() {
    this.countDown()
    this.getSeckillProduct()
    // this.loopPubOrderState()
  },
  destroyed() {
    // clearInterval(this.T)
  },
}
</script>

<style lang="scss">
.flash-sale {
  position: relative;
  width: 1226px;
  height: auto;
  padding-top: 4px;
  margin: 0 auto;
}

.box-header {
  text-align: start;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .box-title {
    display: inline-block;
    font-size: 22px;
    font-weight: 200;
    line-height: 58px;
    color: #333;
  }
}

.box-sale {
  display: flex;
  .sale-count-down {
    display: inline-block;
    width: 234px;
    height: 390px;
    padding-top: 39px;
    border-top: 1px solid #e53935;
    background: #f1eded;
    box-sizing: border-box;
    text-align: center;
    .sale-round {
      font-size: 21px;
      color: #ef3a3b;
      padding-top: 15px;
    }

    .time-left {
      color: rgba(0, 0, 0, 0.54);
      font-size: 15px;
    }

    img {
      margin: 25px auto;
    }

    .count-down {
      width: 168px;
      margin: 28px auto 0;
      display: flex;
      span {
        display: block;
        width: 46px;
        height: 46px;
        background: #605751;
        color: #fff;
        font-size: 24px;
        line-height: 46px;
        text-align: center;
      }

      i {
        display: block;
        width: 15px;
        height: 46px;
        line-height: 46px;
        color: #605751;
        font-size: 28px;
        font-style: normal;
        text-align: center;
      }
    }
  }
}

.box-footer {
  padding: 12px;
  background-color: rgb(224, 222, 222);
  text-align: center;
  font-size: 14px;
  .pub-order-bar {
    color: #555;
  }
}

.slide-control {
  display: flex;
  border: 1px solid #e0e0e0;
  .slide-button {
    padding: 0 4px;
    font-size: 20px;
    font-weight: 800;
    line-height: 20px;
    color: #b0b0b0;
    text-align: center;
    transition: color 0.5s;
    cursor: pointer;
    &:hover {
      color: #ff6700;
    }

    i {
      width: 26px;
      height: 18px;
    }
  }

  .divider {
    width: 1px;
    height: 21px;
    background: #e0e0e0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
