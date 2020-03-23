// 配置gzip需要的东西
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  productionSourceMap: false, //不打包map文件 
  devServer: {
    open: true // 自动更新
  },
  configureWebpack: config => {
    if(process.env.NODE_ENV === 'production') { // 判断是否是生产环境
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css$/,
            threshold: 10240,
            deleteOriginalAssets: true // 是否删除源文件,取值false/true
          })
        ]
      }
    }
  }
}
