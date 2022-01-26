const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
      createProxyMiddleware('/api', {
          target: 'http://3.36.172.8:3001/',
          changeOrigin: true
      })
  )
};