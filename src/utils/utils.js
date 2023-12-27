// @ts-check
// NOTE: 在工具函数中添加 @ts-check 也有好处，他会对你写的 jsdoc 语法进行校验，纠正你的错误

/**
 * 两数相加
 * @param {number} num1 
 * @param {number} [num2] 
 * @returns {void}
 */
export function add(num1, num2 = 0) {
  console.log(`相加后的结果是${num1 + num2}`);
}

export function addWithoutType(number1, number2) {
  return number1 + number2
}

/**
 * 不正确的类型标注, 必选参数没有放到后面
 * @param {number} [number1] 
 * @param {number} number2 
 * @returns {number}
 */
export function addWithErrType(number1, number2) {
  return number1 + number2
}

/**
 * 颜色数组
 * @type {Array<string>}
 */
export const colorArray = ['red', 'blur', 'yellow']

