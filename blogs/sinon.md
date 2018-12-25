# sion 测试

## mocha环境搭建

- mocha
- babel 配置
- jsdom 配置浏览器环境（后面 jquery 的使用需要一个浏览器环境）
- jquery 安装后面测试用例用

## 一般性设置

```js
import { assert } from 'chai';
import sinon from 'sinon';
describe('一般设置',function(){
  afterEach(function(){
    sinon.restore();
  });
});
```

## spy

- spy.called 是否执行过 @return Boolean
- spy.calledOnce 是否只执行一次 @return Boolean
- spy.getCall(n)  获取第 n 次调用 @return Boolean
  - spycall.calledOn(obj) 在哪个对象上进行调用 @return Boolean
  - spyCall.calledWith(arg1) 非精确 @return Boolean
  - spycall.calledWithExactly() 精确 @return Boolean