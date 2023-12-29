/**
 * @file 资源文件路径的引入
 */

// 1. 不使用 require() 处理路径
// ! 路径字符串不会被处理，导致找不到对应的资源
$('<img>')
  .attr('src', '../assets/images/biggerThan50KB.png')
  .appendTo('body')


// 2. 使用 require() 处理路径
// * 路径字符串会被处理，能找到对应的资源
$('<img>')
  .attr('src', require('../assets/images/biggerThan50KB.png'))
  .appendTo('body')


// 3. 不使用 require() 处理路径，但是引入资源是 public 目录中的
// * 路径字符串不会被处理，但是由于 public 目录中的内容会被拷贝到 dist 中，能找到对应的资源
$('<img>')
  .attr('src', 'b.png')
  .appendTo('body')