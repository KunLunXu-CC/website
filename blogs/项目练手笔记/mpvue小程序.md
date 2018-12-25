##### 一、项目架构介绍
```shell
├── app.js              应用全局处理逻辑
├── app.json            应用全局配置
├── app.wxss            应用全局样式
├── pages               应用页面
│   ├── index           首页
│   │   ├── index.js      首页-js逻辑
│   │   ├── index.wxml    首页-页面摸板
│   │   └── index.wxss    首页-样式
│   └── logs            Logs页面
│       ├── logs.js       Logs页面-js逻辑
│       ├── logs.json     Logs页面-页面配置
│       ├── logs.wxml     Logs页面-页面模板
│       └── logs.wxss     Logs页面-样式
├── project.config.json 项目配置
└── utils               工具库
    └── util.js

```
#### 二、常见钩子函数
- onLaunch  小程序启动时执行，初始化配置 
- onShow    小程序显示时执行
- onHide    小程序隐藏时执行
- onError   小程序报错时执行

#### 三、wxss 文件是小程序的样式文件
- 语法规则和 css 一模一样
- 唯一不同的可能就是多了一个单位： rpx
- rpx 是小程序自带的一个单位， 它会根据不同设备进行适配；
- rpx 宽度的最大值为 750，等于设备的宽度；

#### 四、app.json 配置文件
> app.json文件用来对微信小程序进行全局配置，决定页面文件的路径、窗口表现、设置网络超时时间、tab配置 等。
> 主要配置配置项有： **pages**、**window**、 **tabBar** 更多的配置查阅小程序开发文档配置项下的全局配置。
###### 4.1 pages 配置项：
> 用于指定小程序由哪些页面组成，每一项都对应一个页面的。每项由 **路径+文件名** 组成, 文件名不需要写文件后缀，框架会自动去寻找相对于当前位置的 .json, .js, .wxml, .wxss 四个文件进行处理。
> 例子：
- 有项目目录如下：有两个页面 index 以及 logs
```shell
├── app.js
├── app.json
├── app.wxss
├── pages
│   │── index
│   │   ├── index.wxml
│   │   ├── index.js
│   │   ├── index.json
│   │   └── index.wxss
│   └── logs
│       ├── logs.wxml
│       └── logs.js
└── utils
```
- 那么 app.json 配置文件中 pages 对应的配置应该如下（放在第一项将默认作为首页进行展示）
```json
{
  "pages":[
    "pages/index/index",
    "pages/logs/logs"
  ]
}
```
##### 4.2 window 配置项
> 用于设置小程序的状态栏、导航条、标题、窗口背景色。
```json
{
	"window":{
		/* ***导航栏样式配置*** */
		"navigationStyle": "default",						// 配置导航栏样式：默认（default）、自定义（custom）
		"navigationBarBackgroundColor": "#666",	// 配置导航栏背景色
		"navigationBarTitleText": "潜隐图书",		 // 设置导航栏标题内容
		"navigationBarTextStyle":"white",			 // 设置导航栏标题字体颜色

		/* ***背景设置（由于页面都会设置私有背景色 所以一般只有在下拉加载时才会看到实际效果）*** */
		"backgroundTextStyle":"dart",				// 背景文字类型： dark / light （可控制下拉加载小点点的样式）
		"backgroundColor": "#ccc",					// 窗体背景颜色（下拉加载更多时会显示该背景色）
		"backgroundColorTop": "#f00",				// 顶部窗口的背景色（下拉加载更多若设置了该值则以该参数为准）
		"backgroundColorBottom": "#0f0",		// 底部窗口的背景色

		/* ***其他配置*** */
		"enablePullDownRefresh": true,			// 是否全局开启下拉刷新。默认：false
		"onReachBottomDistance": 50					// 页面上拉时，距页面底部多少距离触发触底事件，单位 px，默认 50
	}
}
```
- 补充： navigationStyle 只在 app.json 中生效。开启 custom 后，低版本客户端需要做好兼容。开发者工具基础库版本切到 1.7.0（不代表最低版本，只供调试用）可方便切到旧视觉


