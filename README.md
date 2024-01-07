# Webpack 项目介绍

- 使用别名来优化使用
- 配置文件可省略后缀名

## 一、webpack 的进阶优化

### 1.1 优化构建速度

1. speed-measure-webpack-plugin 查看 webpack 的构建费时情况
2. 配置 webpack 解析模块优先搜索目录，加快 webpack 的查找速度
3. cache-loader 开启 CSS 缓存，提升重复构建的速度
4. baber-loader 开启 JS 缓存，提升重复构建的速度
5. 使用 externals 配置选项实现`「从输出的 bundle 中排除依赖」`， 在运行阶段通过 CDN(内容分发网络) 来获取
6. thread-loader 开启多进程打包优化(适合大项目构建优化，在一些小项目中反而因为进程之间的通信而增加构建时间)

### 1.2 优化构建结果

1. webpack-bundle-analyzer 查看 webpack 的构建结果
2. optimize-css-assets-webpack-plugin 压缩 CSS
3. terser-webpack-plugin 压缩 JS(webpack 默认开启)
4. purgecss-webpack-plugin 清除无用的 CSS
5. 在生产环境下开启 tree-shaking ，剔除没有使用的代码，以降低包的体积(Tree-shaking 可以使得项目最终构建 Bundle 结果中只包含你实际需要的代码)

### 1.3 优化运行时体验(首屏加载速度)

1. 代码懒加载(借助 ES6 的 import() 函数来实现动态加载)

## 二、插件

1. htmlWebpackPlugin 自动生成 HTML 模板并且引入资源文件
2. CleanWebpackPlugin 打包之前清除之前的文件
3. miniCssExtractPlugin 把 CSS 以外链文件的形式引入 HTML 中
4. copyWebpackPlugin 复制指定文件夹到 dist 目录中
5. speed-measure-webpack-plugin 查看 webpack 的构建费时情况
6. webpack-bundle-analyzer 查看打包文件的体积大小
7. optimize-css-assets-webpack-plugin 压缩 CSS
8. terser-webpack-plugin 压缩 JS(webpack 默认开启)
9. purgecss-webpack-plugin 清除无用的 CSS
10. webpack.DefinePlugin 在浏览器中注入全局变量

## 三、loader

1. style-loader 把 css 语句写入 style 标签中，然后插入到 html 页面里
2. css-loader 识别 CSS 语法
3. postcss-loader 识别 postcss 语法
4. sass-loader 识别 scss 语法，编译成 CSS 语句
5. babel-loader 识别 ES6+ 语法并转移成兼容指定浏览器的 JS 代码
6. cache-loader 缓存一些性能开销较大的 loader 的处理结果
7. thread-loader 开启多进程打包优化

## 四、本地服务器

- 开启本地服务器
- 开发阶段开启热更新

## 五、cross-env

- 运行`跨平台`设置和`使用环境变量`的脚本
- windows 本身不支持 NODE_ENV=development 的设置方式，引入 cross-env 来解决该问题

## 六、CSS

### 6.1 postcss

- 添加对 postcss 的支持
- 使用 postcss-preset-env 插件来转换 CSS 高级语句

### 6.2 scss

- 添加对 scss 语法的支持

## 七、图片，字体资源

- 不再使用 file-loader url-loader 来处理图片资源
- 而是使用 webpack5 的资源模块来处理图片，字体

## 八、sourceMap

- 根据本地环境和生产环境进行区分
