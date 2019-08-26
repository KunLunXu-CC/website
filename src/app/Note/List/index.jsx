import _ from 'lodash';
import { Scroll } from 'qyrc';
import { Menu, Icon } from 'antd';
import { useObserver } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react';

import scss from './index.module.scss';
import { useStore } from '../store'

const useStateHook = (props, store) => {
  const onChange = (selectedKey) => {
    console.log('--->>> 当前 selectedKey', selectedKey);
  };

  useEffect(() => {
    store.getTagList();
  }, []);

  return { onChange };
};

export default (props) => {
  const store = useStore();
  const state = useStateHook(props, store);
  return useObserver(() =>(
    <Scroll className={scss['list']}>
      
    </Scroll>
  ));
};
