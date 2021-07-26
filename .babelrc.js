module.exports = {
  'plugins': [
    // 按需加载 - antd
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": "css"
    }, "antd"],
    // 按需加载 - qyrc
    ["import", {
      "libraryName": "qyrc",
      "libraryDirectory": "es",
      "style": true
    }, "qyrc"],
  ],
  'presets': [
    '@babel/preset-react',
    '@babel/preset-env'
  ]
}
