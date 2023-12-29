/**
 * @file 对于 CSS 语句的应用与处理
 */

// TODO: 添加更多类型的 SCSS 语句和 POSTCSS 功能

// 1. 是否识别 CSS 语句 
import '@/assets/css/common.css'
$('<p>')
  .addClass('red')
  .text('元素会应用上 CSS 指定的红色')
  .appendTo('body')

// 2. POSTCSS 给 CSS 语句添加前缀功能
import '@/assets/css/common.css'
$('<p>')
  .addClass('transform')
  .text('元素上的 transform 属性会被添加上浏览器前缀 ')
  .appendTo('body')

// 3. 是否识别 SCSS 语句
import '@/assets/css/index.scss'
$('<p>')
  .addClass('scss-test')
  .text('元素用应用上 SCSS 指定的黄色')
  .appendTo('body')