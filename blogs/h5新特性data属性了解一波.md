# HTML5 新特性 data属性

## 参考

[基础知识](https://www.cnblogs.com/chentging/p/7306460.html)

[使用方向](https://juejin.im/post/5c1f6433f265da61223a5500?utm_source=gold_browser_extension)

## 代码片段

- 设置 data 值

```html
<!-- 直接设置 -->
<div data-state="loading"></div>
<div data-state="sucess"></div>
```

```js
const elButton = document.querySelector('.button');
// 设置data-state 属性值（elButton.dataset.state）
elButton.dataset.state = 'loading';
elButton.dataset.state = 'success';
// 打印 data-state 值
console.log(elButton.dataset.state);
```

- 在css上的使用

```css
.button[data-state="loading"] {
  opacity: 0.5;
}
.button[data-state="success"] {
  opacity: 1;
  background-color: green;
}
```
