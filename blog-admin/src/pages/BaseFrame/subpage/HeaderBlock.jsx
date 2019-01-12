import React from 'react';
import { Layout, Icon } from 'antd';

const { Header } = Layout;

export default class HeaderBlock extends React.Component{
  render(){
    return (
      <Header className="header">
        <Icon 
          className="trigger"
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.toggle}
        />
      </Header>
    );
  }
}
