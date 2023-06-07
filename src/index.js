// 测试别名的使用
import { add } from '@/js/utils'
add(10, 20)

// 可以直接使用 public 目录中的内容
const img = document.createElement('img')
img.src = 'b.png'
document.body.appendChild(img)

// 测试 css 语句是否起作用 && 测试 postCSS 添加前缀功能
import './assets/css/common.css'
const p = document.createElement('p')
p.textContent = '我是一个段落标签'
document.body.appendChild(p)

// 测试 scss 语句是否能识别
import './assets/css/index.scss'
const welcome = document.createElement('div')
welcome.textContent = 'Welcome to'
welcome.className = 'welcome'
document.body.appendChild(welcome)