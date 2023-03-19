import * as Pages from '@pages';
import { useRoutes } from 'react-router-dom';

const config = [
  {
    path: '/',
    element: <Pages.Home />,
  },
  {
    path: '/login',
    element: <Pages.Login />,
  },
  {
    path: '/demo',
    element: <Pages.Demo />,
  },
];

export default () => useRoutes(config);
