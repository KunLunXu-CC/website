#### 一、项目搭建
##### 1.1 基本搭建流程
- 脚手架搭建项目
- 配置 stylus 、路由、iconfont
- 添加移动端初始化样式文件 reset.css
- 添加移动端 1px 边框样式文件 border.css
##### 1.2路由配置
- router.js
```vue
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../pages/Home/index.vue';
/* 注册 */
Vue.use(VueRouter);
const routes = [
  { path: '/', component: Home, name: 'Home'}
];
const router = new VueRouter({
  routes
});
export default router;
```
-调用
```vue
import Vue from 'vue'
import App from './pages/App'
import router from './router/index';
...
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

```

##### 1.3 解决移动端300ms点击延迟问题
在移动端web中会遇到300ms点击延迟的问题，这个时候可以使用fastclick来解决这个问题。
```js
// 引入fastclikc
import FastClick from 'fastclick'
// 使用fastclikc
FastClick.attach(document.body)
```
#### 二、HomeHeader 组件的编写
##### 2.1 三栏布局：左右固定高度，中间区块自动撑开
左右分别设置相应浮动，中间区块使用 flex 布局实现区块自动撑开的目的；
```html
<div class="box">
  <div class="left">左</div>
  <div class="center">中</div>
  <div class="right">右</div>
</div>
<style>
.box{
  display flex
}
.left{
	width: 50px;
  float:left
}
.center{
  flex: 1;
}
.right{
	width: 50px;
  float: right;
}
</style>
```
#### 三、 Swiper 使用
##### 3.1 插件 vue-awesome-swiper 使用
```js
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper);
```
###### 3.2 单文件组件的命名不能和组件内的子组件相同命名
如下：组件内部使用组件 swiper 同时在 script 中又为组件命名为 Swiper，如此控制条将会报错；
- 错误提示
```error
vue.runtime.esm.js?2b0e:587 [Vue warn]: Error in nextTick: "RangeError: Maximum call stack size exceeded"

RangeError: Maximum call stack size exceeded
```
- 错误代码
```vue
<template>
  <swiper :options="swiperOption">
  </swiper>  
</template>
<script>
export default {
  name: 'Swiper',
}
</script>
<style lang="stylus" scoped>
</style>
```
#### 3.3 区块高度随宽度自动等比例自动撑开
在网速较慢的情况下，swiper 图片加载相对较慢这时我们就需要给 swiper 包裹一层 div 为其设置宽高进行占位，否则下面内容将会出现明显的跳跃；又因为swiper 宽度高是响应式的，幸好它的宽高是等比例缩放的；所以我们可以这么做：
> 方法一：设置高度 100% 高度 0 然后借用 padding 的百分比值永远相对于区块宽度来计算的原理来实现区块高度与宽度等比例响应的目的；
```html
<div class="box">
	<swiper>....</swiper>
</div>
<style>
/* 假设 swiper 高度/宽度 = 0.3707... */
.box{
	width:100%;
  height: 0;
  padding-bottom: 37.07%;
}
</style>
```
> 方法二：使用单位 vw 即可快速实现，但是存在浏览器兼容性问题，同时必需要求 swaiper 宽度是占满全屏的即：100vw，否则该方法无效；
```html
<div class="box">
	<swiper>....</swiper>
</div>
<style>
/* 假设 swiper 高度/宽度 = 0.3707... */
.box{
	width:100vw;
  height: 37.07vw;
}
</style>
```

##### 3.4 stylus scoped 穿透
在项目中我们使用了 子组件（插件）swiper ，同时在使用 stylus 时我们通过 scoped 来显示编写样式的作用域；那么如此我们设置的样式只能在该组件内部使用；组件里面的样式既不能影响外部样式，也不能比外部样式所影响、如果我们有要影响我们所使用的子组件的样式需求，我们需要进行穿透 query >>> query ； query为选择器，例如:

```styl
<style lang="stylus" scoped>
/*
	swiper 为父组件类  
	swiper-pagination-bullet-active为子组件类
	使用 >>> 进行穿透
	当然 .swiper 并不是必需的只是常规 css 写法，单纯限制样式访问；
*/
.swiper >>> .swiper-pagination-bullet-active
  background #fff
</style>
```

##### 3.5 数据驱动视图：编写可配置数据
swiper 主体内容应该是一组数据（数组），在开始我们搭建的只是静态页面；页面是被我们写死的即使如此我们也应该遵循数据的可配置化，将 swiper 的数据抽取出来集成一个数组放在 vue 组件的状态中；后期我们则可以直接通过调用 API 来获取修改更新数据；当然既然页面中一些固定数据我们也应该尽可能的将其设置为可配置型数据；如此可方便我们对代码以及页面的修改；

