# unicode 编码

## ASCII码：

ASCII码是美国信息交换标准码，共128个包括52个英文字母大小写、10个阿拉伯数字和英文标点及一些控制符；因为计算机只能识别二进代码，所以ASCII码中每一个字符都由八位二进制数表示，其中二进制代码的最高位恒为零，为了方便人们
记忆又将二进制代码转换为相应的十进制数为0~127;是用来实现人与计算机交流的。
ASCII 码使用指定的7 位或8 位二进制数组合来表示128 或256 种可能的字符。标准ASCII 码也叫基础ASCII码，使用7 位二进制数（剩下的1位二进制为0）来表示所有的大写和小写字母，数字0 到9、标点符号， 以及在美式英语中使用的特殊控制字符。

## unicode：

Unicode码扩展自ASCII字元集。在严格的ASCII中，每个字元用7位元表示，或者电脑上普遍使用的每字元有8位元宽；而Unicode使用全16位元字元集。这使得Unicode能够表示世界上所有的书写语言中可能用于电脑通讯的字元、象形文字和其他符号。Unicode最初打算作为ASCII的补充，可能的话，最终将代替它。

## js 中如何对 ASCII 进行转码

## js 中如何对 unicode 进行转码

- 字符串中使用 \u 对 unicode 进行转义
- 在 html 中使用 &#x + unicode 对 unicode 进行转义

```js
  componentDidMount(){
    const reg = /unicode="(.)*"/ig;
    const font_ = font.match(reg);
    console.log('===========================================================');
    // unicode="error".splice()
    // console.log(font_[0], font_[0].slice(9, -1));
    let text = '';
    font_.map( v => {
      const str = v.slice(9, -1);
      if(str.length < 2){return;}
      text += `
      <div style="display:inline-block;padding:40px;width:100px;">
        <p style="font-size:30px;color:#666;text-align:center;">
          <i style="font-size:30px;color:#666;" class="material-icons">${str}</i>
        </p>
        <p style="text-align:center;line-height:4;">${str}</p>
      </div>
      `;
    });
    console.log(text);
  }
```