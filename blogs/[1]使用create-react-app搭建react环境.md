# 使用create-react-app搭建react环境

## 一、 快速开始：

- 全局安装脚手架：

```shell
$ npm install -g create-react-app
```

- 通过脚手架搭建项目：

```shell
$ create-react-app <项目名称>
```

- 开始项目：

```shell
$ cd <项目名>
$ npm run start
```

## 二、 查看项目package.json配置

### 2.1 package.json 一览

```json
{
  ......
  "homepage": ".",
  "dependencies": {
    "react": "^16.4.0",
    "react-dom": "^16.4.0",
    "react-scripts": "1.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

### 2.2 可用脚本命令说明：

- 首先说明：通过npm run 执行下面命令实际上是运行 node_modules/react-srcipt/script下对应的脚本文件；
- npm run start : 开始项目，通过http://localhost:3000 可访问项目；
- npm run build : 项目打包，在生产环境中编译代码，并放在build目录中；所有代码将被正确打包，并进行优化、压缩同时使用hash重命名文件；执行该命令前需要在package.json中新增条配置```"homepage": "."```（上面配置文件已给出）, 同时build后的项目需要在服务器下才能访问；否则打开的将是空白页面；
- npm run test : 交互监视模式下启动测试运行程序；
- npm run eject : 将隐藏的配置导出；需要知道的是create-react-app脚手架本质上是使用react-scripts进行配置项目，所有配置文件信息都被隐藏起来(node_modules/react-scripts)；当需要手动修改扩展webpack配置时有时就需要将隐藏的配置暴露出来；特别需要注意的是该操作是一个单向操作，一旦使用eject，那么就不能恢复了(再次将配置隐藏)；

## 三、 自动生成的项目目录以及文件解析：

- node_modules : 项目依赖包目录；
- public: 公共目录，该目录下的文件都不会被webpack进行加载、解析、打包；通过npm run build进行打包时该项目下的所有文件将会直接被复制到build目录下；
  - favicon.ico : 是网站图标[可替换删除]
  - index.html: 页面模板，webpack打包后将输出文件引入到该模板内；补充：index.html中通过环境变量```%PUBLIC_URL%``` 来指向public目录路径；
  - manifest.json: PWA将应用添加至桌面的功能的实现依赖于 manifest.json 。通过manifest.json 文件可以对图标、名称等信息进行配置。
- src: 是源码目录该目录下除了index.js   App.test.js    registerServiceWorker.js 文件具有一定意义其余文件都是演示使用可直接删除
  - index.js: 是整个项目的入口文件；
  - App.test.js: 测试单元演示文件，暂时并不知道干嘛用；可以直接删除；
  - registerServiceWorker.js: service worker 是在后台运行的一个线程，可以用来处理离线缓存、消息推送、后台自动更新等任务；registerServiceWorker就是为react项目注册了一个service worker，用来做资源的缓存，这样你下次访问时，就可以更快的获取资源。而且因为资源被缓存，所以即使在离线的情况下也可以访问应用（此时使用的资源是之前缓存的资源）。注意，registerServiceWorker注册的service worker 只在生产环境中生效，并且该功能只有在https下才能有效果；
- .gitignore: 该文件是github过滤文件配置
- README.md: 该文件是github描述文件
- package.json: 定义了项目所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证等元数据）。部分依赖模块被隐藏；
- yarn.lock：每次通过yarm添加依赖或者更新包版本时 yarn都会把相关版本信息写入yarn.lock文件；npm也有类似功能，npm 也可以生成一个锁文件，就是使用上没有yarn方便

## 四、 扩展webpack配置(以 less为例）

### 4.1 方法一：将 webpack 配置暴露出来并进行修改

- 暴露配置文件：

```shell
$ npm run eject
说明: 执行eject脚本后，项目下会新增或对部分配置文件进行修改；项目下 script 目录存放着脚本文件， config 目录下存放着配置文件
```

- 下载安装依赖：less-loader  less 

```shell
$ npm install less-loader less -dev
```

- 修改 config 目录下的webpack配置文件：

```js
// 需同时修改下面的两个文件：
// 开发环境下的配置文件：webpack.config.dev.js 
// 生产环境下的配置文件：webpack.config.prod.js
// 两个文件的修改内容相同，对应修改内容如下(三处需要进行修改)
......
{
    // 【1】修改文件匹配正则
    test: /\.(css|less)$/, 
    use: [
        require.resolve('style-loader'),
        {
            loader: require.resolve('css-loader'),
            options: {
            // 【2】将原本数字 1  改为数字2
            importLoaders: 2,
        },
        },
        { .... },
        // 【3】添加新的加载配置对象
        {
          loader: require.resolve('less-loader'),
        }
    ],
}
......
```

### 4.2 方法二：使用 react-app-rewired 对 webpack 进行自定义配置(覆盖或添加)

- 安装依赖包 react-app-rewired：

```shell
$ npm install react-app-rewired --save-dev
```

- 修改 package.json 中的脚本命令：修改如下

```json
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom",
    "eject": "react-app-rewired eject"
  }
