module.exports = {
  presets: [
    // 配置规则
    // @babel/preset-env：转换的一套现成规则
    "@babel/preset-env",
    // 支持vue中的jsx语法
    "@vue/babel-preset-jsx"
  ],
  // 配置插件
  // @babel/plugin-transform-runtime：转换async/await所需插件
  plugins: ["@babel/plugin-transform-runtime"]
}