import React from 'react';
import { Icon } from 'qyrc';
import { Input } from 'antd';
import { useObserver } from 'mobx-react-lite';

import { useStore } from '../../store';
import scss from './index.module.scss';

const useStateHook = (props, store) => {
  // 回退
  const onBack = () => {
    store.article.drop();
  };

  // 收缩 / 展开
  const onToggleCollapsed = () => {
    store.menu.toggleCollapsed();
  };

  // 搜索
  const onSearch = event => {
    store.article.search(event.target.value);
  };

  return { onBack, onToggleCollapsed, onSearch };
};

export default props => {
  const store = useStore();
  const state = useStateHook(props, store);

  return useObserver(() => (
    <div className={scss['search-bar']}>
      <div className={scss['search-bar-prefix']}>
        <Icon
          onClick={state.onToggleCollapsed}
          type={store.menu.collapsed ? 'icon-zhankai' : 'icon-shousuo1' }
        />
      </div>
      <div className={scss['search-bar-input']}>
        <Input
          size="large"
          placeholder="查询"
          onPressEnter={state.onSearch}
          prefix={<Icon type="icon-search" />}
        />
      </div>
      <div className={scss['search-bar-suffix']}>
        {store.article.article ?
          <Icon
            onClick={state.onBack}
            type="icon-huituishuikuansuoshuqi"
          /> : null
        }
      </div>
    </div>
  ));
};
