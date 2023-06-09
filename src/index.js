// 1.测试别名的使用
// import { add } from '@/js/utils'
// add(10, 20)

// 2.可以直接使用 public 目录中的内容
// const img = document.createElement('img')
// img.src = 'b.png'
// document.body.appendChild(img)

// 3.测试 css 语句是否起作用 && 测试 postCSS 添加前缀功能
// import './assets/css/common.css'
// const p = document.createElement('p')
// p.textContent = '我是一个段落标签'
// document.body.appendChild(p)

// 4.测试 scss 语句是否能识别
// import './assets/css/index.scss'
// const welcome = document.createElement('div')
// welcome.textContent = 'Welcome to'
// welcome.className = 'welcome'
// document.body.appendChild(welcome)

// 5.测试图片资源的引入
// 5.1小于 50KB, 打包后资源会被变成 base64 编码
// const lessThan50 = document.createElement('img')
// // ! 图片需要手动使用 require 来导入
// const lessThan50Img = require('./assets/images/lessThan50KB.png')
// lessThan50.src = lessThan50Img
// document.body.appendChild(lessThan50)

// 5.2大于 50KB, 打包后资源不会被变成 base64 编码
// const biggerThan50 = document.createElement('img')
// // ! 图片需要手动使用 require 来导入
// const biggerThan50Img = require('./assets/images/biggerThan50KB.png')
// biggerThan50.src = biggerThan50Img
// document.body.appendChild(biggerThan50)

// 6.测试字体图标的引用
// import './assets/font/iconfont.css'
// const icon = document.createElement('i')
// icon.classList.add('iconfont', 'icon-shouye')
// document.body.appendChild(icon)

// 7.测试 ES6 语法
// class Author {
//   name = 'xujie'
//   age = 18
//   email = 'coder_xujie@163.com'

//   info = () => {
//     return {
//       name: this.name,
//       age: this.age,
//       email: this.email
//     }
//   }
// }
// const author = new Author()
// export default Author

// 8. 测试 JQ 的 CDN 引用
import $ from 'jquery'

$('.content').text('使用JQ插入的内容')