##### 4.3 tabBar 配置项：
> 如果小程序是一个多 tab 应用（客户端窗口的底部或顶部有 tab 栏可以切换页面），可以通过 tabBar 配置项指定 tab 栏的表现，以及 tab 切换时显示的对应页面。
```json
{
	"tabBar": {
		"color": "#999",										// tab 字体颜色设置
		"selectedColor": "#33CCFF",					// tab 选中时字体颜色设置
		"backgroundColor": "#fff",					// tab 背景颜色设置
		"borderStyle": "white",							// tab 边框颜色设置 black / white
		"position": "top",									// tab 定位设置 bottom / top
		"list": [														// tab 每个 item 设置（数组）						
			{
				"text": "首页",									 // tabItem 文字内容
				"iconPath": "",									// tabItem 文字前 icon
				"selectedIconPath": "",					// tabItem 选中时 文字前 icon
				"pagePath": "pages/index/index"	// tabItem 切换时所对应的页面（需在 pages 进行配置）
			},
			{
				"text": "logs",
				"iconPath": "",
				"selectedIconPath": "",
				"pagePath": "pages/index/logs"
			}
		]
	}
}

```

#### 五、mpvue 的使用
##### 5.1 mpvue太久没更新维护用的还是 2.x的模版；
##### 5.2 安装环境：
> 实际上就是安装 vue 并且指定一个项目模版；

```shell
# 现在vue-cli 版本为3.x 为了能够使用 2.x 使用下面命令 拉取 2.x 模板 (旧版本)
$ npm install -g @vue/cli-init
# 创建 npmvue 项目环境
$ vue init mpvue/mpvue-quickstart my-project
# 运行项目
$ cd my-project
$ npm install
$ npm run dev
```

##### 5.3 那么mpvue项目又如何导入小程序开发工具呢?
- 实际上在我们通过执行 `npm run dev` 即可将项目运行起来，同时项目下会生成一个 dist 目录，该目录实际上就是项目编译后的内容，而该内容就是编译装换后的小程序项目。在小程序开发工具中我们在新增项目时只要将 dist 作为其项目文件即可；
- 在我们修改 mpvue 项目后，将会重新编译更新 dist 从而更新小程序项目；
- 在项目下有 `project.config.json` 对应的是小程序中的 `project.config.json` 项目配置文件；
- 在项目下 src 下有 `app.json` 对应的是小程序中的 `app.json` 应用配置文件；
- 而在 src 下 pages 目录则同样对应着每个独立的页面， 每个页面都要有一个 `main.js` 将页面进行挂载
- 而修改导航栏标题的方式和教程上实际上已经有一定差别需要手动调用 wx 中的接口进行设置：
```js
	mounted () {
		wx.setNavigationBarTitle({
			title: '修改后的导航'
		})
	}
```
#### 六、开发者工具腾讯云部署：
- 进入微信公众平台|小程序后台，在开发者工具处开通腾讯云；
- 进入管理者页面根据步骤进行安装；
- 下载 node demo 代码，将其中的 serve 目录拷贝到项目目录下，并且设置 project.config.json 指向 serve 目录；
- 在微信开发者工具中选择上传；


#### 七、本地搭建： 
- 本地 mysql 安装： 版本不要太高
- 搭建本地服务参考腾讯云管理后台常见问题
- 修改 server 中的配置文件信息

#### 八、页面骨架搭建：
- 参考原本项目结构：主要修改 src 项目下的源码部分
- 主要修改文件： src/app.json （应用配置）
- 参考 src/pages/ 下的页面文件结构子定义页面并删除不必要的文件；
- 配置 app.json 中的 tabBar 

#### 九、 工具库的封装：
- 首先小程序通过内置 API `wx.request()` 来请求数据的，奈何该 API 所使用的语法类似 Ajax 的回调形式；
- 这里我们就想使用 Promise 对该 API 进行二次封装：
- 封装代码如下：
```js
/**
 * get 请求
 * @param {String} url 路由 
 * @param {Object} data  数据参数
 */
export const get = (url, data={})  => {
  url = `${config.server.host}${url}`;
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      url,
      header: {
        'content-type': 'application/json'
      },
      success (res) {
				// 请求结果处理
        console.log(`%c【get:${url}】`, 'color: pink', res);
        if(res.data.code === 0){
          resolve(res.data.data);
        } else {
          reject(res.data.data);
        }
      }
    })
  });
}
```


