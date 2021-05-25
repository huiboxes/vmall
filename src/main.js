import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vueSwiper from 'vue-awesome-swiper'
import VueLazyLoad from 'vue-lazyload'
import { Message } from 'element-ui'
import store from './store'
import storage from './storage'

import App from './App.vue'
import './plugins/element.js'

axios.defaults.baseURL = '/api'
axios.defaults.timeout = 8000

axios.interceptors.response.use(
  function(response) {
    let res = response.data
    if (res.status == 0) {
      return res.data
    } else if (res.status == -1) {
      window.location.href = '/#/login'
      return Promise.reject(res)
    } else {
      Message.warning(res.msg)
      return Promise.reject(res)
    }
  },
  function(error) {
    let res = error.response
    console.log(res,res.statusText);
    Message.error(res.statusText)
    return Promise.reject(error)
  }
)

axios.interceptors.request.use(
  config => {
    const token = storage.getItem('token')
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
  store,
  router,
  render: h => h(App),
}).$mount('#app')
