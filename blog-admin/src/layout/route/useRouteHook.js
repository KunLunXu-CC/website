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
  const [settings, setSettings] = useState(inputSettings);
  const [routeList, setRouteList] = useState([]);
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    resetRouteList();
    resetMenuList();
  }, []);

  useEffect(() => {
    console.log('-----------------------------------');
    console.log('routeList: ', routeList);
    console.log('menuList: ', menuList);
  }, [routeList, menuList]);
  
  
  useEffect(() => {
    matchPathName();
  }, [routeList, pathname]);

  /**
   * 重置路由列表
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
   * 重置菜单列表
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
   * match路由 匹配的 pathname
   */
  const matchPathName = () => {
    // 无法匹配返回 null, 否则返回匹配后的信息（Object）
    const match = matchPath('/users/123', {
      path: '/users/5555',
      exact: true,
      strict: false
    })
    const matchNode = routeList.filter( v => {
      const match = matchPath('/tags', {
        path: v.path,
        exact: true,
        strict: false
      })
      return !!match;
    });

    console.log('-----::::::::::::::::::::::::::::::', matchNode);
    console.log(match);
    return match;
  }

}
