# Webpack 项目介绍

## webpack

- 使用 webpack 5

## cross-env

- 运行`跨平台`设置和`使用环境变量`的脚本
- windows 本身不支持 NODE_ENV=development 的设置方式，引入 cross-env 来解决该问题

## CSS

### postcss

- 添加对 postcss 的支持
- 使用 postcss-preset-env 插件来自动添加浏览器前缀

### scss

- 添加对 scss 语法的支持

## 图片，字体资源

- 不再使用 file-loader url-loader 来处理图片资源
- 而是使用 webpack5 的资源模块来处理图片，字体
