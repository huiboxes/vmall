const Mock = require('mockjs')

module.exports = {
  devServer: {
    // host: 'localhost',
    // port: 8080,
    proxy: {
      '/api': {
        target: 'http://192.168.31.102:8893',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': '',
        // },
      },
    },
    // productionSourceMap: true,
    // chainWebpack: config => {
    //   config.plugins.delete('prefetch')
    // },
    // before(app, serve) {
    //   // 用户接口
    //   app.post('/api/user/login', (req, res) => {
    //     // 登录
    //     res.json({
    //       status: '0', // 状态
    //       msg: 'success', // 返回消息
    //       data: {
    //         username: 'jack', // 用户名
    //         token: 'testToken', // token
    //       },
    //     })
    //   })
    //   app.post('/api/user/logout', (req, res) => {
    //     // 退出登录
    //     res.json({
    //       status: '0', // 状态
    //       msg: 'success', // 返回消息
    //     })
    //   })
    //   app.post('/api/user/register', (req, res) => {
    //     // 注册接口
    //     res.json({
    //       status: '0', // 状态
    //       msg: 'success', // 返回消息
    //     })
    //   })
    //   // 产品
    //   app.get('/api/products', (req, res) => {
    //     // 获取商品列表
    //     res.json(
    //       Mock.mock({
    //         status: '0',
    //         msg: 'success',
    //         data: {
    //           'list|9-18': [
    //             {
    //               'id|10001-11000': 0, // id
    //               name: '@cname', // 商品名
    //               subTitle: '测试', // 子标题
    //               price: 1799, // 价格
    //               // 主图
    //               mainImage:
    //                 '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/acd0f27496ccdf81ef42124c35e8bfc4.png?thumb=1&amp;w=200&amp;h=138&amp;f=webp&amp;q=90',
    //             },
    //           ],
    //         },
    //       })
    //     )
    //   })
    //   app.get('/api/products/:id', (req, res) => {
    //     // 获取商品列表
    //     res.json(
    //       Mock.mock({
    //         status: '0',
    //         data: {
    //           'id|10001-11000': 0, // id
    //           tradeName: '@cname', // 商品名
    //           details: '测试', // 子标题
    //           price: 1799, // 价格
    //           // 主图
    //           mainImage:
    //             '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/acd0f27496ccdf81ef42124c35e8bfc4.png?thumb=1&amp;w=200&amp;h=138&amp;f=webp&amp;q=90',
    //         },
    //       })
    //     )
    //   })
    //   // 购物车接口
    //   app.get('/api/carts', (req, res) => {
    //     // 获取购物中所有商品
    //     res.json({
    //       code: 200,
    //       status: '0',
    //       data: {
    //         cartProductVoList: [
    //           {
    //             id: 5247245,
    //             userId: 42452,
    //             productId: 12312,
    //             quantity: 1,
    //             productName: '测试商品',
    //             productSubtitle: '测试商品子标题',
    //             productMainImage: null,
    //             productPrice: 10,
    //             productStatus: 1,
    //             productTotalPrice: 10,
    //             productStock: 111,
    //             productSelected: true,
    //           },
    //         ],
    //         selectedAll: true,
    //         cartTotalPrice: 10,
    //       },
    //     })
    //   })
    //   app.get('/api/carts/products/sum', (req, res) => {
    //     // 获取购物中所有商品数量总
    //     res.json({
    //       code: 200,
    //       status: '0',
    //       data: 5,
    //     })
    //   })
    //   app.post('/api/carts', (req, res) => {
    //     // 添加商品到购物车
    //     res.json({
    //       code: 200,
    //       status: '0',
    //       data: {
    //         cartProductVoList: [
    //           // 返回添加后的商品列表
    //           {
    //             id: 1,
    //             userId: 13,
    //             productId: 1,
    //             quantity: 12,
    //             productName: 'iphone7',
    //             productSubtitle: '双十一促销',
    //             productMainImage: 'mainimage.jpg',
    //             productPrice: 7199.22,
    //             productStatus: 1,
    //             productTotalPrice: 86390.64,
    //             productStock: 86,
    //             productSelected: true,
    //           },
    //           {
    //             id: 2,
    //             userId: 13,
    //             productId: 2,
    //             quantity: 1,
    //             productName: 'oppo R8',
    //             productSubtitle: 'oppo促销进行中',
    //             productMainImage: 'mainimage.jpg',
    //             productPrice: 2999.11,
    //             productStatus: 1,
    //             productTotalPrice: 2999.11,
    //             productStock: 86,
    //             productSelected: true,
    //           },
    //         ],
    //         selectedAll: true,
    //         cartTotalPrice: 89389.75,
    //       },
    //     })
    //   })
    //   app.put('/api/carts/selectAll', (req, res) => {
    //     // 购物车全选
    //     res.json({
    //       code: 200,
    //       status: '0',
    //       data: 5,
    //     })
    //   })
    //   app.put('/api/carts/unSelectAll', (req, res) => {
    //     // 取消购物车全选
    //     res.json({
    //       code: 200,
    //       status: '0',
    //       data: 5,
    //     })
    //   })
    //   app.put('/api/carts/:productId', (req, res) => {
    //     // 更新购物车中的商品，传购买数量和是否选中
    //     res.json({
    //       code: 200,
    //       status: '0',
    //       data: 5,
    //     })
    //   })
    //   app.delete('/api/carts/:productId', (req, res) => {
    //     // 删除购物车中某个商品
    //     res.json({
    //       code: 200,
    //       status: '0',
    //       data: 5,
    //     })
    //   })

    //   // 订单
    //   app.get('/api/orders', (req, res) => {
    //     // 获取订单列表
    //     res.json({
    //       status: 0,
    //       data: {
    //         list: [
    //           {
    //             orderNo: 1485158676346, // 订单号
    //             payment: 2999.11, // 款项
    //             paymentType: 1, // 支付类型
    //             paymentTypeDesc: '在线支付', // 支付类型描述
    //             postage: 0, // 邮费
    //             status: 10, // 订单状态，0-已取消，10-未付款，20-已付款，40-已发货，50-交易成功，60-交易关闭
    //             statusDesc: '未支付', // 状态描述
    //             paymentTime: '2020-02-11 12:27:18', // 支付时间
    //             sendTime: '2020-02-11 12:27:18', // 发货时间
    //             endTime: '2020-02-11 12:27:18', // 结束时间
    //             closeTime: '2020-02-11 12:27:18', // 订单关闭时间
    //             createTime: '2020-01-23 16:04:36', // 创建订单时间
    //             receiverName: 'geely', // 收货人
    //             orderItemVoList: [
    //               // 订单中的商品
    //               {
    //                 orderNo: 1485158676346, // 所属订单号
    //                 productId: 2, // 产品ID
    //                 productName: 'oppo Ace', // 产品名
    //                 productImage: 'mainimage.jpg', // 产品主图
    //                 currentUnitPrice: 2999.11, // 当前价格
    //                 quantity: 1, // 数量
    //                 totalPrice: 2999.11, // 当前产品的总共价格
    //               },
    //             ],
    //           },
    //           {
    //             orderNo: 1485158676316, // 订单号
    //             payment: 2999.11, // 款项
    //             paymentType: 1, // 支付类型
    //             paymentTypeDesc: '在线支付', // 支付类型描述
    //             postage: 0, // 邮费
    //             status: 10, // 订单状态，0-已取消，10-未付款，20-已付款，40-已发货，50-交易成功，60-交易关闭
    //             statusDesc: '未支付', // 状态描述
    //             paymentTime: '2020-02-11 12:27:18', // 支付时间
    //             sendTime: '2020-02-11 12:27:18', // 发货时间
    //             endTime: '2020-02-11 12:27:18', // 结束时间
    //             closeTime: '2020-02-11 12:27:18', // 订单关闭时间
    //             createTime: '2020-01-23 16:04:36', // 创建订单时间
    //             receiverName: 'geely', // 收货人
    //             orderItemVoList: [
    //               // 订单中的商品
    //               {
    //                 orderNo: 1485158676346, // 所属订单号
    //                 productId: 2, // 产品ID
    //                 productName: 'oppo Ace', // 产品名
    //                 productImage: 'mainimage.jpg', // 产品主图
    //                 currentUnitPrice: 2999.11, // 当前价格
    //                 quantity: 1, // 数量
    //                 totalPrice: 2999.11, // 当前产品的总共价格
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     })
    //   })
    //   app.get('/api/orders/:orderId', (req, res) => {
    //     // 获取订单详细信息
    //     res.json({
    //       status: 0,
    //       data: {
    //         orderNo: 1485158676346, // 订单号
    //         payment: 2999.11, // 款项
    //         paymentType: 1, // 支付类型
    //         paymentTypeDesc: '在线支付', // 支付类型描述
    //         postage: 0, // 邮费
    //         status: 10, // 订单状态，0-已取消，10-未付款，20-已付款，40-已发货，50-交易成功，60-交易关闭
    //         statusDesc: '未支付', // 状态描述
    //         paymentTime: '2020-02-11 12:27:18', // 支付时间
    //         sendTime: '2020-02-11 12:27:18', // 发货时间
    //         endTime: '2020-02-11 12:27:18', // 结束时间
    //         closeTime: '2020-02-11 12:27:18', // 订单关闭时间
    //         createTime: '2020-01-23 16:04:36', // 创建订单时间
    //         receiverName: 'geely', // 收货人
    //         orderItemVoList: [
    //           // 订单中的商品
    //           {
    //             orderNo: 1485158676346, // 所属订单号
    //             productId: 2, // 产品ID
    //             productName: 'oppo Ace', // 产品名
    //             productImage: 'mainimage.jpg', // 产品主图
    //             currentUnitPrice: 2999.11, // 当前价格
    //             quantity: 1, // 数量
    //             totalPrice: 2999.11, // 当前产品的总共价格
    //           },
    //         ],
    //         shippingId: 3, // 地址id
    //         shippingVo: {
    //           receiverName: '小白', // 收货人
    //           receiverMobile: '12313215151', // 手机号
    //           receiverProvince: '四川省', // 省份
    //           receiverCity: '广元市', // 市
    //           receiverDistrict: '利州区', // 区
    //           receiverAddress: '雪峰村', // 街道
    //           receiverZip: '100000', // 邮编
    //         },
    //       },
    //     })
    //   })
    //   app.post('/api/orders', (req, res) => {
    //     // 提交订单
    //     res.json({
    //       code: 200,
    //       status: '0',
    //       data: 5,
    //     })
    //   })
    //   app.put('/api/orders/:orderId', (req, res) => {
    //     // 取消订单
    //     res.json({
    //       code: 200,
    //       status: '0',
    //       data: 5,
    //     })
    //   })

    //   // 支付接口
    //   app.post('/api/pay', (req, res) => {
    //     // 获取订单列表
    //     res.json({
    //       code: 200,
    //       status: '0',
    //       data: 5,
    //     })
    //   })

    //   // 地址接口
    //   app.get('/api/shoppings', (req, res) => {
    //     // 获取地址列表
    //     res.json({
    //       status: 0,
    //       msg: 'success',
    //       data: {
    //         list: [
    //           {
    //             id: 4, // 地址id
    //             userId: 13, // 用户id
    //             receiverName: '小白', // 收货人
    //             receiverMobile: '18688888888', // 手机
    //             receiverProvince: '四川省', // 省份
    //             receiverCity: '广元市', // 市
    //             receiverDistrict: '利州区', // 区
    //             receiverAddress: '雪峰村', // 街道
    //             receiverZip: '100000', // 邮编
    //           },
    //           {
    //             id: 5, // 地址id
    //             userId: 16, // 用户id
    //             receiverName: '小黑', // 收货人
    //             receiverMobile: '18688884444', // 手机
    //             receiverProvince: '四川省', // 省份
    //             receiverCity: '广元市', // 市
    //             receiverDistrict: '利州区', // 区
    //             receiverAddress: '雪峰村', // 街道
    //             receiverZip: '100000', // 邮编
    //           },
    //         ],
    //       },
    //     })
    //   })
    //   app.get('/api/shoppings/:shippingId', (req, res) => {
    //     // 查看某一个地址
    //     res.json({
    //       code: 200,
    //       status: '0',
    //       data: {
    //         id: 4, // 地址id
    //         userId: 13, // 用户id
    //         receiverName: '小白', // 收货人
    //         receiverMobile: '18688888888', // 手机
    //         receiverProvince: '四川省', // 省份
    //         receiverCity: '广元市', // 市
    //         receiverDistrict: '利州区', // 区
    //         receiverAddress: '雪峰村', // 街道
    //         receiverZip: '100000', // 邮编
    //       },
    //     })
    //   })
    //   app.post('/api/shoppings', (req, res) => {
    //     // 添加地址
    //     /**
    //      * 前端发送
    //      * receiveName 收件人
    //      * receiverMobile 手机号
    //      * receiverProvince 省
    //      * receiverCity 市
    //      * receiverDistrict= 区
    //      * receiverAddress 村
    //      * receiverZip 邮编
    //      *  */

    //     res.json({
    //       code: 200,
    //       status: '0',
    //       data: 5,
    //     })
    //   })
    //   app.put('/api/shoppings/:shippingId', (req, res) => {
    //     // 更新地址，传的值和添加一样
    //     res.json({
    //       code: 200,
    //       status: '0',
    //       data: 5,
    //     })
    //   })
    //   app.delete('/api/shoppings/:shippingId', (req, res) => {
    //     // 删除地址
    //     res.json({
    //       code: 200,
    //       status: '0',
    //       data: 5,
    //     })
    //   })

    //   // 搜索接口
    //   app.get('/api/search/:productId', (req, res) => {
    //     // 搜索商品
    //     res.json(
    //       Mock.mock({
    //         status: '0',
    //         msg: 'success',
    //         data: {
    //           'list|9-18': [
    //             {
    //               'id|10001-11000': 0, // id
    //               name: '@cname', // 商品名
    //               subTitle: '测试', // 子标题
    //               'price|1299-2299': 1799, // 价格
    //               // 主图
    //               mainImage:
    //                 '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/acd0f27496ccdf81ef42124c35e8bfc4.png?thumb=1&amp;w=200&amp;h=138&amp;f=webp&amp;q=90',
    //             },
    //           ],
    //         },
    //       })
    //     )
    //   })
    // },
  },
}