#### 十、获取用户信息：
##### 10.1 安装 wafer2-client-sdk
> 本 项目是 Wafer2 的组成部分，为小程序客户端开发提供 SDK 支持会话服务和信道服务。让我们更好的获取用户信息；内置对wx.getUserInfo 进行了封装； 
- 安装
```shell
$ npm install wafer2-client-sdk --save
```
- 例：
```js
const loginUrl = 'xxxxxx';
qcloud.setLoginUrl(loginUrl);
qcloud.login({
	success: function (userInfo) {
		console.log('登录成功', userInfo);
	},
	fail: function (err) {
		console.log('登录失败', err);
	}
});
```

##### 10.2 wx.getSetting 方法
> 获取用户设置， 实际是获取当前用户的所有权限；
- 例： 获取用户所有设置（权限），并判断用户是否授权用户信息；
```js
 wx.getSetting({
	success(res){
		if(res.authSetting['scope.userInfo']){
			// 用户已授权：可在这里获取用户信息， 并进行相应操作
		}
	}
);
```
##### 10.3 wx.getUserInfo
> 调用前需要用户授权 scope.userInfo， 用户授权后才能获取用户信息；
-例：
```js
wx.getUserInfo({
	success: function(res) {
		const userInfo = res.userInfo
		const nickName = userInfo.nickName
		const avatarUrl = userInfo.avatarUrl
		const gender = userInfo.gender //性别 0：未知、1：男、2：女
		const province = userInfo.province
		const city = userInfo.city
		const country = userInfo.country
	}
})
```
##### 10.3 wx.canIUse 
> 判断判小程序的API，回调，参数，组件等是否在当前版本可用。
例:
```js
// 判断 button.open-type.getUserInfo 是否可用（是否需要进行手动授权引导）
canIUse: wx.canIUse('button.open-type.getUserInfo'),
```
##### 10.4 wx.showToast 
> 提示信息弹窗
- 例:
```js
wx.showToast({
	title: '登录成功！',
	icon: 'success'

});
```
##### 10.5 wx.setStorageSync && wx.getStorageSync
> wx.setStorageSync(key, value):  同步设置本地缓存
> wx.getStorageSync(key)： 同步获取本地缓存

##### 10.6 如何判断用户是否点击了允许用户授权:
> 新版 API 用户一进入页面并不会主动触发用户授权页面，需要通过 button 来引导用户进行授权操作：
- 下面将会弹出授权窗口： 绑定getuserinfo事件即可通过事件对象判断用户是否点击了允许授权按钮；
```vue
 <button 
	v-if="canIUse && !isLogin" 
	@getuserinfo="bindGetUserInfo"
	open-type="getUserInfo">登录</button>
```
- 通过事件对象获取 userInfo 信息进行判断用户是否点击了授权按钮；
```js
bindGetUserInfo(e){
	if(e.target.userInfo){
		this.login();
	}
}
```

#### 十一、一个小 BUG
> 在页面从一个和 pages 同级目录 componens 内引入一个新的组件进行调用时，报错 
> 在 appjson 正确引入 iconPath 后在小程序开发工具点击预览进行真机测试时显示 文件未找到 
```shell
Template "xxx" not found.
```
> 解决办法： 先执行 npm run build 后执行 npm run dev 就好了（为什么我页不懂）



#### 十二、YearProgress 组件的编写：
> 并没有什么特别之处, 主要是闰年以及当前过去天数的计算
- 闰年的计算：
```js
isLeapYear(){
	const year = new Date().getFullYear();
	if( year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0) ){
		return true;
	} else {
		return false;
	}
},

```
- 当前过去天数计算：
```js
 days(){
	const start = new Date();
	start.setMonth(0);
	start.setDate(1);
	return ~~((new Date().getTime() - start.getTime()) / (1000*60*60*24) + 1);
},
```

#### 十三、 knex mysql链表查询

```js
// 查询 books 并链表查询 cSessionInfo
// select函数表示要查询的字段： books 中的所有数据， cSessionInfo 中的 user_info
// join 函数， 与 cSessionInfo 进行链表查询， 链接条件 'books.openId' 等于 'cSessionInfo.open_id'
// orderBy 函数进行排序操作
const list = await mysql('books')
	.select('books.*', 'cSessionInfo.user_info')
	.join('cSessionInfo', 'books.openId', 'cSessionInfo.open_id')
	.orderBy('books.id', 'desc');
```

