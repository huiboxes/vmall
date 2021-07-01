module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://172.30.16.57:8893/api',
        changeOrigin: true,
        pathRewrite: {
          '/api': '',
        },
      },
    },
  },
}
