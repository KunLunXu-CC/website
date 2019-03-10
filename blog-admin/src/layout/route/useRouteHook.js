import React, { useState, useEffect, useMemo } from 'react';
import { Menu, Icon } from 'antd';
import { matchPath, Switch, Route, Redirect } from 'react-router-dom';

/**
 * 从配置项中筛选 route 所需的
 * @param {Object} setting    当前配置项
 * @param {Array} node        节点列表其实就是 path 列表, 
 */
const getRoutesWithSetting = (setting, node) => {
  const list = [];
  list.push({
    node: [...node],
    type: 'page',
    path: setting.path,
    page: setting.page,
    exact: setting.exact || false,
  });
  if (setting.subpage && setting.subpage.length > 0){
    setting.subpage.forEach(v => {
      list.push({
        type: 'subpage',
        path: v.path,
        page: v.page,
        exact: v.exact || false,
        node: [ ...node, v.path ]
      });
    })
  }
  return list;
}

export default (inputSettings) => {
  const [authorities, setAuthorities] = useState([]);
  const [pathname, setPathname] = useState('/');
  const [keys, setKeys] = useState({ openKeys: [], selectedKeys: [] });
  const [settings, setSettings] = useState(inputSettings);
  const [routeList, setRouteList] = useState([]);
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    resetRouteList();
    resetMenuList();
  }, [settings]);

  useEffect(() => {
    matchPathName(pathname);
  }, [routeList, pathname]);

  /**
   * 重置路由列表： 根据配置获取扁平化后的路由配置并过滤多余的配置
   */
  const resetRouteList = () => {
    let node = [], list = [];
    const recursion = (settings) => {
      settings.forEach(v => {
        if (v.children && v.children.length > 0){
          node.push(v.path);
          recursion(v.children);
        } else {
          node.push(v.path);
          list = [...list, ...getRoutesWithSetting(v, node)];
          node = [];
        }
      });
    };
    recursion(settings);
    setRouteList([...list]);
  }

  /**
   * 重置菜单列表: 根据配置项目格式化出渲染菜单栏所需要的数据结构
   */
  const resetMenuList = () => {
    let list = [];
    const recursion = (settings) => {
      return settings.map(v => {
        let children = [];
        if (v.children && v.children.length > 0){
          children = recursion(v.children);
        }
        return {
          children,
          link: v.link,
          name: v.name,
          path: v.path,
          icon: v.icon,
        };
      });
    };
    list = recursion(settings);
    setMenuList(list);
  }

  /**
   * 匹配的 pathname， 返回默认菜单栏 默认打开以及选中的key defaultOpenKeys, defaultSelectedKeys
   */
  const matchPathName = (pathname) => {
    const matchNode = routeList.filter( v => {
      // 无法匹配返回 null, 否则返回匹配后的信息（Object）
      const match = matchPath(pathname, {
        path: v.path,
        exact: true,
        strict: false
      })
      return !!match;
    })[0];
    if (!matchNode) { return false; }
    const offset = matchNode.type === 'subpage' ? 2 : 1;
    const node = matchNode.node;
    const openKeyIndex = node.length - offset - 1;
    const selectedKeyIndex = node.length - offset;
    const openKeys = node[openKeyIndex] ? [node[openKeyIndex]] : [];
    const selectedKeys = node[selectedKeyIndex] ? [node[selectedKeyIndex]] : [];
    setKeys({ openKeys, selectedKeys });
  }

  /**
   * 监听 menuList 获取 antd Menu 的子菜单
   */
  const menuChildren = useMemo(() => {
    const recursion = (list) => {
      return list.map( v => {
        const title = (
          <span>
            {v.icon ? <Icon type={v.icon} /> : null}
            <span>{v.name}</span>
          </span>
        );
        return (
          v.children && v.children.length > 0 ?
          <Menu.SubMenu key={v.path} title={title}>
            { recursion(v.children) }
          </Menu.SubMenu> :
          <Menu.Item key={v.path} link={v.link}>
            {title}
          </Menu.Item>
        );
      });
    }
    return recursion(menuList);
  }, [menuList]);

  /**
   * 监听 routeList 并渲染出 route
   */
  const routeChildren = useMemo(() => {
    return (
      <Switch>
        {routeList.map( v => ( 
          <Route exact={v.exact} key={v.path} component={v.page} path={v.path}/>
        ))}
      </Switch>
    );
  }, [routeList]);

  return {
    keys,
    setKeys,
    setPathname,
    routeChildren,
    menuChildren,
    setSettings,
    setAuthorities,
  };
}
