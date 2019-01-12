/**
 * router 配置
 */
import HomePage from '../pages/HomePage/index';
import ArticleCreation from '../pages/Article/ArticleCreation';
export default [
  {
    path: '/',
    name: '首页',
    code: 'index',
    exact: true,
    component: HomePage,
  }, {
    path: '/article',
    name: '文章管理',
    code: 'article',
    children: [
      {
        path: '/article/creation(/:articleId)',
        name: '文章创作',
        code: 'article-creation',
        component: ArticleCreation,
        children: []
      }
    ]
  }
];
