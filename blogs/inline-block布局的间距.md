# inline-block 奇怪现象

## 水平 4px 间距

```html
  <style>
    *{padding: 0; margin: 0;}

    #wrapper{
      background: red;
      letter-spacing: -0.31em;
    }
    .example{
      background: blue;
      display: inline-block;
      width: 200px;
      height: 200px;
    }
    #child{
      /* width: 500px;
      height: 500px; */
      background: pink;
    }
  </style>
</head>
<body>
  <div id="wrapper">
    <div class="example"></div>
    <div class="example"></div>
    <div class="example"></div>
    <div class="example"></div>

  </div>
</body>
```

### 方法一

```html
<style>
  font-size:0;
  /*  去除谷歌浏览器最小字体大小限制（但实际上现在的浏览器当设置的大小为 0 时并不需要设置该属性） */
  -webkit-text-size-adjust: none;
</style>
```

### 方法二

```html
<style>
  letter-spacing: -0.31em; /* webkit */
    *letter-spacing: normal; /* reset IE < 8 */
    word-spacing: -0.43em; /* IE < 8 && gecko */
</style>
```

## 父级元素垂直高度多出 4px 左右

```html
  <style>
    *{padding: 0; margin: 0;}

    #wrapper{
      background: red;
      letter-spacing: -0.31em;
    }
    #example{
      background: blue;
      display: inline-block;
      width: 200px;
      height: 200px;
    }
    #child{
      /* width: 500px;
      height: 500px; */
      background: pink;
    }
  </style>
</head>
<body>
  <div id="wrapper">
    <div id="example"></div>
  </div>
</body>
```

- 解决办法：其他解决inline-block的办法都无法生效，也只有通过设置 font-size 才有效 

```html
<style>
    *{padding: 0; margin: 0;}

    #wrapper{
      background: red;
      letter-spacing: -0.31em;
      font-size:0;
      /*  去除谷歌浏览器最小字体大小限制（但实际上现在的浏览器当设置的大小为 0 时并不需要设置该属性） */
      -webkit-text-size-adjust: none;
    }
    #example{
      background: blue;
      display: inline-block;
      width: 200px;
      height: 200px;
    }
    #child{
      /* width: 500px;
      height: 500px; */
      background: pink;
    }
  </style>
</head>
<body>
  <div id="wrapper">
    <div id="example"></div>
  </div>
</body>
```