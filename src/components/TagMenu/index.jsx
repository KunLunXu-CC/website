
import _ from 'lodash';
import { Menu } from 'antd';
import { Icon } from 'qyrc';
import React, { useState, useEffect } from 'react';

import scss from './index.module.scss';

// 扁平数据转树形形结构数据
const getTreeData = (data = []) => {
  const recursion = (parents, childrens) => {
    parents.forEach(p => {
      p.children = childrens.filter(c => c.parent.id === p.id);
      recursion(p.children, childrens);
    });
  };

  let childrens = [];
  let parents = [];
  data.forEach(v => {
    v.parent.id ? (childrens.push(v)) : (parents.push(v));
  });
  recursion(parents, childrens);
  return parents;
};

// 1. 标题
const Title = ({ data }) => (
  <span>
    <Icon type={data.icon} /> 
    &nbsp;&nbsp;
    <span>{data.name}</span>
  </span>
);

// 2. 渲染菜单方法
const renderMenu = (treeData) => treeData.map(v => (
  _.isArray(v.children) && v.children.length > 0 ?
  <Menu.SubMenu key={v.id} title={<Title data={v}/>}>
    {renderMenu(v.children)}
  </Menu.SubMenu> :
  <Menu.Item key={v.id}>{<Title data={v}/>}</Menu.Item>
));

const useStateHook = (props) => {
  const [treeData, setTreeData] = useState([]);
  const [selectedKey, setSelectedKey] = useState('all');

  // 点击菜单儿项
  const onClick = ({ key }) => setSelectedKey(key);

  useEffect(() => {
    const base = [{ id: 'all', name: '全部', icon: 'icon-all' }];
    setTreeData([...base, ...getTreeData(props.dataSource)]);
  }, [props.dataSource]);

  useEffect(() => {
    _.isFunction(props.onChange) && props.onChange(selectedKey);
  }, [selectedKey]);

  return { treeData, onClick };
};

export default (props) => {
  const state = useStateHook(props);
  return (
    <div className={scss['tag-menu']}>
      <Menu
        theme="dark"
        mode="inline"
        onClick={state.onClick}
        defaultSelectedKeys={['all']}
        style={{ width: '100%', minHeight: '100%' }}
      >
        {renderMenu(state.treeData)}
      </Menu>
    </div>
  );
};
