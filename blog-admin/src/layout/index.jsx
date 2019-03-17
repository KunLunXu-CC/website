import './index.scss';
import React, { useState } from 'react';
import { Layout } from 'antd';
import useRouteHook from './route/useRouteHook';
import settings from './route/settings';
import LeftMenu from './subpage/LeftMenu';
import FooterBlock from './subpage/FooterBlock';
import HeaderBlock from './subpage/HeaderBlock';
import { BrowserRouter, Route, Switch } from "react-router-dom";
const { Content } = Layout;

const useStateHook = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const routeHook = useRouteHook(settings);
  // 切换菜单是否收起状态（collapsed）
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  }
  return { collapsed, routeHook, toggleCollapsed };
}

export default (props) => {
  const { collapsed, routeHook, toggleCollapsed } = useStateHook();
  return (
    <BrowserRouter>
      <Layout className="base-frame">
        <LeftMenu collapsed={collapsed} routeHook={routeHook}/>
        <Layout>
          <HeaderBlock toggleCollapsed={toggleCollapsed} collapsed={collapsed} />
          <Content className="base-content">
            <div className="base-body pw">
              {routeHook.routeChildren}
            </div>
            <FooterBlock />
          </Content> 
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}
