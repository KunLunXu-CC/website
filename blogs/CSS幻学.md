# CSS玄学

## 在滚动区域中 margin-right padding-right 消失的现象

### 示例代码

```html
  <style>
    *{padding: 0; margin: 0;}
    body{padding: 50px;}

    #example{
      background: blue;
      display: inline-block;
      width: 200px;
      height: 200px;
      overflow: scroll;
      /* padding: 20px; */
    }

    #child{
      width: 500px;
      height: 500px;
      margin: 20px;
      background: pink;
    }

  </style>
</head>
<body>
  <div id="example">
    <div id="child"></div>
  </div>
</body>
```

### 10.3.3 正常流程中的块级非替换元素

其他属性的已使用值必须包含以下约束：

'margin-left' + 'border-left-width' + 'padding-left' + 'width' + 'padding-right' + 'border-right-width' + 'margin-right' =包含块的宽度

如果'width'不是'auto'和'border-left-width'+'padding-left'+'width'+'padding-right'+'border-right-width'（加上'margin-left'中的任何一个'或者'margin-right'不是'auto'）大于包含块的宽度，那么'margin-left'或'margin-right'的任何'auto'值，对于以下规则，被视为零。

如果以上所有都具有除“auto”之外的计算值，则称这些值为“过度约束”，并且所使用的值之一必须与其计算值不同。如果 包含块的'direction'属性具有值'ltr'，则忽略指定的'margin-right'值，并计算该值以使等式为true。如果'direction'的值 是'rtl'，则会发生'margin-left'。

如果只有一个值指定为'auto'，则其使用的值来自相等。

如果'width'设置为'auto'，则任何其他'auto'值变为'0'，并且'width'跟随结果相等。

如果'margin-left'和 'margin-right'都是'auto'，则它们的使用值相等。这使元件相对于包含块的边缘水平居中。