#### 十四、 星星评级
> 使用字符串 ☆★ 并通过定位覆盖的方式来实现； 并通过控制覆盖层的宽度来实现不同评级支持小数；
> 因为是字符串所有可以直接通过 color 来说设置颜色；
```js
<template>
  <div class="rate">
    <div class="hollow" :style="style">★★★★★</div>
    <div>☆☆☆☆☆</div>
  </div>
</template>
<script>
export default {
  name: 'Rate',
  props: {
    value: {type: [String, Number], default: 0}
  },
  computed: {
    style(){
      return `width: ${this.value/2}em`
    }
  }
}
</script>
<style lang="scss" scoped>
.rate{  
  display: inline-block;
  position: relative;
  .hollow{
    display: inline-block;
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    width: 0;
  }
}
</style>
```

#### 十五、 mpvue 页面配置
- 参考：https://www.imooc.com/article/71715
> 在早期版本中如果需要对单页面进行相应配置的话需要在 main.js 文件中进行相应设置
```js
// main.js
import Vue from 'vue';
import Books from './index';

const app = new Vue(Books);
app.$mount();
export default {
  config: {
    enablePullDownRefresh: true
  }
}
```
> 在新版本中将单页面配置分离出来， 如果需要对单页面进行配置的话只需要在页面目录下创建 main.json，并进行相应配置即可；
```json
{
  "enablePullDownRefresh": true
}

```

#### 十六、 mpvue 下拉刷新
> 下拉刷新说实话简单得有点过分：
- 配置页面配置( main.json )： 开启全局下拉
```json
{
  "enablePullDownRefresh": true,
  "backgroundTextStyle": "dart"
}
```
- 在小程序中下拉刷新将会触发生命钩子： onPullDownRefresh 
```js
// 因为有了生命钩子所以只需要在生命钩子中重新加载数据即可；
onPullDownRefresh(){
	this.getBookList();
}
getBookList(){
	// 在导航栏标题前显示加载 icon
	wx.showNavigationBarLoading();
	...
	// 隐藏导航栏的加载提示
	wx.hideNavigationBarLoading();
	// 手动结束下拉状态， 否则要过好几秒下拉状态才会收起
	wx.stopPullDownRefresh();
}
```

#### 十七、 Books页面 下拉加载更多
> 两个状态： page 监听当前页 、 more 监听是否还有更多数据
> 实现功能：
- 假如有35条数据，每次加载10条
- 当 page 为0时，加载 0 - 10条数据
- 当 page 为1时，加载 10 - 20条数据
- 当 page 为2时，加载 20 - 30条数据
- 当 page 为3时，加载 30 - 35条数据
- 当 加载的数据小于10, more = false 结束触底操作

#####  17.1 后端只需要修改查询条件：
- 获取请求参数： page 当前页
- 设置每次请求的条数：  size = 10
- 通过 limit 函数设置 API 每次请求的条数
- 通过 offset 函数设置每次 API 从那条数据开始查起
- 补充： 实际上 limit offset 函数做的是过滤数据的操作，实际上会先查询出所有的数据然后对数据进行过滤处理；如果数据很多，进行分页改变的并不是查询上的损耗，而是在后端数据往前端传输过程中的损耗；
```js

module.exports = async (ctx, next) => {
  // 获取当前页， 设置每次加载的条数（写死）
  const { page=0 } = ctx.request.query;
  const size = 10;
  const list = await mysql('books')
    .select('books.*', 'cSessionInfo.user_info')
    .join('cSessionInfo', 'books.openId', 'cSessionInfo.open_id')
    .offset(Number(page) * size)
    .limit(size)
    .orderBy('books.id', 'desc');

  ctx.state.data = {list};
}
```
##### 17.2 前端的修改
- 新增状态： page(记录当前请求的页数) more(记录是否还有更多的数据)
```js
data(){
	return {
		bookList: [],
		page: 0,
		more: true
	}
},
```
- getBookList 获取数据函数修改：

