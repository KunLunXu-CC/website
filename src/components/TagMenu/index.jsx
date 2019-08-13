
import _ from 'lodash';
import { Menu, Icon } from 'antd';
import React, { useState, useEffect } from 'react';

import { getTreeData } from '@utils';
import scss from './index.module.scss';

// 1. 标题
const Title = ({ data }) => (
  <span>
    <Icon type={data.icon} />
    <span>{data.title}</span>
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
    setTreeData(getTreeData(props.dataSource));
  }, [props.dataSource]);

  useEffect(() => {
    _.isFunction(props.onChange) && props.onChange(selectedKey);
  }, [selectedKey]);

  return { treeData, onClick };
};

export default (props) => {
  const state = useStateHook(props);
  return (
    <Menu
      theme="dark"
      mode="inline"
      onClick={state.onClick}
      defaultSelectedKeys={['all']}
      style={{ width: '100%', minHeight: '100%' }}
    >
      {renderMenu(state.treeData)}
    </Menu>
  );
};
