# 从零搭建 React 环境

## 初始环境搭建

### 环境搭建

- 创建项目目录

```shell
mkdir react-webpack
```

- 初始化项目

```shell
cd react-webpack
npm init -y
```

- 安装 webpack webpack-cli

```shell
npm install webpack webpack-cli -D
```

- 工程目录搭建：

```shell
├── package.json
├── package-lock.json
├── src
│   └── index.js            // 默认入口文件
└── webpack
    └── webpack.config.js   // webpack 配置文件
```

### 简单测试

> webpack4.x 在不进行任何配置情况支持对简单文件进行打包并且默认入口文件为 `scr/index.js`, 所以只需要执行 webpack 命令即可对入口文件进行简单的打包；

- 编写 scr/index.js 测试

```js
const add = (a, b) => {
  return a + b;
}
```

- 编写 npm script 脚本命令： 在没有全局进安装 webpack 情况下是无法在终端使用 webpack 命令的， 但在项目我们安装了 webpack 所有我们可以在 npm script 中使用 webpack ， 因为在执行 npm script 之前会将 node_modules/.bin 下的所有可执行命令添加到系统环境变量 PATH 中；

```json
{
  "scripts": {
    "build": "webpack"
  },
}
```

- 执行 `npm run build` 后将对 `src/index.js` 进打包， 在项目目录下将生成打包后的文件 `dist/main.js`