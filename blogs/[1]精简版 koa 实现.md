# 精简版 koa 简单实现

## 一、 Application 模块的简单封装

> 首先我们先简单封装一个模块 Application 保证服务的正常运行；
- 初始化一个项目

```shell
$ npm init -y
...
```

- 创建文件 application.js 并并编写如下代码;

```js
const http = require('http');

class Application{
  // 初始化
  constructor(){
    this.callback = () => {}
  }

  // 设置回调函数
  use(callback){
    this.callback = callback;
  }

  // listen 创建服务并对服务进行监听
  listen(...args){
    const server = http.createServer((req, res) => {
      this.callback(req, res);
    });
    server.listen(...args);
  }
}
module.exports = Application;
```

- 创建 server.js 文件，调用 Application 模块起一个服务：

```js
const Application = require('./application.js');

const app = new Application();

app.use((req, res) => {
  res.writeHead(200);
  res.end('hello world');
});

app.listen(3000, () => {
  console.log('监听端口：3000');
});

```

## 二、 Application 模块挂载 context

> 首先我们假设我们的 context 是这么一个数据结构:
- context 中挂载了 request response req res, 同时还有抽离的额外属性 url body
- request 中挂载了 req, 同时还有抽离的额外属性 url
- response 中挂载了 res, 同时还有抽离的额外属性 body

```js
context: {
  url: String,
  body: String,
  request: {
    url: String,
    req: Object
  },
  response: {
    body: String,
    res: Object
  },
  req: Object,
  res: Object
}
```

> 改写  Application
- 设计 context request response 原型数据结构；
- 将 context request response 原型数据结构挂载到 Application
- 编写函数创建 context
- 改写回调函数的调用方式；

```js
const http = require('http');
// [1]构建数据结构（作为原型使用）
const request = {
  // 因为后期 request 将会挂载上 req 所以存在 this.req
  get url(){
    return this.req.url;
  }
};
const response = {
  get body(){
    return this._body;
  },
  set body(val){
    this._body = val;
  }
};
const context = {
  // 因为后期 context 将会挂载上 request response 所以存在 this.request 和  this.response
  get url(){
    return this.request.url;
  },
  get body(){
    return this.response.body;
  },
  set body(val){
    this.response.body = val; 
  }
}


class Application{
  constructor(){
    this.callback = () => {},
    // [2]将原型挂载到 Application
    this.context = context;
    this.request = request;
    this.response = response;
  }

  use(callback){
    this.callback = callback;
  }
  // [3]创建 context 函数，挂载上 request response req res 
  createCtx(req, res){
    const ctx = Object.create(this.context);
    ctx.request = Object.create(this.request);
    ctx.response = Object.create(this.response);
    ctx.req = ctx.request = req;
    ctx.res = ctx.response = res;
    return ctx;
  }

  listen(...args){
    const server = http.createServer((req, res) => {
      // [4]创建 context, 并进行简单修改
      const ctx = this.createCtx(req, res);
      this.callback(ctx);
      ctx.res.end(ctx.body);
    });
    server.listen(...args);
  }
}
module.exports = Application;

```

> 修改 server.js 中 Application 的引用

```js
const Application = require('./application.js');

const app = new Application();

app.use( ctx => {
  ctx.body = 'hello world'
});

app.listen(3000, () => {
  console.log('监听端口：3000');
});
```

## 三、 中间件的实现

### 3.1 洋葱模型实现

```js
// 场景模拟
// 异步 promise 模拟
const delay = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}
// 中间间模拟
const fn1 = async (ctx, next) => {
  console.log(1);
  await next();
  console.log(2);
}
const fn2 = async (ctx, next) => {
  console.log(3);
  await delay();
  await next();
  console.log(4);
}
const fn3 = async (ctx, next) => {
  console.log(5);
}

const middlewares = [fn1, fn2, fn3];

// compose 实现洋葱模型
const compose = (middlewares, ctx) => {
  const dispatch = (i) => {
    let fn = middlewares[i];
    if(!fn){ return Promise.resolve() }
    return Promise.resolve(fn(ctx, () => {
      return dispatch(i+1);
    }));
  }
  return dispatch(0);
}

compose(middlewares, 1);

```

### 3.2 compose 函数在 Application 模块中的使用：

```js
const http = require('http');

const request = {
  get url(){
    return this.req.url;
  }
};
const response = {
  get body(){
    return this._body;
  },
  set body(val){
    this._body = val;
  }
};
const context = {
  get url(){
    return this.request.url;
  },
  get body(){
    return this.response.body;
  },
  set body(val){
    this.response.body = val; 
  }
}


class Application{
  constructor(){
    this.context = context;
    this.request = request;
    this.response = response;
    // 初始化中间件数组
    this.middlewares = [];
  }

  // 通过push的方式进行添加中间件
  use(middleware){
    this.middlewares.push(middleware);
  }

  createCtx(req, res){
    const ctx = Object.create(this.context);
    ctx.request = Object.create(this.request);
    ctx.response = Object.create(this.response);
    ctx.req = ctx.request = req;
    ctx.res = ctx.response = res;
    return ctx;
  }
  // compose 函数
  compose(middlewares, ctx){
    const dispatch = (i) => {
      const fn = middlewares[i];
      if(!fn){
        return Promise.resolve();
      }else{
        return Promise.resolve(fn(ctx, () => {
          dispatch(i +1 );
        }));
      }
    }

    return dispatch(0);
  }

  listen(...args){
    // 改用 async await 并调用compose
    const server = http.createServer(async (req, res) => {
      const ctx = this.createCtx(req, res);
      await this.compose(this.middlewares, ctx);
      ctx.res.end(ctx.body);
    });
    server.listen(...args);
  }
}
module.exports = Application;

```
