module.exports = {
  // 配置 postCSS 插件
  plugins: [
    // 可以将现代 CSS 转换为大多数浏览器可以理解的内容，并根据目标浏览器或运行时环境确定所需的 polyfill
    // 已经内置了 autoprefixer，自动添加浏览器前缀
    require('postcss-preset-env')
  ]
}