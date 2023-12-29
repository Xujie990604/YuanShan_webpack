// 测试 ES6 语法
class Author {
  name = 'xujie'
  age = 18
  email = 'coder_xujie@163.com'

  info = () => {
    return {
      name: this.name,
      age: this.age,
      email: this.email
    }
  }
}
const author = new Author()
console.log(author);
export default Author