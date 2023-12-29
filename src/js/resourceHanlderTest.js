/**
 * @file 资源文件的处理策略
 */

// 1. 资源图片小于 50KB 
// 打包后，资源会变成 base64 编码
$('<img>')
  .attr('src', require('../assets/images/lessThan50KB.png'))
  .appendTo('body')

// 2. 资源图片大于 50KB 
// 打包后，资源不会变成 base64 编码
$('<img>')
  .attr('src', require('../assets/images/biggerThan50KB.png'))
  .appendTo('body')

// 3. 测试字体图标的引用
import '@/assets/font/iconfont.css'
$('<i>')
  .addClass('iconfont icon-shouye')
  .appendTo('body')