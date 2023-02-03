module.exports = {
  'plugins': [
    // 按需加载 - @kunlunxu/brick
    ["import", {
      "libraryName": "@kunlunxu/brick",
      "libraryDirectory": "es",
      "style": true
    }, "@kunlunxu/brick"],
  ],
  'presets': [
    ['@babel/preset-react', {
      runtime: 'automatic',
    }],
    '@babel/preset-env'
  ]
}
