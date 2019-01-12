import './index.scss';
import React from 'react';
import LeftMenu from './subpage/LeftMenu';
import { Button, Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content, Footer } = Layout;

class BaseFrame extends React.Component{
  render(){
    return (
      <div className="base-frame">
        <div className="base-side">
          <LeftMenu />          
        </div>
        <div className="base-main">
          <div className="base-header">
            header
          </div>
          <div className="base-content">
            body
          </div>
          <div className="base-footer">
            footer
          </div>
        </div>
      </div>
    );
  }
}
export default BaseFrame;
