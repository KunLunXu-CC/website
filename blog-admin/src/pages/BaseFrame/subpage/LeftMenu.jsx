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
    this.state = {
      openKeys: [],
      selectedKeys: []
    };
  }

  componentDidMount(){
    this.resetMenuWithPathname();
  }

  componentWillMount(nextProps, nextState){
    this.resetMenuWithCollapsed(nextProps);
    // this.resetMenuWithPathname(nextProps);

  }

  componentDidUpdate(nextProps, nextState){
    this.resetMenuWithPathname(nextProps);
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
   * - 设置　selectedKeys
   * @param {Object} 菜单项信息
   */
  onMenuClick = ({ item, key, keyPath }) => {
    const { push } = this.props.history;
    const openKeys = keyPath[1] ? [keyPath[1]] : [];
    const selectedKeys = [keyPath[0]];
    this.setState({ openKeys, selectedKeys });
    push(key);
  }

  /**
   * SubMenu展开/关闭事件
   */
  onOpenChange = (openKeys) => {
    this.setState({ openKeys });
  } 

  /**
   * g根据 pathname 重设 Menu openKeys selectedKeys
   * @param {Object} preProps 前一个 props
   */
  resetMenuWithPathname = (preProps = {}) => {
    const { pathname: prePathname } = preProps.location || {};
    const { pathname: currPathname } = this.props.location;
    const pathname = currPathname || prePathname;
    const openKeys = [];
    const selectedKeys = [];
    if (prePathname === currPathname){ return false;}
    try {
      setting.forEach( outer => {
      _.isArray(outer.children) && outer.children.forEach( inner => {
          const innerMatch = matchPath(pathname, inner);
          if (innerMatch){
            openKeys.push(outer.defaultPath || outer.path);
            selectedKeys.push(inner.defaultPath || inner.path);
            throw 'break';
          }
        });
        const outerMatch = matchPath(pathname, outer);
        if (outerMatch){
          selectedKeys.push(outer.defaultPath || outer.path);
          throw 'break';
        }
      });
    } catch (e){}
    this.setState({openKeys, selectedKeys});
  }

  /**
   * 根据 collapsed 重设 menu： 收缩菜单栏时应该清空 openKeys
   * @param {Object} nextProps 前一个 props
   */
  resetMenuWithCollapsed = (nextProps ={}) => {
    const nextCollapsed = nextProps.collapsed;
    const currCollapsed = this.props.collapsed;
    console.log('----------------');
    if (nextCollapsed !== currCollapsed && nextCollapsed === true ){
      this.setState({openKeys: []}, () => {
        console.log(1111111)
      });
    }
  }

  render(){
    return (
      <Sider trigger={null} className="base-sider" collapsible collapsed={this.props.collapsed} >
        <div> LOGO </div>
        <Menu 
          theme="dark" 
          mode="inline"
          onClick = {this.onMenuClick}
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          inlineCollapsed={this.props.collapsed}
          selectedKeys={this.state.selectedKeys}>
          {this.renderMenu()}
        </Menu>
      </Sider>
    );
  }
}
export default LeftMenu;
