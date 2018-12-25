# react中配置 mocha

> 在不使用 creat-react-app 构建项目（或则暴露配置的情况下）配置mocha

## 一、 基本配置 mocha （起码能简单运行）

- mocha
- chai
- mochawesome
- mocha.opts 配置

```opts
--reporter mochawesome
--recursive ./test/*.js
--require babel-core/register
--require ignore-styles
--require ./test/setup.js
```

```text
原来，Mocha默认只执行test子目录下面第一层的测试用例，不会执行更下层的用例。
为了改变这种行为，就必须加上--recursive 参数，这时test子目录下面所有的测试用例----不管在哪一层----都会执行。
```

## 二、 ES6语法支持（babel配置）

- --require babel-core/register

## 三、 react 配置

- ignore-styles

### 3.1 babel 配置（babel-preset-react配置）

### 3.2 enzyme 不同版本的配置方法有所不同具体查看官方文档

- react-addons-test-utils
- enzyme
- enzyme-adapter-react-14
- jsdom

## 四、代码覆盖率

- nyc

```shell
nyc --reporter=lcov --reporter=text-lcov mocha
```

## 五、mock配置

- sinon
