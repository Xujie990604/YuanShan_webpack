// 变量值会根据当前构建环境的不同，去不同的文件中读取
// test .env.test
// dev  .env
// prod .env.prod
console.log(BASE_URL);

// 这个变量没有根据构建环境来区分，只是用插件将它注入到了浏览器的全局对象中
console.log(VERSION);
