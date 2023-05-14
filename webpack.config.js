const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  // 模式
  mode: 'development',
  // 入口文件
  entry: {
    main: './src/main.js'
  },
  // 输出
  output: {
    // 输出到 dist 文件夹
    path: path.resolve(__dirname, './dist'),
    // js 文件夹下
    filename: 'js/chunk-[contenthash].js',
    // 每次打包前自动清除旧的 dist
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 选择模板 public/index.html
      template: './public/index.html',
      // 打包后的名字
      filename: 'index.html',
      // js文件插入 body里
      inject: 'body'
    }),
    new MiniCssExtractPlugin({
      // 将css代码输出到dist/styles文件夹下
      filename: 'styles/chunk-[contenthash].css',
      ignoreOrder: true
    })
  ],
  module: {
    rules: [
      {
        // 匹配文件后缀的规则
        test: /\.(css|s[cs]ss)$/,
        use: [
          // loader执行顺序是从右到左
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: 'asset',
        parser: {
          // 转 base64 的条件
          dataUrlCondition: {
            maxSize: 25 * 1024,
          },
          generator: {
            filename: 'image/chunk-[contenthash][ext][query]',
          }
        }
      }
    ]
  }
}