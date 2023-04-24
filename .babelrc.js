module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        // useBuiltIns: false 默认值，无视浏览器兼容配置，引入所有 polyfill
        // useBuiltIns: entry 根据配置的浏览器兼容，引入浏览器不兼容的 polyfill
        // useBuiltIns: usage 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 polyfill，实现了按需添加
        // Polyfill 是一个 js 库，主要抚平不同浏览器之间对 js 实现的差异
        useBuiltIns: 'entry',
        corejs: "3.9.1",
        targets: {
          chrome: "58",
          ie: "11"
        }
      }
    ]
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', {legacy: true}],       // 对于类装饰器语法的支持
    ['@babel/plugin-proposal-class-properties', {loose: true}],   // 对于类属性的支持
    ["@babel/plugin-proposal-private-methods", { "loose": true }],
    ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
  ]
}