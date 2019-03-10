import HomePage from '@pages/HomePage';
import TagdManage from '@pages/TagdManage';
import ArticleCreation from '@pages/Article/ArticleCreation';
/**
 * 拾遗补阙
 * 
name: '名称',
path: '路径 也是 code ', 
link: '路由跳转',
icon: '图标',
page: '页面',
authority: '权限',
subpage: '子页面',
children: '儿子'

 */
import React from 'react';

export default [
  {
    name: '首页',
    path: '/',
    icon: 'home',
    exact: true,
    page: HomePage,
    // subpage: [
    //   {
    //     name: '404页面',
    //     path: '*',
    //     page: () => {return '404页面'},
    //   }
    // ]
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
        // subpage: [
        //   {
        //     name: '文章创作-内页',
        //     path: '/article/creation/:type/:articleId?',
        //     exact: true,
        //     page: () => {return '首页'},
        //   }
        // ]
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
