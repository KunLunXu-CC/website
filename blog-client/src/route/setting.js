/**
 * router 配置： children 中的路由配置将会进行渲染后通过 props 添加到父级 component 中
 */
import React from 'react';
import ArticlePage from '../pages/ArticlePage/index';
import LeftMenu from '../pages/LeftMenu/index';
import Base from '../pages/Base/index';
import HomePage from '../pages/HomePage/index';

export default [
  {
    path: '/',
    exact: true,
    component: HomePage,
  }, {
    path: '/article',
    exact: false,
    component: Base,
    children: {
      leftMenu: [
        {
          exact: true,
          path: '/article/list',
          component: LeftMenu,
        }
      ],
      body: [
        {
          exact: true,
          path: '/article/list',
          component: ArticlePage,
        }
      ],
    }
  }
];
