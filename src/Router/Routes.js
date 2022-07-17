
import React from 'react';
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
];

export default () => useRoutes(config);
