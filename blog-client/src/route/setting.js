/**
 * router 配置： children 中的路由配置将会进行渲染后通过 props 添加到父级 component 中
 */
import React from 'react';
import ArticleList from '../pages/ArticleList/index';
import Base from '../pages/Base/index';
import HomePage from '../pages/HomePage/index';

export default [
  {
    path: '/',
    exact: true,
    component: HomePage,
  }, {
    path: '/blog',
    exact: false,
    component: Base,
    children: {
      leftMenu: [
        {
          exact: true,
          path: '/blog/article/list',
          component: () => {return (<span>1</span>)},
        }
      ],
      body: [
        {
          exact: true,
          path: '/blog/article/list',
          component: () => {return (<span>2</span>)},
        }
      ],
    }
  }
];
