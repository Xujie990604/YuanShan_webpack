# Webpack 项目介绍

- 使用别名来优化使用
- 配置可省略后缀名
- 配置 webpack 解析模块优先搜索目录，加快 webpack 的查找速度
- 使用 externals 配置选项实现`「从输出的 bundle 中排除依赖」`
- baber-loader 开启缓存，提升重复构建的速度

## 插件

1. htmlWebpackPlugin 自动生成 HTML 模板并且引入资源文件
2. CleanWebpackPlugin 打包之前清除之前的文件
3. miniCssExtractPlugin 把 CSS 以外链文件的形式引入 HTML 中
4. copyWebpackPlugin 复制指定文件夹到 dist 目录中
5. speed-measure-webpack-plugin 查看 webpack 的构建费时情况
6. webpack-bundle-analyzer 查看打包文件的体积大小

## loader

1. style-loader 把 css 语句写入 style 标签中，然后插入到 html 页面里
2. css-loader 识别 CSS 语法
3. postcss-loader 识别 postcss 语法
4. sass-loader 识别 scss 语法
5. babel-loader 识别 ES6+ 语法并转移成兼容指定浏览器的 JS 代码
6. thread-loader 开启多线程打包优化
7. cache-loader 缓存一些性能开销较大的 loader 的处理结果

## 本地服务器

- 开启本地服务器

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

## sourceMap

- 根据本地环境和生产环境进行区分
