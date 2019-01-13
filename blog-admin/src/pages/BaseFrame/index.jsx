import './index.scss';
import React from 'react';
import LeftMenu from './subpage/LeftMenu';
import HeaderBlock from './subpage/HeaderBlock';
import FooterBlock from './subpage/FooterBlock';
import { Layout } from 'antd';
const { Content } = Layout;

class BaseFrame extends React.Component{
  constructor(){
    super();
    this.state = {
      collapsed: false
    };
  }

  /**
   * 收缩左侧菜单栏
   */
  toggle = () => {
    this.setState({collapsed: !this.state.collapsed});
  }

  render(){
    return (
      <Layout className="base-frame">
        <LeftMenu collapsed={this.state.collapsed} />
        <Layout>
          <HeaderBlock toggle={this.toggle} collapsed={this.state.collapsed} />
          <Content className="base-content">
            <div className="base-body ptw plw prw">
              {this.props.children}
            </div>
            <FooterBlock />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default BaseFrame;