```js
// 增加形参 init 表示是否是初始化获取数据； 
// 当下拉刷新或者第一次进入页面时传入 true 用于和触底加载区分开
getBookList(init){

	// 如果是初始化加载数据时重置状态 more page, 触底加载 page进行叠加 
	if(init){
		this.more = true;
		this.page = 0;
	} else {
		this.page ++
	}

	wx.showNavigationBarLoading();
	// 调用后端接口时新增请求参数： page
	get('/weapp/bookList', {page: this.page}).then(res => {
		const list = this.handlerBookList(res.list);
		
		// 对返回的数据新增处理方式： 
		// [1]获取的数据小于 10 表示没有更多的数据了
		if(list < 10){this.more = false}
		if(init){
			// [2]如果初始加载数据应该采用 = 来更新状态 bookList， 并且停止下拉加载
			this.bookList = list;
			wx.stopPullDownRefresh();
		} else {
			// [3]如果是触底加载应该采用 concat（追加） 来更新状态
			this.bookList = this.bookList.concat(list);
		}
		wx.hideNavigationBarLoading();
	});
}

```

- 在初始加载（包括下拉加载）调用 getBookList 时传入参数 true: 表示是初始加载而非触底加载
```js
created(){
	this.getBookList(true);
},
onPullDownRefresh(){
	this.getBookList(true);
},

```
- 小程序同下拉刷新，针对触底操作有一生命钩子进行监听： onReachBottom； 所以只需在生命钩子中调用 getBookList 来加载数据即可；

```js
onReachBottom(){
	// 在有更多数据时进行加载
	this.more && this.getBookList();
}
```
#### 十八、 页面跳转：
##### 18.1 通过链接进行跳转
- 新增页面（目录） index.vue && main.js；
- 在 app.json 配置项 pages 添加新增的页面；
- 页面跳转通过 a 标签进行：
```html
<a href="/pages/detail/main?id=12345456">跳转到详情页面</a>
```
- 在页面内获取路由参数
```js
mounted(){
	const { id='' } = this.$root.$mp.query;
	this.bookId = id;
}
```
##### 18.2 通过微信 API 进行跳转
```js
navigateTo(id){
	wx.navigateTo({
		url: `/pages/detail/main?id=${id}`
	})
}
```

#### 十九、 knex 对 mysql 内指定字段进行自增 并返回 查询出第一条数据
```js
const { mysql } = require('../qcloud.js');
module.exports = async (ctx, next) => {
  const {id} = ctx.request.query;
  mysql('books')
    .where('id', id)
		.increment('count', 1);
	
	// 查出来的是个数组通过 first 函数返回第一条数据
  const detail = await mysql('books').select().where('id', id).first();
  ctx.state.data =detail;
}
```

#### 二十、 knex 根据 count 进行降序排序并取出9条数据

```js
const { mysql } = require('../qcloud.js');
module.exports = async (ctx, next) => {
  const data = mysql('books')
    .select('id', 'title', 'image', 'count')
    .orderBy('count', 'desc')
    .limit(9);
  ctx.state.data = data;
}
```

#### 二十一、 图片预览以及点击事件拒绝冒泡
- 拒绝冒泡
```html
<div class="thumb" @click.stop="previewImage"></div>
```
- 图片预览
```js
previewImage(){
	wx.previewImage({
		current: this.book.image,
		urls: [this.book.image]
	});
}
```

#### 二十二、 获取地理位置：
- 首先需要登录百度地图开放平台 => 开发文档 => web服务API
- 找到全球逆地理编码，根据指南一步步创建应用、获取 ak
- 微信API + 百度地图API 获取地理位置
```js
export const getLocation = () => new Promise((resolve, reject) => {
  const { url, ak } = config.baiduLocation;
	// 微信API: 获取  纬度 经度
	wx.getLocation({
    success(res){
			const {latitude, longitude} = res;
			// 微信API发起百度地图API根据经纬度获取地理位置
			wx.request({
        url,
        data: {
          ak,
          location: `${latitude},${longitude}`,
          output: 'json'
        },
        header: {
          'content-type': 'application/json'
        },
        success(location){
          if(location.data.status === 0){
            resolve(location.data.result);
          } else {
            resolve({});
          }
        }
      });
    }
  });
});

```
#### 二十三、 插入、查询获取评论列表查询语句
- 插入
```js
await mysql('comments').insert({
	comment, location, phone, bookId, openId
});
```
- 查询
```js
const list = await mysql('comments')
	.select('comments.*', 'cSessionInfo.user_info')
	.join('cSessionInfo', 'comments.openId', 'cSessionInfo.open_id')
	.where('bookId', bookId);
```