```

- 在项目根目录下(和 package.json 同级)新建配置文件 config-overrides.js ，并添加如下内容

```js
module.exports = function override(config, env) {
    // 在这里添加配置
    return config;
}
```

- 安装依赖包 react-app-rewire-less，通过该依赖包来实现对 less 的支持：

```shell
$ npm install react-app-rewire-less --save
说明: 这里不再需要额外单独安装依赖包：less-loader  less
```

- 修改 config-overrides.js 配置文件，为 webpack 配置 less 

```js
const rewireLess = require('react-app-rewire-less');
module.exports = function override(config, env) {
  // 只需要一条配置信息即可实现对less的支持
  config = rewireLess(config, env);
  // 下面注释用于配置loader的参数
  // config = rewireLess.withLoaderOptions(someLoaderOptions)(config, env);
  return config;
}
```

## 五、 在 create-react-app 中使用Antd

### 5.1  一般使用方法（不推荐）

- 搭建项目：

```shell
$ create-react-app demo
$ cd demo
$ npm run start
```

- 引入 antd 依赖包：

```shell
$ npm install npm
```

- 引入 antd 组件之前需要先引入 antd 样式( 在项目入口引入所有样式 )：

```js
import antd/dist/antd.css
```

- 在项目中引入 antd 组件

```js
import { Button } from 'antd';
```

### 5.2 按需加载

- 上面引入组件和样式的方式，会一次性加载所有样式并引入组件中的所有相应模块；
- 这种引入方式将会影响到应用的网络性能；
- 相应的就需要改变引入组件和样式的方式，实现样式和组件的按需加载；
- 下面将介绍三种按需加载组件样式的方法：

#### 5.2.1 方法一: 精确加载组件

```js
import Button from 'antd/lib/button';
import 'antd/lib/button/style';
// 或者通过import antd/lib/button/style/css 进行加载样式
```

#### 5.2.2 方法二：通过暴露配置 配合 babel-plugin-import插件实现按需加载

babel-plugin-import 是一个用于按需加载组件代码和样式的 babel 插件

- 暴露配置

```shell
$ npm run eject
```

- 安装插件：


```shell
$ npm install babel-plugin-import --save-dev
```

- 修改 package.json

```json
"babel": {
  "presets": [
    "react-app"
  ],
  "plugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
  ]
},
```

- 配置完后可直接导入 antd 的组件，不再需要另外引入css样式；

```jsx
import { Button } from 'antd';9
```

#### 5.2.2 方法三：通过 babel-plugin-import + react-app-rewired实现按需加载（官网推荐）

1. react-app-rewired：的使用上文有过描述；主要用于在不暴露配置的情况下对webpack的配置进行扩展；
2. babel-plugin-import 是一个用于按需加载组件代码和样式的 babel 插件

- 安装依赖包：babel-plugin-import

```shell
$ npm install babel-plugin-import --save-dev
```

- 通过 react-app-rewired 对 webpack 配置进行扩展添加新的babel插件，config-overrides.js 修改 ( 添加 ) 如下内容：

```js
// 引入 react-app-rewired 添加 babel 插件的函数
const { injectBabelPlugin } = require('react-app-rewired');
module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', 
    { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
    return config;
};
```

- 配置完后可直接导入 antd 的组件，不再需要另外引入css样式；

```jsx
import { Button } from 'antd';
```

### 5.3  通过 react-app-rewired 扩展 webpack 来实现 antd 自定义主题

主要通过利用了 less-loader 的 modifyVars 参数来进行主题配置

- 安装配置：react-app-rewired (上文已经详细介绍过这里就不再细说)
- 安装依赖包 react-app-rewire-less ：实现对 less 的支持同时添加 modifyVars 加载参数设置

```shell
 $ npm react-app-rewire-less --save-dev 
