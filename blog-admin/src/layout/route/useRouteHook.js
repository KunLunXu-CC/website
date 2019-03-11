/**
 * 路由 hook 实现功能：
 *  - 通过约定好的路由配置过滤出左侧菜单栏配置， 并返回 antd Menu 组件的 children
 *  - 通过约定好的路由配置获取扁平化路由配置， 并返回 Router 组件的 children
 *  - 通过 keys = { openKeys， selectedKeys } setKeys 来存储、设置当前菜单栏已打开、和已选中的 key
 *  - 支持通过 setPathname 设置当前路由， 并和路由列表进行匹配找出 openKeys， selectedKeys
 *  - 通过 authorities 来存储当前用户的权限列表（未实现）
 *  - 将菜单栏的 path 重定向到所有子菜单的第一个（未实现）
 */
import { Menu, Icon } from 'antd';
import { matchPath, Switch, Route, Redirect } from 'react-router-dom';
import React, { useState, useEffect, useMemo, useCallback } from 'react';

/**
 * 过滤路由配置： 将没有用的配置项过滤掉， 并标记 route 类型（页面、子页面）
 * @param {Object} setting    当前配置项
 * @param {Array} node        当前配置所在层级的所有 path, 用于后期获取  openKeys， selectedKeys
 */
const filterRouteSetting = (setting, node) => {
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
  const [keys, setKeys] = useState({ openKeys: [], selectedKeys: [] });
  const [settings, setSettings] = useState(inputSettings);
  const [authorities, setAuthorities] = useState([]);
  const [routeList, setRouteList] = useState([]);
  const [menuList, setMenuList] = useState([]);
  const [pathname, setPathname] = useState('/');

  useEffect(() => {
    resetRouteList();
    resetMenuList();
  }, [settings]);

  useEffect(() => {
    resetKeys();
  }, [routeList, pathname]);

  // 匹配的路由： 设置 keys: {openKeys， selectedKeys}
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
    return (matchNode || false);
  }

  // 重置路由列表： 根据配置获取扁平化后的路由配置并过滤多余的配置
  const resetRouteList = () => {
    let node = [], list = [];
    const recursion = (settings) => {
      settings.forEach(v => {
        if (v.children && v.children.length > 0){
          node.push(v.path);
          recursion(v.children);
        } else {
          node.push(v.path);
          list = [...list, ...filterRouteSetting(v, node)];
          node = [];
        }
      });
    };
    recursion(settings);
    setRouteList([...list]);
  }

  // 重置菜单列表: 根据配置项目格式化出渲染菜单栏所需要的数据结构
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

  // 重置 keys: 根据当前路由和路由列表配置匹配结果来设置
  const resetKeys = () => {
    const matchNode = matchPathName();
    if (!matchNode) { return false; }
    const offset = matchNode.type === 'subpage' ? 2 : 1;
    const node = matchNode.node;
    const openKeyIndex = node.length - offset - 1;
    const selectedKeyIndex = node.length - offset;
    const openKeys = node[openKeyIndex] ? [node[openKeyIndex]] : [];
    const selectedKeys = node[selectedKeyIndex] ? [node[selectedKeyIndex]] : [];
    setKeys({ openKeys, selectedKeys });
  }

  // 监听 menuList 获取 antd Menu children
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
  
  // 路由组件： 路由列表存在但是路由匹配不到则 重定向到 404
  const NotFount = useCallback(() => {
    const matchNode = matchPathName();
    if ( matchNode || routeList.length === 0 ) { return null; }
    return <Redirect to="/404" />;
  }, [routeList]);

  // 监听 routeList 并渲染出 Router children
  const routeChildren = useMemo(() => {
    return (
      <Switch>
        {routeList.map( v => ( 
          <Route exact={v.exact} key={v.path} component={v.page} path={v.path}/>
        ))}
        <Route component={() => (<NotFount />)} />
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
