// 开发环境

const { merge } = require("webpack-merge");
const base = require("./webpack.base");
const webpack = require('webpack')

module.exports = merge(base, {
  mode: 'production',
  // 使用nosources-source-map，只能定位源码位置，不能源码展示，体积较小，适合生产模式
  devtool: 'nosources-source-map',
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify('prodction')
        }
      }
    })
  ]
})