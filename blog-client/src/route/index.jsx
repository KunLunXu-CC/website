/**
 * 路由配置
 * - 获取路由配置，渲染路由
 */
import React from 'react';
import _ from 'lodash';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import setting from './setting';

export default class Router extends React.Component{

  /**
   * 根据配置：返回 Route 结构并添加 props
   * @param {Array} params router 配置
   */
  getRoutes = (params = []) => {
    if (!_.isArray(params)){return null;}
    const routes = params.map(v => {
      const Component = v.component;
      const props = {};
      v.children && _.forIn(v.children, (value, key) => {
        props[key] = this.getRoutes(value);
      });
      return (
        <Route 
          key={v.path}
          path={v.path}
          exact={v.exact} 
          component={() => (<Component {...props}/>)}
        />
      );
    }); 
    return <Switch>{routes}</Switch>;
  }

  render(){
    const routes = this.getRoutes(setting);
    return (
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    );
  }
} 
