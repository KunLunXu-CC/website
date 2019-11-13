import * as pages from '@pages';
export default [
  {
    path: '/',
    exact: true,
    component: pages.Home,
  },
  {
    exact: true,
    path: '/login',
    component: pages.Login,
  },
  {
    exact: true,
    path: '/demo',
    component: pages.Demo,
  },
];
