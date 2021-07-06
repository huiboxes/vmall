<template>
  <div class="sale-slide">
    <ul class="slide-container" :style="transformStyle">
      <li
        class="slide-item"
        v-for="(item, index) in slideItems"
        :key="index"
        :style="{ 'border-top-color': item.topColor }"
      >
        <a href="javascript:;">
          <img :src="proxyHost + item.productImgae" :alt="item.productName" />
          <h3 class="name ellipsis">{{ item.productName }}</h3>
          <span class="desc ellipsis">{{ item.detail }}</span>
          <div class="price">
            <span>{{ item.newPrice }}元</span>
            <del>{{ item.oldPrice }}元</del>
          </div>
        </a>
        <button
          :class="['btn', { deactive: btnDeActive }]"
          @click="buy(item.id)"
        >
          立即抢购
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { proxyHost } from '@/config.js'

export default {
  data() {
    return {
      slideIndex: 0,
      slideTimer: '',
      Xvalue: 0,
      btnDeActive: false,
      proxyHost: proxyHost.replace('8893', '8890'),
      T: '',
    }
  },
  props: {
    slideItems: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    next() {
      const lastIndex = parseInt(this.slideItems.length / 4)
      if (this.slideIndex < lastIndex) {
        if (
          this.slideIndex === lastIndex - 1 &&
          this.slideItems.length % 4 !== 0
        ) {
          this.slideIndex += 1
          this.Xvalue = -(
            (this.slideIndex - 1) * 992 +
            (this.slideItems.length % 4) * 248
          )
        } else {
          this.slideIndex += 1
          this.Xvalue = -(this.slideIndex * 992)
        }
      } else {
        this.slideIndex = 0
        this.Xvalue = 0
      }
    },
    prev() {
      const lastIndex = parseInt(this.slideItems.length / 4)
      if (this.slideIndex > 0) {
        this.slideIndex -= 1
        this.Xvalue = -(this.slideIndex * 992)
      } else {
        this.slideIndex = lastIndex
        this.Xvalue = -(lastIndex * 992)
      }
    },
    play() {
      clearInterval(this.slideTimer)
      this.slideTimer = setInterval(() => {
        this.next()
      }, 8000)
    },
    buy(id) {
      if (this.btnDeActive) return
      if (!this.username.length) {
        this.$message.warning('请先登录')
        return
      }
      this.axios
        .post('/seckill', {
          productId: id,
        })
        .then(res => {
          if (res.msg !== '排队中') return Promise.reject('抱歉，抢购失败请稍后再试')
          this.loopSeckillState(id)
        })
        // .catch(err => {
        //   this.$message.warning(err)
        // })
    },
    loopSeckillState(productId) {
      this.btnDeActive = true
      this.T = setInterval(() => {
        this.axios.get(`/seckill/result?productId=${productId}`).then(res => {
          if (res.msg.length > 2) {
            clearInterval(this.T)
            this.btnDeActive = false
            this.goOrderList()
          } else if (res.msg === '-1') {
            clearInterval(this.T)
            this.btnDeActive = false
            this.$message.warning('抱歉，抢购失败请稍后再试')
          }
        })
      }, 300)
    },
    goOrderList() {
      this.$router.push('/order/list')
    },
  },
  computed: {
    ...mapState(['username']),
    transformStyle() {
      return {
        transform: `translate3d(${this.Xvalue}px, 0, 0)`,
      }
    },  
  },
  mounted() {
    this.play()
  },
}
</script>

<style lang="scss">
.sale-slide {
  width: 978px;
  margin-left: 14px;
  overflow: hidden;
  position: relative;
  display: flex;
  .slide-container {
    height: 390px;
    display: flex;
    transition: all 1s ease-in-out;
    .slide-item {
      padding-bottom: 100px;
      display: block;
      width: 234px;
      margin-right: 14px;
      border-top-width: 1px;
      border-top-style: solid;
      text-align: center;
      background: #fff;

      a {
        display: block;
        height: 300px;
        padding-top: 39px;
      }

      img {
        display: block;
        width: 160px;
        height: 160px;
        margin: 0 37px 22px;
      }

      .name {
        display: block;
        margin: 0 20px 3px;
        font-size: 14px;
        font-weight: 400;
        color: #212121;
      }

      .desc {
        display: block;
        height: 18px;
        margin: 0 20px 12px;
        font-size: 12px;
        color: #b0b0b0;
      }

      .price {
        margin: 0 10px 14px;
        font-size: 14px;
        color: #f84d50;
        del {
          color: #b0b0b0;
          margin-left: 4px;
        }
      }

      .deactive {
        background-color: #b0b0b0;
        cursor: wait;
      }
    }
  }
}

.ellipsis {
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
