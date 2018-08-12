var proxyList = {
  '/': {
    // target: 'https://charger.91231.net/', //jj
    changeOrigin: true,
    pathRewrite: {
      // '^/ns-index': ''
    }
  }
}

console.log('设置代理中...', proxyList)
module.exports = {
  proxyList
}
