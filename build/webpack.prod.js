// 生产环境

// const webpack = require('webpack')
const { merge } = require("webpack-merge");
const base = require("./webpack.base");
const TerserPlugin = require("terser-webpack-plugin")

// mini-css-extract-plugin：可将css代码打包成一个单独的css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩 css 代码
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// webpack-bundle-analyzer: 审查打包后的体积分布，进而进行相应的体积优化
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = merge(base, {
  // tree-shaking简单说作用就是：只打包用到的代码，没用到的代码不打包，而webpack5默认开启tree-shaking，当打包的mode为production时，自动开启tree-shaking进行优化
  mode: 'production',

  // 使用nosources-source-map，只能定位源码位置，不能源码展示，体积较小，适合生产模式
  devtool: 'nosources-source-map',

  plugins: [
    new MiniCssExtractPlugin({
      // 将css代码输出到dist/styles文件夹下
      filename: 'styles/chunk-[contenthash].css',
      ignoreOrder: true
    }),
    new BundleAnalyzerPlugin()
    // 通常情况下，process.env.NODE_ENV 的值在 webpack 构建过程中会根据你的配置自动注入，因此不需要手动定义。
    // new webpack.DefinePlugin({
    //   process: {
    //     env: {
    //       NODE_ENV: JSON.stringify('prodction')
    //     }
    //   }
    // }),
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
    ]
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // 去重压缩css
      // 压缩 js 代码
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true // 去除 console
          }
        }
      })
    ]
  }
})