const Mock = require('mockjs')

module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
    // productionSourceMap: true,
    // chainWebpack: config => {
    //   config.plugins.delete('prefetch')
    // },
    before(app, serve) {
      // 用户接口
      app.post('/api/user/login', (req, res) => {
        // 登录
        res.json({
          status: '0', // 状态
          msg: 'success', // 返回消息
          data: {
            username: 'jack', // 用户名
            token: 'testToken', // token
          },
        })
      })
      app.post('/api/user/logout', (req, res) => {
        // 退出登录
        res.json({
          status: '0', // 状态
          msg: 'success', // 返回消息
        })
      })
      // 产品
      app.get('/api/products', (req, res) => {
        // 获取商品列表
        res.json(
          Mock.mock({
            status: '0',
            data: {
              'list|9-18': [
                {
                  'id|10001-11000': 0, // id
                  tradeName: '@cname', // 商品名
                  details: '测试', // 子标题
                  // name: '@cname',
                  // subTitle: '测试',
                  price: 1799, // 价格
                  // 主图
                  mainImage:
                    '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/acd0f27496ccdf81ef42124c35e8bfc4.png?thumb=1&amp;w=200&amp;h=138&amp;f=webp&amp;q=90',
                },
              ],
            },
          })
        )
      })
      // 购物车接口
      app.get('/api/carts', (req, res) => {
        // 获取购物中所有商品
        res.json({
          code: 200,
          status: '0',
          data: {
            cartProductVoList: [
              {
                id: 5247245,
                userId: 42452,
                productId: 12312,
                quantity: 1,
                productName: '测试商品',
                productSubtitle: '测试商品子标题',
                productMainImage: null,
                productPrice: 10,
                productStatus: 1,
                productTotalPrice: 10,
                productStock: 111,
                productSelected: true,
              },
            ],
            selectedAll: true,
            cartTotalPrice: 10,
          },
        })
      })
      app.post('/api/carts', (req, res) => {
        // 添加商品到购物车
        res.json({
          code: 200,
          status: '0',
          data: {
            cartProductVoList: [
              // 返回添加后的商品列表
              {
                id: 1,
                userId: 13,
                productId: 1,
                quantity: 12,
                productName: 'iphone7',
                productSubtitle: '双十一促销',
                productMainImage: 'mainimage.jpg',
                productPrice: 7199.22,
                productStatus: 1,
                productTotalPrice: 86390.64,
                productStock: 86,
                productSelected: true,
              },
              {
                id: 2,
                userId: 13,
                productId: 2,
                quantity: 1,
                productName: 'oppo R8',
                productSubtitle: 'oppo促销进行中',
                productMainImage: 'mainimage.jpg',
                productPrice: 2999.11,
                productStatus: 1,
                productTotalPrice: 2999.11,
                productStock: 86,
                productSelected: true,
              },
            ],
            selectedAll: true,
            cartTotalPrice: 89389.75,
          },
        })
      })
      app.get('/api/carts/products/sum', (req, res) => {
        // 获取购物中所有商品数量总和
        res.json({
          code: 200,
          status: '0',
          data: 5,
        })
      })
      // 订单
      app.get('/api/order/list', (req, res) => {
        // 获取订单列表
        res.json({
          code: 200,
          status: '0',
          data: 5,
        })
      })
    },
  },
}
