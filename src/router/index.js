import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Index from '@/pages/index'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'index',
          component: Index,
        },
        {
          path: '/product/:id',
          name: 'product',
          component: () => import('@/pages/product.vue'),
        },
        {
          path: '/detail/:id',
          name: 'detail',
          component: () => import('@/pages/detail.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/pages/cart.vue'),
      meta: {
        auth: true,
      },
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/pages/searchResult.vue'),
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/pages/order.vue'),
      children: [
        {
          path: 'list',
          name: 'order-list',
          component: () => import('@/pages/orderList.vue'),
          require: {
            auth: true,
          },
        },
        {
          path: 'confirm',
          name: 'order-confirm',
          component: () => import('@/pages/orderConfirm.vue'),
        },
        {
          path: 'pay',
          name: 'order-pay',
          component: () => import('@/pages/orderPay.vue'),
        },
        {
          path: 'alipay',
          name: 'alipay',
          component: () => import('@/pages/alipay.vue'),
        },
        {
          path: 'pub',
          name: 'order-pub',
          component: () => import('@/pages/orderPub.vue'),
        },
      ],
    },
  ],
})

// router.beforeEach((to, from, next) => {
//   let isLogin
//   if (isLogin) {
//     if (to.matched.some(record => record.meta.auth)) {
//       next({
//         path: '/login',
//         query: {
//           redirect: to.fullPath,
//         },
//       })
//     } else {
//       next()
//     }
//   } else {
//     // 保存用户信息
//   }
// })

export default router
