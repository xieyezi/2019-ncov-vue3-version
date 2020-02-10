const path = require('path')
// 安装compression-webpack-plugin 压缩js为gzip
const CompressionWebpackPlugin = require('compression-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  productionSourceMap: false,  // 生产环境的 source map
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('page', resolve('src/page'))
      .set('utils', resolve('src/utils'))
  },
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        test: /\.js$|\.css$/,
        threshold: 1024
      })
    ]
  }
}
