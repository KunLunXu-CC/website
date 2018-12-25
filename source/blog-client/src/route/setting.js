import Home from '../pages/Home';
import ArticleDetail from '../pages/ArticleDetail';
import ArticleList from '../pages/ArticleList';

export default [
  {
    key: 'home',
    exact: true,
    path: '/',
    component: Home
  }, {
    key: 'articleDetail',
    exact: false,
    path: '/article/detail',
    component: ArticleDetail
  }, {
    key: 'articleList',
    exact: false,
    path: '/article/list',
    component: ArticleList
  },
];
