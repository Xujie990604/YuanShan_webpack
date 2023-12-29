/**
 * @file 别名的使用
 */

// 1. 导入文件时使用 别名
import { add } from '@/utils/utils'
add(10, 20)

// 2. HTML 中使用别名
// ! 在 webpack 中必须使用 require() 来处理资源的路径 
$('<img>')
  .attr('src', require('@/assets/images/biggerThan50KB.png'))
  .appendTo('body')

export default {}