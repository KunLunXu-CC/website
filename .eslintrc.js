module.exports = {
  // root: true,                   // 作用的目录是根目录
  parser: "babel-eslint",          //  Parsing error: Unexpected character '@'
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',        // 按照模块的方式解析
  },
  env: {
    browser: true,              // 开发环境配置表示可以使用浏览器的方法
    node: true                  //
  },
  globals: {
    $console: true,
    GLOBAL_SERVICE: true,
    PUBLICKEY: true,
    _DEV_: true,
  },
  plugins: [
    'react',
    'react-hooks'
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    "react/prop-types": 0,         // 防止在React组件定义中丢失props验证:  'data' is missing in props validation
    "react/display-name": 0,       // 防止在React组件定义中丢失displayName: Component definition is missing display name

    "no-extra-semi": 0,            // 禁止不必要的分号
    "no-extra-boolean-cast": 0,   // 禁止不必要的布尔转换
  }
}
