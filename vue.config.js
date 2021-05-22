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
    before(app, serve) {
      app.get('/api/products', (req, res) => {
        res.json(
          Mock.mock({
            code: 200,
            status: '0',
            data: {
              'list|9-18': [
                {
                  'id|10001-11000': 0,
                  tradeName: '@cname',
                  details: '测试',
                  // name: '@cname',
                  // subTitle: '测试',
                  price: 1799,
                  mainImage:
                    '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/acd0f27496ccdf81ef42124c35e8bfc4.png?thumb=1&amp;w=200&amp;h=138&amp;f=webp&amp;q=90',
                },
              ],
            },
          })
        )
      })
    },
  },
}
