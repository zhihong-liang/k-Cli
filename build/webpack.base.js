const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { VueLoaderPlugin } = require('vue-loader')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')

module.exports = {
  // 入口文件
  entry: {
    main: './src/main.js'
  },
  // 输出
  output: {
    // 输出到 dist 文件夹
    path: path.resolve(__dirname, '../dist'),
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
    new VueLoaderPlugin(),
    new ProgressBarPlugin({
      format: ` build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
    })
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: 'asset',
        parser: {
          // 转 base64 的条件
          dataUrlCondition: {
            maxSize: 25 * 1024,
          },
        },
        generator: {
          filename: 'images/[contenthash][ext][query]',
        }
      },
      {
        test: /\.js$/,
        //使用include来指定编译文件夹
        include: path.resolve(__dirname, '../src'),
        //使用exclude排除指定文件夹
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      // 多进程打包，可以大大提高构建的速度，使用方法是将thread-loader放在比较费时间的loader之前，比如babel-loader
      {
        test: /\.js$/,
        use: [
          'thread-loader',
          'babel-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      assets: '~/assets',
      tools: '~/tools'
    },
    // 引入文件时省略后缀
    extensions: ['.js', '.ts', '.less', '.vue']
  },
  // 开启内存缓存
  cache: true
}