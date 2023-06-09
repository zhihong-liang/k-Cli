// 开发环境

const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const webpack = require('webpack')

module.exports = merge(base, {
  mode: 'development',
  devServer: {
    // 自定义端口号
    // port:7000,
    // 自动打开浏览器
    open: true,
    hot: true  // 开启热更新
  },
  // source-map的作用：代码报错时，能快速定位到出错位置
  // 使用eval-cheap-module-source-map模式，能具体定位到源码位置和源码展示，适合开发模式，体积较小
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    // 定义全局变量
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify('development')
          // 这里可以定义你的环境变量
          // VUE_APP_URL: JSON.stringify('https://xxx.com')
        }
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(css|s[cs]ss)$/,
        use: [
          "style-loader", // 将 CSS 样式注入到 DOM 中
          "css-loader", // 解析 CSS 文件
          "sass-loader" // 将 SCSS 文件编译为 CSS
        ]
      }
    ]
  }
})