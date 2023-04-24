
import './assets/css/common.css';
import './assets/css/index.scss'

import './assets/font/iconfont.css'

console.log('test webpack xujie');

// 通过 js 的方式来使用图片，因为这个图片会转化成 base64 影响阅读，先注释掉
// import a from './assets/images/a.png' 
// const img = new Image();
// img.src = a;
// document.getElementById('image').appendChild(img)

class Person {
  constructor(name) {
    this.name = name
  }

  say() {
    console.log(`我的名字是 ${this.name}`);
  }
}

const xujie = new Person('xujie')
xujie.say()