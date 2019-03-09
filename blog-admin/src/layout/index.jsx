import './index.scss';
import React from 'react';
import { Layout } from 'antd';
import useRouteHook from './route/useRouteHook';
import settings from './route/settings';
const { Content } = Layout;
import './route/index';
export default () => {
  useRouteHook(settings);

  return (
    <Layout className="base-frame">
      1111111111111111
    </Layout>
  );
}
