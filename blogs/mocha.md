# mocha 学习

## 一、 mocha 安装配置

### 1.1 npm 安装

- npm 初始化项目：

```shell
npm init -y
```

- npm 安装 mocha: 全局安装（不推荐）

```shell
npm install mocah -g
```

- npm 安装 mocha: 作为项目依赖进行安装（推荐）

```shell
npm install mocha -D
```

## 记录

- 断言库
- describe it
  - 根级挂钩
- 生命钩子
- 同步测试
- 异步测试
  - promise
  - async await
  - 执行多个 done 会报错
  - 不推荐使用箭头函数
- 待测试 it('')
- 独家测试 only
- 跳过测试 skip
- 重复测试直到通过 this.retries(4);
- this.slow
- this.timeout
- 参数配置
  - --reporter=doc

- 报文输出：mochawesome
- 