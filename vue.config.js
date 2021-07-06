module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://172.20.87.117:8893/api',
        changeOrigin: true,
        pathRewrite: {
          '/api': '',
        },
      },
    },
  },
}
