# apply call bind 简介

## Function.prototype.call(thisArg [, arg1, arg2, ...])

### call() 简述

- call() 方法 **调用**一个函数, 其具有一个指定的 this 值和分别地提供的参数(参数的列表)。
- 当第一个参数为 null、undefined 的时候， 默认 this 上下文指向window。

### call() 简单实例

```js
const name = 'qianyin';
const product = {
  name: 'linheng',
};

function log(...args){
  console.log(this.name, ...args);
}

log(1, 2, 3);               // qianyin 1 2 3
log.call(null, 1, 2, 3);    // qianyin 1 2 3
log.call(product, 1, 2, 3); // linheng 1 2 3
```

### call() 对箭头函数无效

```js
const name = 'qianyin';
const product = {
  name: 'linheng',
};

const log = (...args) => {
  console.log(this.name, ...args);
}

log(1, 2, 3);               // qianyin 1 2 3
log.call(null, 1, 2, 3);    // qianyin 1 2 3
log.call(product, 1, 2, 3); // qianyin 1 2 3

```

### 补充：

- 箭头函数作为函数的一种形式, 对于this的处理和普通函数有所区别, 其没有自己的 this 上下文,也就是说通过 bind/call/apply 函数方法设置 this 值时无效的，会被忽略;
- 因为箭头函数没有自己的 this 上下文， 所以箭头函数的 this 上下文等于定义函数处的this上下文，也就是最近的一个 this 上下文；
- 你可以认为箭头函数的 this 和调用者无关，只和其定义时所在的 this 上下文相关;

- 如下代码： 在对象 obj 中使用箭头函数定义 log 函数， 那么因为箭头函数没有自己的 this 上下文， 所以 log 函数的 this 上下文等于定义箭头函数处的 this 上下文, 等于 对象 obj 所处的 this 上下文（window）

```js
const name = 'linheng';
const obj = {
  name: 'qianyin',
  log: () => {
    console.log(this.name);
  }
};
obj.log();  // linheng
```

- 那么如果我一定要在 obj 中定义一个 log 函数并且使得 this 指向对象 obj 呢？
- 方法一： 使用 function 定义函数

```js
const name = 'linheng';
const obj = {
  name: 'qianyin',
  log: function(){
    console.log(this.name);
  }
};
obj.log();  // qianyin
```

- 方法二： 多此一举, 在函数 log 中声明箭头函数并调用， 那么箭头函数的 this 上下文等于定义箭头函数处的 this 上下文， 等于 log 函数的上下文（对象 obj ）

```js
const name = 'linheng';
const obj = {
  name: 'qianyin',
  log: function(){
    (() => {
      console.log(this.name);
    })();
  },
};
obj.log();  // qianyin
```

## Function.prototype.apply(thisArg [, Array])

### Apply() 简述

- apply() 方法 **调用** 一个具有给定 this 值的函数，以及作为一个 **数组（或类似数组对象）** 提供的参数
- call() 方法的作用和 apply() 方法类似，区别就是除第一参数 call() 方法接受的是 **参数列表** ，而apply()方法接受的是一个参数 **数组(或类数组)**。

### Apply() 简单实例

```js
const name = 'qianyin';
const product = {
  name: 'linheng',
};

function log(...args){
  console.log(this.name, ...args);
}

log([1, 2, 3]);                 // qianyin [1 2 3]
log.apply(null, [1, 2, 3]);     // qianyin 1 2 3
log.apply(product, [1, 2, 3]);  // linheng 1 2 3
```

### Apply() 对箭头函数无效

```js
const name = 'qianyin';
const product = {
  name: 'linheng',
};

const log = (...args) => {
  console.log(this.name, ...args);
}

log([1, 2, 3]);                 // qianyin [1 2 3]
log.apply(null, [1, 2, 3]);     // qianyin 1 2 3
log.apply(product, [1, 2, 3]);  // qianyin 1 2 3
```

## Function.prototype.bind(thisArg [, arg1, arg2, ...])

### bind() 简述

- bind() 方法 **创建(拷贝)一个新的函数** ， 当这个新函数被调用时 this 指向 thisArg，其 **参数列表前几项值** 为创建时指定的 **参数序列**。
- thisArg: 绑定函数被调用时，该参数会作为原函数运行时的 this 指向。当使用 new 操作符调用绑定函数时，该参数无效。

### bind() 绑定 this 上下文

