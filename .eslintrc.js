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

    // 个性化定制
    "indent": [1, 2],                                                 // 缩进: 2个空格
    "max-len": [1, { "code": 100 }],                                  // 单行不超过 100
    "camelcase": [1],                                                 // 使用驼峰
    "keyword-spacing": [1],                                           // 强制关键字周围空格的一致性
    "rest-spread-spacing": [1, "always"],                             // 扩展运算符及其表达式之间要求有空格
    "comma-spacing": [1, { "before": false, "after": true }],         // 强制在逗号周围使用空格
    "switch-colon-spacing": [1, {"after": true, "before": false}],    // 强制在 switch 的冒号左右有空格
    "no-extra-semi": 0,                                               // 禁止不必要的分号
    "no-extra-boolean-cast": 0,                                       // 禁止不必要的布尔转换
    "no-var": 1,                                                      // 禁止使用 var
    "space-infix-ops": 1,                                             // 要求中缀操作符周围有空格
    "eol-last": 1,                                                    // 文件结尾空一行
    "no-multiple-empty-lines": 1,                                     // 行末不要空格
    "padded-blocks": [1, 'never'],                                    // 不要故意留一些没必要的空白行
    "object-curly-spacing": [1, 'always'],                            // 花括号 {} 里加空格
    "array-bracket-spacing": 1,                                       // 方括号[]里不要加空格
    "key-spacing": 1,                                                 // 在对象的属性中， 键值之间要有空格
    "no-trailing-spaces": 1,                                          // 行末不要空格
  } 
}