#### 四、 iconSwiper
##### 4.4 使用padding-bottom 进行响应式布局
```css
/* 容器宽度自适应，自身宽高比为2:1 */
.box{
  width: 100%;
  height: 0;
  background-bottom: 50%;
}

/*
item 宽度为容器的 1/4， 宽高比为1:1
切记padding-padding 的百分比值是相对于其父级容器的宽度来进行计算而并不是自身的宽度
*/
.box-item{
	float：left;
  width: 25%;
  height: 0;
  padding-bottom: 25%;
}
```

##### 4.5 配置定位来控制自身容器的宽高：高度100，底部相对父容器预留出.44rem

```css
/* 为top left right bottom 设置固定值使得容自动撑开 */
position: absolute;
left: 0;
right: 0;
top: 0;
bottom: .44rem;
```

##### 4.6 stylus 简单函数的实现
```styl
/* 函数ellipsis和括号之间不能有空格 */
ellipsis()
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
```
```styl
/* 使用函数 */
.box
	width 100px
	height 200px
	ellipsis()
```
##### 4.7 vue计算属性：对状态（数据）的二次处理
主要介绍一种处理数据的方法：对数组进行二次处理，将一维数组改为二维数组；遍历数组，每8条数据组合成一个新数组；

```js
computed: {
  groupIconList(){
    const icons = [];
    this.iconList.forEach((item, index) => {
    	// 使用 Math.floor 计算出一维数组的索引
      const groupIndex = Math.floor( index / 8);
      if(!icons[groupIndex]){
      	icons[groupIndex] = [];
      }
      icons[groupIndex].push(item);
    });
  	return icons
  }
}

```
#### 五、 Recommend 组件
- min-width 0 在 flex 中的一个神奇作用
- 使用 float 配置 flex布局后， 设置了 flex 的区块将自动撑开，当设置了禁止换行时 区块将会自动撑开变得无限长，这时为其设置 min-width 0 就能解决问题
```styl
.img-box
    float left
    height 1.7rem
    width 1.7rem
    margin .1rem
    background blue
    img
      width 100%
  .content
    line-height 1.8
    padding-top .2rem
    min-width 0
    flex 1
    .item-title
      color #333
      ellipsis()
    .item-desc
      color #ccc
      ellipsis()
    .item-button
      background #ff9300
      padding 0 .1rem
      border-radius .06rem
      color #fff
```
##### 六、 代理配置
- 根目录添加配置文件： vue.config.js
- 配置内容：
```js
// 当访问： http://localhost:8080/api 讲代理到 http://localhost:8080/mock
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api' : '/mock',
        }
      }
    }
  }
}
```



##### 七、城市列表页面
##### 7.1 列表禁止滚动方法
- 通过 position absolute 并设置left right top bottom使得区块自动撑开；
- overflow hidden 禁止滚动
```styl
.list
	position absolute
  overflow hidden
  left 0
  right 0
  top 1.8rem
  bottom 0
```
##### 7.2 使用插件 better-scroll 实现移动端拖动滚动效果
##### 7.3 使用 flex 实现所有子容器 相对父容器 水平垂直居中
```styl
.box
  display flex
  flex-direction column
  justify-content center
```
#### 八、 vuex简答配置：
主要有三个模块： state 、 actions、 mutations
通过：this.$store.dispatch('actionName', data) 调用actions
通过：this.$store.commit('mutationName', data) 调用mutations
##### 8.1 创建 store
```js
import Vue from 'vue';
import Vuex from 'vuex';

// 在 vue 中使用插件
Vue.use(Vuex);

// 导出store
export default new Vuex.Store({
  state: {
    city: '上海'
  },
  actions: {
    changeCity(ctx, city){
      ctx.commit('changeCity', city);
    }
  },
  mutations: {
    changeCity(state, city){
      state.city = city;
    }
  }
});

```
##### 8.2 创建 vue实例时调用 store
```js
import store from './store';
...
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

```
##### 8.3 调用 action 或者直接调用 mutation 修改状态
```js
// 使用 dispatch 调用 action
this.$store.dispatch('changeCity', city)
// 直接使用 commit 调用 mutation
this.$store.commit('changeCity', city);
```
#### 九、使用 better-scroll 实现移动端滚轮的时候出现无法触发 click 事件的解决办法：
```js
// 在使用 better-scroll 时新增一个配置参数 { mouseWheel: true, click: true, tap: true }
import BScroll from 'better-scroll';
myScroll = new BScroll('#wrapper', { mouseWheel: true, click: true, tap: true });
```
