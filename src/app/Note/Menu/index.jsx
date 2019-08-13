import _ from 'lodash';
import { Menu, Icon } from 'antd';
import { TagMenu } from '@components';
import React, { useState, useEffect } from 'react';

import scss from './index.module.scss';

const dataModel = [
  {
    id: 'all',
    icon: 'mail',
    title: '全部',
  },
  {
    id: '12345sdsdadas',
    icon: 'mail',
    title: '工具',
  },
  {
    id: '12345ssasdadas',
    parent: '12345sdsdadas',
    icon: 'mail',
    title: 'Git',
  },
  {
    id: '12345skjsdadas',
    parent: '12345sdsdadas',
    icon: 'mail',
    title: 'Docker',
  },
  {
    id: '12oo45sdsdadas',
    parent: '12345sdsdadas',
    icon: 'mail',
    title: 'Webpack',
  },
  {
    id: '122354654687234',
    icon: 'mail',
    title: '前端',
  },
  {
    id: '2345653asdsa241',
    parent: '2345653241',
    icon: 'mail',
    title: '继承',
  },
  {
    id: '234565asd3241',
    parent: '2345653241',
    icon: 'mail',
    title: '正则',
  },
  {
    id: '2345653241',
    icon: 'mail',
    parent: '122354654687234',
    title: 'JS',
  },
  {
    id: '54651367er232fs23432',
    parent: '122354654687234',
    icon: 'mail',
    title: 'CSS',
  },
  {
    id: '34dsfsf',
    parent: '122354654687234',
    icon: 'mail',
    title: 'Vue',
  },
  {
    id: 'al234234fsdfl',
    parent: '122354654687234',
    icon: 'mail',
    title: 'React',
  },
];

const useStateHook = () => {
  const [dataSource, setDataSource] = useState([]);

  const onChange = (selectedKey) => {
    console.log('--->>> 当前 selectedKey', selectedKey);
  };

  useEffect(() => {
    setDataSource(dataModel);
  }, []);

  return { dataSource, onChange };
};

export default (props) => {
  const state = useStateHook(props);
  return (
    <div className={scss['menu-wrapper']}>
      <TagMenu 
        onChange={state.onChange}
        dataSource={state.dataSource}
      />
    </div>
  );
};
