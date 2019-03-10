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

const stateHook = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const routeHook = useRouteHook(settings);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  }
  return { collapsed, routeHook, toggleCollapsed };
}

export default (props) => {
  const state = stateHook();
  return (
    <BrowserRouter>
      <Layout className="base-frame">
        <LeftMenu collapsed={state.collapsed} routeHook={state.routeHook}/>
        <Layout>
          <HeaderBlock toggleCollapsed={state.toggleCollapsed} collapsed={state.collapsed} />
          <Content className="base-content">
            <div className="base-body pw">
              {state.routeHook.routeChildren}
            </div>
            <FooterBlock />
          </Content> 
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}
