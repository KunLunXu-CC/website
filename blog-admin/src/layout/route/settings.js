/**
 * ## 路由配置说明： 同时包含左侧菜单栏以及路由的配置
 *   - name       路由名称， 同时也是左侧菜单栏名称
 *   - path       路由 path 参数， 同时在组件渲染过程中将被作为 key 使用
 *   - link       菜单栏点击跳转链接， 在 path 带有参数时需要设置其默认跳转链接
 *   - icon       菜单栏图标设置
 *   - page       路由 component 参数
 *   - subpage    子页面， 归属于某个页面之下但不在菜单栏显示的子页面
 *   - children   子级配置
 *   - authority  是否具有权限（暂时先不弄）
 */
import React from 'react';
import HomePage from '@pages/HomePage';
import TagdManage from '@pages/TagdManage';
import ArticleCreation from '@pages/Article/ArticleCreation';

export default [
  {
    name: '首页',
    path: '/',
    icon: 'home',
    exact: true,
    page: HomePage,
    subpage: [
      {
        name: '404页面',
        type: 'subpage',
        path: '/404',
        level: 2,
        page: () => {return '404页面'},
      }
    ]
  }, {
    name: '文章管理',
    icon: 'ordered-list',
    path: '/article',
    
    children: [
      {
        name: '文章创作',
        path: '/article/creation/:articleId?',
        link: '/article/creation',
        exact: true,
        page: ArticleCreation,
      }
    ]
  }, {
    name: '标签管理',
    path: '/tags',
    icon: 'tags',
    exact: true,
    page: TagdManage,
  }
];
