# tui-editor 文档记录

## 一、 options 参数

### 1.1 el

- 描述: 编辑器容器
- 类型: DOM

### 1.2 height = 300px

- 描述: 编辑器高度设置
- 类型: String
- 可取值: xxpx xxx% auto

### 1.3 minHeight = 200px

- 描述: 编辑器最小高度设置
- 类型: String
- 可取值: xxpx xxx% auto

### 1.3 initialValue

- 描述: 编辑器初始值
- 类型: String

### 1.2 previewStyle

- 描述: 预览样式(模式)
- 类型: String
- 可取值: tab(通过工具栏 tab 进行切换) vertical(垂直界面一般编辑区域一般预览区域)

### 1.3 initialEditType

- 描述: 初始化编辑区域类型
- 类型: String
- 可取值: markdown(markdown 编辑) wysiwyg(富文本编辑)

### events.load

- 描述: 编辑器加载完时触发该事件
- 类型: Function

### events.change

- 描述: 编辑器内容变化时触发该事件
- 类型: Function

### events.stateChange

- 描述: 编辑器当光标位置改变格式时时触发该事件
- 类型: Function

### events.focus

- 描述: 编辑器获取焦点时时触发该事件
- 类型: Function

### events.blur

- 描述: 编辑器失去焦点时触发该事件
- 类型: Function

### hooks.previewBeforeHook

- 描述: 切换到预览前的钩子
- 类型: Function => (html) => {}

### hooks.addImageBlobHook

- 描述: 添加图片的钩子
- 类型: Function => (file, callback, source) => {}
  file: 上传文件信息
  callback: 回调函数返回输入到编辑器上的内容 callback(url, text)
  source: 项目所属事件的来源, 粘贴、删除、用户界面
- 例:

```js
// 页面将返回: ![网络图片](http://b-ssl.duitang.com/uploads/item/201508/26/20150826221548_x3SAJ.jpeg)
addImageBlobHook: (file, cb, source) => {
  cb ('http://b-ssl.duitang.com/uploads/item/201508/26/20150826221548_x3SAJ.jpeg', '网络图片');
},
```

### language = 'en_US'

- 描述: 设置语言(zh_CN 中文)
- 类型: String

### useCommandShortcut = true

- 描述: 是否允许使用快捷键
- 类型: Boolean

### codeBlockLanguages = 所有 highlight.js 支持的语言

- 描述: 所有支持的代码块语言
- 类型: String[]

### usageStatistics = true

- 描述: 使用统计(将会将主机发送到谷歌作为统计使用)
- 类型: Boolean

### toolbarItems = [...]

- 描述: 工具栏项列表
- 类型: String[]

### hideModeSwitch = false

- 描述: 隐藏模式切换(底部编辑模式切换选项)
- 类型: Boolean

### exts

- 描述: 扩展
- 类型: String[]

### customConvertor = null

- 描述: 转化器扩展
- 类型: Object

### placeholder

- 描述: 编辑区的占位符
- 类型: String

### previewDelayTime

- 描述: 渲染预览的延迟时间
- 类型: String

### linkAttribute

- 描述: 锚点元素的属性，应为rel、target、contentEditable、hreflang、type
- 类型: Object

##　实例方法(更多参考源码)

### changePreviewStyle(type)

- 描述: 修改预览模式: tar | vertical
- 例:

```js
editor.changePreviewStyle('tar');
```

### addCommand(type, props)

- 描述: 添加命令

### setMarkdown

### setHtml

### setValue

### getMarkdown

### getHtml

### getValue

### hide

### show
