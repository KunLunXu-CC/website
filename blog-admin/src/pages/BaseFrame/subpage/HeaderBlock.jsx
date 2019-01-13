import React from 'react';
import { Layout, Icon } from 'antd';

const { Header } = Layout;

export default class HeaderBlock extends React.Component{
  render(){
    return (
      <Header className="base-header po">
        <Icon 
          className="trigger f18 plrw cp"
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.toggle}
        />
      </Header>
    );
  }
}
