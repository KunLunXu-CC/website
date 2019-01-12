import React from 'react';
import _ from 'lodash';
import { withRouter, matchPath } from 'react-router-dom';
import setting from '../../../route/setting';
import { Layout, Menu, Icon } from 'antd';
import { throws } from 'assert';
const { Sider } = Layout;

@withRouter
class LeftMenu extends React.Component{
  constructor(props){
    super(props);
    const {defaultOpenKeys, defaultSelectedKeys} = this.getDefaultInfoWithPathname();
    this.state = {
      defaultOpenKeys,
      defaultSelectedKeys,
    };
  }

  /**
   * 获取每个菜单项信息（图标和文本信息）
   */
  getMenuInfo = (data) => {
    const icon = data.icon ? (<Icon type={data.icon} />) : null;
    const content = (<span>{data.name}</span>);
    return {icon, content};
  }

  /**
   * 渲染菜单项
   * @param {Object} data 配置信息 
   */
  renderMenuItem = (data = {}) => {
    const info = this.getMenuInfo(data);
    return (
      <Menu.Item key={data.defaultPath || data.path}>
        {info.icon}{info.content}
      </Menu.Item>
    );
  }

  /**
   * 渲染组合菜单 MenuSubMenu
   * @param {Object} data 配置信息
   */
  renderMenuSubMenu = (data = {}) => {
    const info = this.getMenuInfo(data);    
    const title = (<span> {info.icon}{info.content}</span>);
    const menuItems = data.children && data.children.map( child => {
      return this.renderMenuItem(child)
    });
    return (
      <Menu.SubMenu key={data.path} title={title}>
        {menuItems}
      </Menu.SubMenu>
    );
  }
  
  /**
   * 渲染菜单：遍历配置信息针对配置中是否有 children 进行不同处理
   */
  renderMenu  = () => {
    return setting.map( ele => {
      if (ele.children){
        return this.renderMenuSubMenu(ele);
      } else {
        return this.renderMenuItem(ele);
      }
    })
  }

  /**
   * 点击菜单项的事件
   * - 路由跳转
   * @param {Object} 菜单项信息
   */
  onMenuClick = ({ item, key, keyPath }) => {
    const { push } = this.props.history;
    push(key);
  }

  /**
   * 根据 pathname 获取 Menu defaultOpenKeys, defaultSelectedKeys
   */
  getDefaultInfoWithPathname = () => {
    const { pathname } = this.props.location;
    let defaultOpenKeys = [];
    let defaultSelectedKeys = ['/'];
    try {
      setting.forEach( outer => {
      _.isArray(outer.children) && outer.children.forEach( inner => {
          const innerMatch = matchPath(pathname, inner);
          if (innerMatch){
            defaultOpenKeys = [outer.defaultPath || outer.path];
            defaultSelectedKeys = [inner.defaultPath || inner.path];
            throw 'break';
          }
        });
        const outerMatch = matchPath(pathname, outer);
        if (outerMatch){
          defaultSelectedKeys = [outer.defaultPath || outer.path];
          throw 'break';
        }
      });
    } catch (e){}
    return { defaultOpenKeys, defaultSelectedKeys };
  }


  render(){
    return (
      <Sider trigger={null} className="base-sider" collapsible collapsed={this.props.collapsed} >
        <div> LOGO </div>
        <Menu 
          theme="dark" 
          mode="inline"
          onClick = {this.onMenuClick}
          inlineCollapsed={this.props.collapsed}
          defaultOpenKeys = {this.state.defaultOpenKeys}
          defaultSelectedKeys = {this.state.defaultSelectedKeys}>
          {this.renderMenu()}
        </Menu>
      </Sider>
    );
  }
}
export default LeftMenu;
