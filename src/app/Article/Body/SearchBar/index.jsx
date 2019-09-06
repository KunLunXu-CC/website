import React from 'react';
import { Icon } from 'qyrc';
import { Input } from 'antd';
import { useObserver } from 'mobx-react-lite';

import { useStore } from '../../store';
import scss from './index.module.scss';

const useStateHook = () => {

}

export default () => {
  const store = useStore();

  return useObserver(() => (
    <div className={scss['search-bar']}>
      <div className={scss['search-bar-prefix']}>
        <Icon 
          type={store.collapsed ? "icon-zhankai" :"icon-shousuo1" } 
          onClick={store.toggleCollapsed}
        />
        {/* <Icon type="icon-fanhui"/> */}
      </div>
      <div className={scss['search-bar-input']}>
        <Input
          size="large"
          placeholder="查询"
          onPressEnter={() => {}}
          prefix={<Icon type="icon-search" style={{ color: 'rgba(0,0,0,.25)' }} />}
        />
      </div>
      <div className={scss['search-bar-suffix']}>
      </div>
    </div>
  ));
}
