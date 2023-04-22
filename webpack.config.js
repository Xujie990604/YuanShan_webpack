const path = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

console.log('process.env.NODE_ENV=', process.env.NODE_ENV) // 打印环境变量

const config = {
  mode: 'development',      // 模式
  entry: './src/index.js',   // 打包入口地址
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')  // 静态文件目录，本地开发时不必 copy 此文件夹到 dist，可以直接来 public 文件夹读取
    },
    compress: true,    // 是否启动压缩 public 中的目录中的内容
    port: 8080,        // 服务器端口号
    open: true         // 是否自动打开浏览器
  },
  module: {
    rules: [ // 转换规则
      {
        test: /\.css$/,     // 匹配所有的 css 文件
        use: ['style-loader', 'css-loader'],  // 需要使用的 loader (有顺序要求，从后向前执行)
      }
    ]
  },
  plugins: [ // 配置插件
    new htmlWebpackPlugin({   // 将打包后 js css 等文件自动引入到 html 模板中
      template: './index.html'
    }),
    new CleanWebpackPlugin()          // 每次打包前清除之前的 dist 文件夹
  ]
}

module.exports = (env, argv) => {
  console.log('argv.mode=', argv.mode);  // 打印 mode 值
  // 可以根据不同的模式来修改 config 配置文件
  return config
}