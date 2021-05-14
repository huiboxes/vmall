import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Message } from 'element-ui'
import vueSwiper from 'vue-awesome-swiper'
import VueLazyLoad from 'vue-lazyload'

import App from './App.vue'
import './plugins/element.js'

axios.defaults.baseURL = '/api'
axios.defaults.timeout = 8000

axios.interceptors.response.use(
  function(response) {
    let res = response.data
    if (res.status == 0) {
      return res.data
    }
    // else if (res.status == -1) {
    //   window.location.href = '/#/login'
    //   return Promise.reject(res)
    // } else {
    //   // Message.warning(res.msg)
    //   return Promise.reject(res)
    // }
  },
  error => {
    let res = error.response
    Message.error(res.data.message)
    return Promise.reject(error)
  }
)

axios.interceptors.request.use(
  config => {
    const token = 'token'
    if (token) {
      config.headers.common['Authorization'] = token
    }
    return config
  },
  () => {
    return Promise.reject(console.error())
  }
)

Vue.use(VueAxios, axios)
Vue.use(vueSwiper)
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg',
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
