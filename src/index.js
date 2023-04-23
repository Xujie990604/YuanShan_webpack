
import './assets/css/common.css';
import './assets/css/index.scss'

import './assets/font/iconfont.css'

console.log('test webpack xujie');

import a from './assets/images/a.png' // 引入图片


const img = new Image();
img.src = a;

document.getElementById('image').appendChild(img)