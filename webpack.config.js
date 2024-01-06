const path = require('path');
const fs = require("fs")

const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
// webpack 构建费时插件
const speedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const smp = new speedMeasureWebpackPlugin()
// 打包文件体积大小
const webpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// 压缩 CSS
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// 压缩 JS
const terserWebpackPlugin = require('terser-webpack-plugin')
// 清除无用的 CSS
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
// 文件匹配模式
const glob = require('glob');
// 导入项目中的全局变量文件
const { version } = require('./project.config');

// 打印环境变量(NODE_ENV 属性不是 Node 原生自带的属性，是通过 cross-env 插件注入(注入的值是从命令行读取的)的)
console.log('当前打包的 node 环境变量 process.env.NODE_ENV=', process.env.NODE_ENV)

// 根据当前的环境变量来读取对应的环境变量文件
let envPath = path.resolve(__dirname, `.env.${process.env.NODE_ENV}`);
// 使用 dotenv 插件，将环境变量文件中的内容注入到 process.env 中
require('dotenv').config({
  path: fs.existsSync(envPath) ? envPath : path.resolve(__dirname, '.env')
})


// webpack 的配置信息
const config = {
  // NOTE:默认配置为 development 模式，但是这个可以通过命令行 mode 字段来覆盖该配置项
  // 采用不同的模式，webpack 会启用不同的内置优化
  mode: 'development',
  // 开始应用程序打包过程的一个或者多个起点
  // 该项目使用多页面(MPA)配置形式
  entry: { 
    main: './src/entry/index.ts',
    about: './src/entry/about.js'
  },
  // 告知 webpack 如何向硬盘写入编译文件
  output: {
    filename: '[name].js',                       // 输出的文件名，[name] 为 webpack 中的占位符， 与 entry 中的 key 名相对应
    path: path.join(__dirname, 'dist'), // 输出的文件目录 
    // ! 打包生成的静态网站，在真实服务器上请求资源路径的基础路径(这个值需要和 dist 放在服务器上的目录层级一致)
    // publicPath: '/app/web/'
  },
  // NOTE: 根据环境进行区分  
  // 配置是否生成，以及如何生成 source map
  // devtool: '',
  // 本地服务器配置
  devServer: {
    static: {
      // ! 仅在本地服务器启动时生效
      // 配置提供静态文件的目录。本地服务器启动时不必 copy 此文件夹到 内存中的 dist 中，会直接来当前项目的 public 文件夹磁盘位置读取
      directory: path.join(__dirname, 'public')
    },
    hot: true,         // 开启热更新
    compress: true,    // 是否启动压缩 public 中的目录中的内容
    port: 8080,        // 服务器端口号
    open: true         // 是否自动打开浏览器
  },
  // webpack 优化
  optimization: {
    // 开启压缩
    minimize: true,
    // 自己选择 plugin 来进行压缩
    minimizer: [
      // NOTE: 代码压缩后，代码可读性变低。真实项目需要开启，但是学习项目暂时关闭
      // 添加 css 压缩配置
      // new optimizeCssAssetsWebpackPlugin({}),
      // 添加压缩 JS 配置
      // new terserWebpackPlugin({})
    ]
  },
  // 放置将某些包打包到 bundle 中，而是在运行时再去外部获取
  externals: {
    // key 是包名，value 是该包在 window 上注册的全局变量名
    jquery: "jQuery"
  },
  // 配置模块如何解析
  resolve: {
    // 配置别名
    alias: { 
      '@': path.join(__dirname, 'src')
    },
    // 可以省略后缀名，解析时会根据配置数组中的后缀名逐个尝试
    extensions: ['.js', '.ts', '.json'],
    // 解析模块时需要优先搜索的目录
    modules: [path.join(__dirname, 'src'), 'node_modules']
  },
  // 如何处理项目中不同类型的模块
  module: {
    rules: [
      {
        // 匹配所有的 css/sass/scss 文件
        test: /\.(s[ac]|c)ss$/i,
        // 需要使用的 loader (有顺序要求，从后向前或者从右向左执行)
        use: [
          // 把 css 语句写入 style 标签中，然后插入到 html 页面里
          // ! 推荐使用 miniCssExtractPlugin 来优化，不再推荐使用 style-loader
          // 'style-loader',
          // 把 css 语句以 css 文件的形式引入 HTML 中
          miniCssExtractPlugin.loader,
          // 开启缓存 loader 结果
          'cache-loader',
          // 识别 css 语句，将 CSS 转化成 Commonjs 模块
          'css-loader',
          // 先使用 post-loader 解析 postcss 语法，然后再使用 css-loader 解析 css 语法
          'postcss-loader',
          // 解析 scss 语法，编译成 CSS 语句
          'sass-loader',
        ],
      },
      {
        // 匹配图片资源
        test: /\.(jpe?g|png|gif)$/i,
        type: 'asset',
        generator: {
          // 输出文件位置与文件名
          filename: 'images/[name][hash:8][ext]'
        },
        parser: {
          dataUrlCondition: {
            // 50kb 以下图片转成 base64
            maxSize: 50 * 1024
          }
        }
      },
      {
        // 匹配字体图标
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: 'asset',
        generator: {
          // 输出文件位置以及文件名
          filename: "fonts/[name][hash:8][ext]"
        },
        parser: {
          dataUrlCondition: {
            // 10kb 以下转成 base64
            maxSize: 10 * 1024
          }
        }
      },
      {
        // 匹配 js 文件
        test: /\.js$/i,
        use: [
          {
            // 使用多线程工具，开启多线程打包
            // 每个 worker 都是一个独立的 node.js 进程，进程之间通信也会有性能损耗，请仅在耗时的操作中使用此 loader
            loader: 'thread-loader',
            options: {
              worker: 3
            }
          },
          {
            loader: 'babel-loader',
            options: {
              // 启动缓存
              cacheDirectory: true,
              // 通过 npm 下载的 babel 官方维护预设   
              // 预设名和 babelrc.js 中对应, 因为 babel-loader 的配置项过多，所以单独抽离出一个文件来
              presets: ['@babel/preset-env'],
            }
          }
        ]
      },
      // 匹配 TS 文件
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  // 配置 webpack 插件
  plugins: [ 
    // 创建一个 html 文件，并把 webpack 打包后的静态文件自动插入到这个 html 文件当中
    // 多页应用配置形式
    new htmlWebpackPlugin({
      template: './template/index.html',  // 使用指定 HTML 文件当做创建的模板
      filename: 'index.html', // 生成文件的名称
      chunks: ['main'] // 指定入口文件
    }),
    new htmlWebpackPlugin({
      template: './template/about.html',
      filename: 'about.html',
      chunks: ['about']
    }),
    // 每次打包前清除之前的 dist 文件夹
    new CleanWebpackPlugin(),
    //把 css 语句以 css 文件的形式引入 HTML 中
    new miniCssExtractPlugin({
      filename: '[name].[hash:8].css'
    }),
    // 将 public 目录原封不到那个的复制到 dist 目录下
    new copyWebpackPlugin({
      patterns: [
        {
          from: './public',
          to: './'
        }
      ]
    }),
    // 分析构建产物中都引入哪些模块，模块的体积是多少
    new webpackBundleAnalyzer({
      analyzerMode: 'disabled',  // 是否启动展示结果的网页
      generateStatsFile: true    // 是否生成 status.json 文件
    }),
    // 清除无用的 CSS
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.resolve(__dirname, 'src')}/**/*`, {
        nodir: true, // 过滤资源夹结果
      }),
    }),
    // 在浏览器中注入全局变量(一般搭配着环境变量文件使用)
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify(process.env.BASE_URL),
      VERSION: JSON.stringify(version)
    })
  ]
}

/**
 * 将 webpack 配置文件以函数的形式导出
 * @param {object} env 环境
 * @param {object} argv webpack 配置项
 * @returns {object} 最终生成的 webpack 配置项
 */
module.exports = (env, argv) => {
  console.log('env', env);
  // 打印当前的 mode 值
  console.log('webpack 当前的打包模式 argv.mode=', argv.mode);
  // NOTE:可以根据不同的模式来变更打包的行为
  if (argv.mode === 'development') {
    // 本地开发： 打包慢一点，但是能在源码级别的调试错误
    config.devtool = "eval-cheap-module-source-map"
  } else if (argv.mode === "production") {
    // 生产环境：调试只能看到模块信息和行信息，不能看到源码
    config.devtool = "nosources-source-map"
    // 开启代码压缩来降低最终代码的体积
    config.optimization.minimizer.push(new terserWebpackPlugin({}), new optimizeCssAssetsWebpackPlugin({}))
  } else {
    // 自定义：代码中没有 sourceMap 源码是经过 loader 处理过的
    config.devtool = 'hidden-cheap-source-map'
  }

  // 输出 webpack 构建费时数据
  return smp.wrap(config)
}