import React, { useState, useEffect } from 'react';
import { matchPath } from 'react-router-dom';

/**
 * 从配置项中获取 routes
 * @param {Object} setting 当前配置项
 * @param {Array} node  节点列表其实就是 path 列表, 
 */
const getRoutesWithSetting = (setting, node) => {
  const list = [];
  list.push({
    node: [...node],
    path: setting.path,
    page: setting.page,
    exact: setting.exact || false,
  });
  if (setting.subpage && setting.subpage.length > 0){
    setting.subpage.forEach(v => {
      list.push({
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
  const [defaultKeys, setDefaultKeys] = useState({ defaultOpenKeys: [], defaultSelectedKeys: [] });
  const [settings, setSettings] = useState(inputSettings);
  const [routeList, setRouteList] = useState([]);
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    resetRouteList();
    resetMenuList();
  }, [settings]);

  useEffect(() => {
    console.log('-----------------------------------');
    console.log('routeList: ', routeList);
    console.log('menuList: ', menuList);
    console.log('defaultKeys', defaultKeys);
  }, [routeList, menuList, defaultKeys]);
  
  
  useEffect(() => {
    matchPathName();
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
  const matchPathName = () => {
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
    const defaultOpenKeys = matchNode.node[1] ?  [matchNode.node[0]] : [];
    const defaultSelectedKeys = [ matchNode.node[1] || matchNode.node[0] ];
    setDefaultKeys({ 
      defaultOpenKeys, 
      defaultSelectedKeys,
    });
    return matchNode;
  }

  return {
    defaultKeys,
    routeList,
    menuList,
    setPathname,
    setSettings,
    setAuthorities,
  };
}
