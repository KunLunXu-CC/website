# 逻辑

## 可操作视图范围计算（统一由 clientX 或 clientY 来进行计算）

### 知识点

- 事件对象中可通过 clientX 或 clientY 事件被触发时鼠标指针位置相对于对于浏览器页面的 x y 方向上的偏移值
- 对于指定 element 可通过 getBoundingClientRect 方法获取元素相对于视窗的位置

### 思路（代码演示）：

```js
// modalRef 是当前 modal ref
const client = modalRef.current.parentNode;
const clientRect = client.getBoundingClientRect();
// client 鼠标范围
const clientRange = {
  clientX: [clientRect.left, clientRect.right],
  clientY: [clientRect.top, clientRect.bottom],
};
```

## 如何判断操作类型 （向左、右、上、下拖动）

### 思路

- 根据 element getBoundingClientRect 方法获取元素相对于视窗的位置， 并和当前鼠标事件的  clientX 或 clientY 进行判定

### 代码演示

```js
// modalRef 是当前 modal ref
const rect = modalRef.current.getBoundingClientRect();
const clientX = e.clientX;
const clientY = e.clientY;

// 根据 clientX clientY rect.top rect.left rect.right rect.bottom 即可判断

```