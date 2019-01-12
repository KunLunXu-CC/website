/**
 * 路由组件
 */
import _ from 'lodash';
import React from 'react';
import setting from './setting';
import BaseFrame from '../pages/BaseFrame/index';
import { BrowserRouter, Route, Switch } from "react-router-dom";

export default class Router extends React.Component{
  /**
   * 渲染 Route
   * @param {Object} data 单个 Route 配置参数
   * @return {Object} Route 组件
   */
  renderRoute = (data) => (
    <Route 
      key={data.path}
      path={data.path}
      exact={data.exact} 
      component={data.component}
    />
  );

  /**
   * 根据配置：返回 Routes
   * @param {Array} params router 配置
   * @return {Array} Route 数组
   */
  getRoutes = (params = []) => {
    const routes = [];
    const _getRoutes = (values = []) => {
      values.forEach( v => {
        if (v.component){
          routes.push(this.renderRoute(v));
        } else if (_.isArray(v.children)){
          _getRoutes(v.children);
        }
      });
    };
    _getRoutes(params);
    return <Switch>{routes}</Switch>;
  }

  render(){
    return (
      <BrowserRouter>
        <BaseFrame>
          {this.getRoutes(setting)}
        </BaseFrame>
      </BrowserRouter>
    );
  }
}