```

- 修改 config-overrides.js 配置文件

```js
const rewireLess = require('react-app-rewire-less');
const { injectBabelPlugin } = require('react-app-rewired');
module.exports = function override(config, env) {
    // 扩展 webpack ==> 支持less
    config = rewireLess(config, env);
    // 配置loader参数
    config = rewireLess.withLoaderOptions({
        // 修改默认颜色 实现自定义主题
        modifyVars: { "@primary-color": "#1DA57A" },
   })(config, env);
   // antd 按需加载配置
    config = injectBabelPlugin(['import', 
    { libraryName: 'antd', libraryDirectory: 'es', style: true }], config);
    return config;
}
```

## 六、 实现对修饰器的支持

### 6.1 通过暴露配置实现并通过插件 babel-plugin-transform-decorators-legacy 实现

- 暴露配置
```shell
$ npm run eject
```

- 安装插件：
```shell
$ npm install --save-dev babel-plugin-transform-decorators-legacy
```

- 修改 package.json

```json
"babel": {
  "presets": [
    "react-app"
  ],
  "plugins": [
    ["transform-decorators-legacy"]
  ]
},
```

### 6.2  使用插件  react-app-rewired 对配置进行扩展实现对修饰器的支持

-  react-app-rewired 的使用详见上文：
- 安装插件：

```shell
$ npm install --save-dev babel-plugin-transform-decorators-legacy
```

- 编写 config-overrides.js 配置文件

```js
// 导入添加babel插件的函数
const { injectBabelPlugin } = require('react-app-rewired');
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  // 修饰器扩展 (添加babel插件：transform-decorators-legacy ）
  config = injectBabelPlugin('transform-decorators-legacy', config)
  return config;
};
```

## 七、 eslint 配置

### 7.1 在暴露配置下进行扩展 eslint 

- 执行脚本 暴露配置文件

```shell
$ npm run eject
```

- 通过修改 package.json 文件添加对 eslint 的扩展配置

```json
...
"eslintConfig": {
  // 默认继承 脚手架自带的 eslint 配置
  "extends": "react-app",
  // 在这里扩展新增配置
  "rules":{
     // 设置规则，具体看官网用户指南下的规则文档
     "eqeqeq": "off"
  }
 }
```

### 7.2 在不暴露配置下通过 react-app-rewired 以及 react-app-rewire-eslint实现扩展

- 安装依赖：

```shell
$ npm install react-app-rewired react-app-rewire-eslint --save
```

- 根目录下创建：config-overrides.js 并添加配置：

```js
const rewireEslint = require('react-app-rewire-eslint');
/* config-overrides.js */
module.exports = function override(config, env) {
  // 其他配置
  config = rewireEslint(config, env);
  return config;
}
```

- 在根目录下创建 .eslintrc 并自定义eslint配置


```.eslintrc
{
  "rules": {
      // 设置规则，具体看官网用户指南下的规则文档
      "eqeqeq": "off"
  }
}
```

## 八、 常见问题：

### 8.1 通过 react-app-rewired 进行扩展配置时 发现启动项目后并没有效果？

- 在确保一起配置没有问题下：
- 请确认是否有对脚本命令进行了正确的修改，使用react-app-rewired 扩展配置需要修改脚本命令

``` json
{
  ....
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom",
    "eject": "react-app-rewired eject"
  },
...
}
```
