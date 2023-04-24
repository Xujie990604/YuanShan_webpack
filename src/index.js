
import './assets/css/common.css';
import './assets/css/index.scss'
import './assets/font/iconfont.css'

import { add } from './js/utils'
add(10, 20)

// 通过 js 的方式来使用图片，因为这个图片会转化成 base64 影响阅读，先注释掉
// import a from './assets/images/a.png' 
// const img = new Image();
// img.src = a;
// document.getElementById('image').appendChild(img)

// class Person {
//   constructor(name) {
//     this.name = name
//   }

//   say() {
//     console.log(`我的名字是 ${this.name}`);
//   }
// }

// const xujie = new Person('xujie')
// xujie.say()

// 新增装饰器的使用(还未进入 ECMA 规范，Babel 无法处理，需要下载特殊的插件)
// @log('hello')
// class myClass{}
// function log(text) {
//   return function(target) {
//     target.prototype.logger = () => `${text}, ${target.name}`
//   }
// }
// const test = new myClass()
// console.log(test.logger());