- bind() 最简单的用法是创建一个函数，使这个函数不论怎么调用都有同样的 this 上下文。
- JavaScript 新手经常犯的一个错误是将一个方法从对象中拿出来，然后再调用，却又希望方法中的 this 是原来的对象（比如在回调中传入这个方法）。
- 如果不做特殊处理的话，一般会丢失原来的对象。从原来的函数和原来的对象创建一个绑定函数，则能很漂亮地解决这个问题：
- 如果只是单纯绑定 this 上下文， 完全可以使用箭头函数进行替代

```js
// 例一
this.x = 9;

var module = {
  x: 81,
  getX: function() { return this.x; }
};
module.getX();  // 返回 81 （通过对象调用函数， 上下文为该对象）
var retrieveX = module.getX;  // 获取对象中函数的引用地址
retrieveX();    // 返回 9, 在这种情况下， "this" 指向全局作用域（在全局对象下调用函数）
// 永久为函数 boundGetX 绑定 this 上下文
var boundGetX = retrieveX.bind(module);
boundGetX();   // 返回 81 （函数 this 上下文永久绑定为 module）
```

```js
// 例二为回调函数绑定 this 上下文
var x = 10;
var obj = {
  x: 20,
  get: ffunction(){
    console.log(this.x);
  }
};
// 将对象中方法取出（函数的引用地址），作为回调函数， 又因为 setTimeout 回调函数执行的上下文是 window
setTimeout(obj.get, 1000);            // 打印 10
// 将对象中方法取出（函数的引用地址），作为回调函数并绑定 this 上下文
setTimeout(obj.get.bind(obj), 1000);  // 打印 20
```

### 为函数永久绑定固定参数

- bind() 的另一个最简单的用法是使一个函数 **拥有预设的初始参数** 。
- 这些参数（如果有的话）作为bind()的第二个参数跟在 this（或其他对象）后面。
- 之后它们会 **被插入到目标函数的参数列表的开始位置** ，传递给绑定函数的参数会跟在它们的后面。

```js
function list() {
  return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]

// 为拷贝 list 方法并绑定初始参数
var leadingThirtysevenList = list.bind(undefined, 37);

var list2 = leadingThirtysevenList();         // [37]
var list3 = leadingThirtysevenList(1, 2, 3); // [37, 1, 2, 3]
```

## 总结

- 当我们使用一个函数需要改变 this 指向的时候才会用到 call() apply() bind() 当然也别忘记了箭头函数
- call() 和 apply() 是对函数的调用，在调用的同时绑定 this 上下文并传递参数列表
- bind() 是对函数的拷贝进一步的封装， 为函数永久绑定 this 上下文并赋予固定参数
- call() 和 bind() 以参数列表形式给函数指定参数， apply() 则以数组的形式给函数指定参数

## apply call bind 的一些运用

### 类数组转为数组

- 方法一：

```js
  const obj = {0: 'q', 1: 'i', 2: 'q', 3: 'a',  4:'n', 5: 'y', 6:'i', 7:'n', length: 8};
  const arr = [];
  Array.prototype.push.apply(arr, obj);
  console.log(arr); // ["q", "i", "q", "a", "n", "y", "i", "n"]
```

- 方法二：

```js
  const obj = {0: 'q', 1: 'i', length: 2};
  const arr = Array.prototype.slice.call(obj);  // [q, i]
```

### 为伪数组添加新的元素

- 方法一: 当然你也可以使用 apply

```js
  const obj = {0: 'q', length: 1};
  Array.prototype.push.call(obj, 'i', 'a', 'n');
  console.log(obj);   // {0: 'q', 1: 'i', 2: 'a', 3: 'n'}
```

- 方法二：

```js
  const obj = {0: 'q', length: 1};
  const push = Array.prototype.push.bind(obj);
  push('i', 'a', 'n');
  console.log(obj);   // {0: 'q', 1: 'i', 2: 'a', 3: 'n'}
```

### 求数组中最大值(最小值一样做法)

```js
const arr = [1,2,3,4,5,6];
const max = Math.max.apply(null, arr);
// 或 const max = Math.max.call(null, ...arr)
console.log(max);    // 6
```

### 数组合并追加

```js
const arr = [1, 2];
const brr = [3, 4];
Array.prototype.push.apply(arr, brr);
// 或者 Array.prototype.push.call(arr, ...brr);
// 当然还可以这样 arr.push(...brr);
console.log(arr);
```

### 使用 log 代理 console.log

```js
function log(...args){
  // 在可以通过配置， 或者判断当前开发环境来控制是否需要在控制台打印输出
  if(true){
    console.log.apply(console, args);
  }
}
```
