let userName: string = 'xujie'

interface IAddFunction{
  (a:number, b: number): number
}

const add: IAddFunction = function(num1, num2) {
  return num1 + num2
}

console.log(userName);
console.log(add(1,2));
