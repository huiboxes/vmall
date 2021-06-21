<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    // if (this.$cookie.get('userId')) {
    //   this.getUser()
    //   this.getCartCount()
    // }
  },
  methods: {
    getUser() {
      this.axios.get('/user').then((res = {}) => {
        this.$store.dispatch('saveUserName', res.username)
      })
    },
    getCartCount() {
      this.axios.get('/carts/products/sum').then((res = 0) => {
        this.$store.dispatch('saveCartCount', res)
      })
    },
  },
}
</script>

<style>
@import './assets/scss/reset.scss';
@import './assets/scss/base.scss';

* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
</style>
