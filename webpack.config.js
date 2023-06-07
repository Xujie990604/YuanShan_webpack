const path = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')

// 打印环境变量
console.log('process.env.NODE_ENV=', process.env.NODE_ENV)

const config = {
  mode: 'development',       // 配置文件的模式为 development
  entry: './src/index.js',   // 打包入口地址
  output: {
    filename: 'bundle.js',                       // 输出的文件名
    path: path.join(__dirname, 'dist'), // 输出的文件目录 
    // ! 仅在生产环境生效
    // ! 打包生成的静态网站，在真实服务器上请求资源路径的基础路径(这个值需要和 dist 放在服务器上的目录层级一致)
    // publicPath: '/dist'
  },
  // TODO: 根据环境进行区分  
  // 本地开发：eval-cheap-module-source-map 打包慢一点，但是能够看到源代码的错误
  // 生产环境：node 不想让其他人看到源代码
  devtool: 'eval-cheap-module-source-map',
  // 本地服务器配置
  devServer: {
    static: {
      // ! 仅在本地服务器启动时生效
      // ! 当页面请求静态资源时，会将 public 当作本地服务器的根目录
      // 静态文件目录，本地服务器启动时不必 copy 此文件夹到 内存中的 dist 中，会直接来 当前项目的 public 文件夹磁盘位置读取
      directory: path.join(__dirname, 'public')
    },
    compress: true,    // 是否启动压缩 public 中的目录中的内容
    port: 8080,        // 服务器端口号
    open: false        // 是否自动打开浏览器
  },
  resolve: {
    alias: { //配置别名
      '@': path.join(__dirname, 'src'),
      'assets': path.join(__dirname, 'src/assets')
    },
    extensions: ['.js', 'ts', '.json'],  // 可以省略后缀名，会根据列表中的后缀名逐个尝试
    modules: [path.join(__dirname, 'src'), 'node_modules']  // 解析模块时需要优先搜索的目录
  },
  module: {
    rules: [ // 转换规则
      {
        // 匹配所有的 css/sass/scss 文件
        test: /\.(s[ac]|c)ss$/i,
        // 需要使用的 loader (有顺序要求，从后向前执行)
        use: [
          // 把 css 语句写入 style 标签中，然后插入到 html 页面里
          // ! 推荐使用 miniCssExtractPlugin 来优化
          // 'style-loader',
          // 把 css 语句以 css 文件的形式引入 HTML 中
          miniCssExtractPlugin.loader,
          // 识别 css 语句
          'css-loader',
          // 先使用 post-loader 解析 postcss 语法，然后再使用 css-loader 解析 css 语法
          'postcss-loader',
          // 解析 scss 语法
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
            loader: 'babel-loader',
            options: {
              presets: [
                // 通过 npm 下载的 babel 官方维护预设   
                // 预设名和 babelrc.js 中对应
                '@babel/preset-env'
              ],
            }
          }
        ]
      }
    ]
  },
  plugins: [ // 配置插件
    // 创建一个 html 文件，并把 webpack 打包后的静态文件自动插入到这个 html 文件当中
    new htmlWebpackPlugin({
      // 使用指定 HTML 文件当做创建的模板
      template: './index.html'
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
    })
  ]
}

module.exports = (env, argv) => {
  // 打印当前的 mode 值
  console.log('argv.mode=', argv.mode);
  // TODO:可以根据不同的模式来变更打包的行为
  return config
}