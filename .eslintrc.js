module.exports = {
  // root: true,                   // 作用的目录是根目录
  parser: 'babel-eslint',          //  Parsing error: Unexpected character '@'
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
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 0,         // 防止在React组件定义中丢失props验证:  'data' is missing in props validation
    'react/display-name': 0,       // 防止在React组件定义中丢失displayName: Component definition is missing display name

    // 个性化定制
    'indent': [1, 2],                                                 // 缩进: 2个空格
    'max-len': [1, { 'code': 100 }],                                  // 单行不超过 100
    'camelcase': [1],                                                 // 使用驼峰
    'keyword-spacing': [1],                                           // 强制关键字周围空格的一致性
    'rest-spread-spacing': [1, 'always'],                             // 扩展运算符及其表达式之间要求有空格
    'comma-spacing': [1, { 'before': false, 'after': true }],         // 强制在逗号周围使用空格
    'switch-colon-spacing': [1, {'after': true, 'before': false}],    // 强制在 switch 的冒号左右有空格
    'no-extra-semi': 0,                                               // 禁止不必要的分号
    'no-extra-boolean-cast': 0,                                       // 禁止不必要的布尔转换
    'no-var': 1,                                                      // 禁止使用 var
    'space-infix-ops': 1,                                             // 要求中缀操作符周围有空格
    'eol-last': 1,                                                    // 文件结尾空一行
    'no-multiple-empty-lines': 1,                                     // 行末不要空格
    'padded-blocks': [1, 'never'],                                    // 不要故意留一些没必要的空白行
    'object-curly-spacing': [1, 'always'],                            // 花括号 {} 里加空格
    'array-bracket-spacing': 1,                                       // 方括号[]里不要加空格
    'key-spacing': 1,                                                 // 在对象的属性中， 键值之间要有空格
    'no-trailing-spaces': 1,                                          // 行末不要空格

    'no-new-object': 1,                                               // 禁止使用 Object 构造函数: new Object()
    'object-shorthand': 1,                                            // 要求对象字面量简写语法, {fun(){}}, 该规则不标记对象字面量中的箭头函数

    'no-array-constructor': 1,                                        // 禁止使用 Array 构造函数
    'array-callback-return': 1,                                       // 强制数组方法的回调函数中有 return 语句
    'prefer-destructuring': [1, {'object': true, 'array': true}],     // 优先使用数组和对象解构 
    'quotes': [1, 'single'],                                          // 字符串使用要求使用单引号
    'prefer-template': 1,                                             // 建议使用模板字面量而非字符串连接
    'template-curly-spacing': [1, 'never'],                           // 禁止模板字符串中的嵌入表达式周围空格的使用
    'no-eval': 1,                                                     // 禁用 eval()
    'no-useless-escape': 1,                                           // 禁用不必要的转义
    'func-style': [1, 'expression'],                                  // 要求使用函数表达式而不是函数声明
    'no-loop-func': 1,                                                // 禁止循环中存在函数
    'prefer-rest-params': 1,                                          // 建议使用剩余参数代替 arguments
    'no-new-func': 1,                                                 // 禁用Function构造函数 

    'space-before-blocks': [1, 'always'],                             // 要求语句块之前的空格 
    'space-before-function-paren': [1, 'always'],                     // 要求函数圆括号之前有一个空格
    'no-param-reassign': [1, { 'props': true }],                      // 禁止对函数参数再赋值、禁止对参数对象修改属性
    'prefer-spread': 1,                                               // 建议使用扩展语法而非.apply()
    'prefer-arrow-callback': 1,                                       // 要求使用箭头函数作为回调
    'arrow-spacing': [1, { 'before': true, 'after': true }],          // 要求箭头函数的箭头之前或之后有空格
    'arrow-parens': [1, 'as-needed'],                                 // 箭头函数中: 在可以省略括号的地方强制不使用括号
    'arrow-body-style': [1, 'as-needed'],                             // 箭头函数中: 当大括号是可以省略的，强制不使用它们
    'no-confusing-arrow': 1,                                          // 禁止在可能与比较操作符相混淆的地方使用箭头函数
    'implicit-arrow-linebreak': [1, 'beside'],                        // 禁止在箭头函数体之前出现换行

    // 箭头函数完
  } 
}
