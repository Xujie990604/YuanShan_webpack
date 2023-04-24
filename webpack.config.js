const path = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')

console.log('process.env.NODE_ENV=', process.env.NODE_ENV) // 打印环境变量

const config = {
  mode: 'development',      // 模式
  entry: './src/index.js',   // 打包入口地址
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  devtool: 'eval-cheap-module-source-map',    // 打包慢一点，但是能够看到源代码的错误 TODO: 根据环境进行区分  
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')  // 静态文件目录，本地开发时不必 copy 此文件夹到 dist，可以直接来 public 文件夹读取
    },
    compress: true,    // 是否启动压缩 public 中的目录中的内容
    port: 8080,        // 服务器端口号
    open: false         // 是否自动打开浏览器
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
        test: /\.(s[ac]|c)ss$/i,     // 匹配所有的 css/sass/scss 文件
        use: [
          // 'style-loader',             // 把 css 文件写入 style 然后插入文件
          miniCssExtractPlugin.loader,   // 把 css 文件以 css 文件的形式引入 HTML 中
          'css-loader', 
          'postcss-loader',              // 先使用 post-loader 解析 postcss 语法，然后再使用 css-loader 解析
          'sass-loader',    
        ],  // 需要使用的 loader (有顺序要求，从后向前执行)
      },
      {
        test: /\.(jpe?g|png|gif)$/i,       // 对于图片资源的处理
        type: 'asset',
        generator: {
          filename: 'images/[name][hash:8][ext]'  // 输出文件位置与文件名
        },
        parser: {
          dataUrlCondition: {
            maxSize: 50 * 1024    // 50kb 以下图片转成 base64
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,   // 对于字体图标的处理
        type: 'asset',
        generator: {
          filename: "fonts/[name][hash:8][ext]"     // 输出文件位置以及文件名
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024                // 10kb 以下转成 base64
          }
        }
      },
      {
        test: /\.js$/i,                   // 对于 js 文件的转化
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'  // 通过 npm 下载的 babel 官方维护预设
              ],
            }
          }
        ]
      }
    ]
  },
  plugins: [ // 配置插件
    new htmlWebpackPlugin({   // 将打包后 js css 等文件自动引入到 html 模板中
      template: './index.html'
    }),
    new CleanWebpackPlugin(),          // 每次打包前清除之前的 dist 文件夹
    new miniCssExtractPlugin({ //把 css 文件以 css 文件的形式引入 HTML 中
      filename: '[name].[hash:8].css'
    })
  ]
}

module.exports = (env, argv) => {
  console.log('argv.mode=', argv.mode);  // 打印 mode 值
  // 可以根据不同的模式来修改 config 配置文件
  return config
}