#### 二十四、 koa 源码解析:
##### 24.1 简单服务的创建及封装
> 基与原生 http 模块创建简单的 server 服务
- 创建 server.js 文件并编写如下代码：
```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('hello world!');
});

server.listen(3000, () => {
  console.log('listen: 3000');
});
```
- 运行： `node server.js`
- 打开： localhost:3000 测试服务

> 对上面步骤进行简单的封装：创建
- 创建 application.js 并对上文代码进行简单的封装
```js
const http = require('http');

class Application{
  constructor(){
    // 初始化回调函数
    this.callback = () => {};
  }

  // 设置添加回调函数
  use(callback){
    this.callback = callback;
  }

  // 设置监听函数：[1]创建服务 [2]对服务进行监听
  listen(...args){
    const server = http.createServer((req, res) => {
      this.callback(req, res);
    });
    server.listen(...args);
  }
}
// 导出模块
module.exports = Application;
```

- 在 server.js 中引入 Application 模块并进行调用，并创建服务
```js
// 导入模块
const Application = require('./application.js');

// 创建模块（对象）
const app = new Application();

// 添加（使用）回调函数
app.use((req, res) => {
  res.writeHead(200);
  res.end('hello world!!');
});

// 调用 listen 方法： [1]创建服务，引用回调函数 [2]对服务进行监听
app.listen(3000, () => {
  console.log('服务创建成功，监听于： localhost:', 3000);
});
```

##### 24.2 对象中 setter 和 getter简单介绍
> getter 
```js
const qianyin = {
	// 设置属性，当对象获取该属性值时调用(该属性只读不可修改)
  get name(){
    console.log('可做其他处理');
    return 'qianyin'
  }
};

// 获取值
console.log(qianyin.name); 	// qianyin

// 设置值 并重新打印
qianyin.name = 'linheng';		// 修改无效（只读），而且不会报错
console.log(qianyin.name);	// 依然是 qianyin 
```
> setter
```js
const qianyin = {
	// 设置属性，当对象给该属性赋值时调用参数为要设置的值(该属性只写不可读取)
  set age(val){	
    console.log('qianyin.age', val);
  },
};

qianyin.age = 20;         // qianyin.age 20
console.log(qianyin.age); // undefined
```

##### 24.3 挂载 context
> 创建 context 以及 context.request context.response 需要挂载的属性的模板

```js
let request = {
  get url(){
    return this.req.url
  }
};
let response = {
  get body(){
    return this._body
  },
  set body(val){
    this._body = val; 
  }
};
let context = {
  get url(){
    return this.request.url;
  },
  get body(){
    return this.response.body;
  },
  set body(val){
    this.response.body = val;
  }
};
```
> 将创建的模板 context  request  response 挂载到  Application 之上

```js
class Application{
  constructor(){
    this.context = context;
    this.request = request;
    this.response = response;
	}
	// ......
}
```

> 编写 ceateCtx 函数借此创建 context 
```js

class Application{
  constructor(){
    this.context = context;
    this.request = request;
    this.response = response;
	}
	
	// ......

	createCtx(req, res){
		// 通过模板 this.context this.request this.response 分别创建 ctx ctx.request ctx.response
    let ctx = Object.create(this.context);
    ctx.request = Object.create(this.request);
		ctx.response = Object.create(this.response);
		// 最后将 req res 分别挂载一份到 ctx ctx.request 和 ctx.response 上
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    return ctx;
	}
	// ......
}
```
> 重写 listen 创建 ctx 并作为参数传给 回调函数
```js
class Application{

	// ......
	
  listen(...args){
    const server = http.createServer(async (req, res) => {
      const ctx = this.createCtx(req, res);
      await this.callback(ctx);
      ctx.res.end(ctx.body);
    });
    server.listen(...args);
	}

	// ......

}
```
> 修改 server.js 
- 修改use中回调函数的参数， 以及设置值的方式
```js
const Application = require('./application.js');

const app = new Application();

app.use(async (ctx) => {
  ctx.request.getage1();
  ctx.body = `holle world ${ctx.url}`；
});

app.listen(3000, () => {
  console.log('服务创建成功，监听于： localhost:', 3000);
});

```
##### 24.4 洋葱模型的实现

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
// compose 传入中间件数组以及 context
// compose 返回 dispatch 
// dispatch 返回promise
// promise 调用中间件， 并传入函数 函数返回下一个 dispatch()
// 如此一层嵌套一层
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

##### 24.5 洋葱模型在koa中的使用
