//@ts-check
import { add, addWithoutType, colorArray } from '@/utils/utils'

// 文件开启 @ts-check 之后，会按照 JsDoc 的类型标注进行类型校验
add(1, 2)
add('100', '200')
add('100')
add()

// 这个函数在定义时没有使用 Jsdoc 所以无法进行类型校验
addWithoutType(100, '200')

console.log(colorArray[0]);
colorArray.push(100)

export default {}