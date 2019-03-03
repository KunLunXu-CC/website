/**
 * 拾遗补阙
 * router 配置: 路由 + 左侧菜单
 * - path
 * - 有 defaultPath 时左侧菜单点击时的跳转路由， 否则默认跳转到 path
 * - icon 
 * - exact: 严格匹配当　exact　为 false 时  /one/two 可以匹配 /one 
 * - component
 */
import HomePage from '../pages/HomePage/index';
import ArticleCreation from '../pages/Article/ArticleCreation/index';
import TagdManage from '../pages/TagdManage/index';
export default [
  {
    path: '/',
    name: '首页',
    icon: 'home',
    exact: true,
    component: HomePage,
  }, {
    path: '/article',
    exact: true,
    icon: 'ordered-list',
    name: '文章管理',
    children: [
      {
        path: '/article/creation/:articleId?',
        exact: true,
        defaultPath: '/article/creation',
        name: '文章创作',
        component: ArticleCreation,
        children: []
      }
    ]
  }, {
    path: '/tags',
    name: '标签管理',
    icon: 'tags',
    exact: true,
    component: TagdManage,
  }, 
];
