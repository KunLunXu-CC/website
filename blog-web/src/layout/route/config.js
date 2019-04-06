import * as page from '@page';

export default [
  {
    name: '家目录',
    code: 'Home',
    exact: true,
    path: '/',
    page: page.Home
  }, {
    name: '404',
    code: 'NotFound',
    page: page.NotFound
  },
];
