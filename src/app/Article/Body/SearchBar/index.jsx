import React from 'react';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { Input } from 'antd';
import { useStore } from '../../store';
import { useObserver } from 'mobx-react-lite';

const useStateHook = store => {
  // 回退
  const onBack = () => {
    store.article.drop();
  };

  // 搜索
  const onSearch = event => {
    store.article.search(event.target.value);
  };

  return { onBack, onSearch };
};

export default () => {
  const store = useStore();
  const state = useStateHook(store);

  return useObserver(() => (
    <div className={scss['search-bar']}>
      <div className={scss['search-bar-prefix']}>
        {store.article.article ?
          <Icon
            onClick={state.onBack}
            type="icon-huituishuikuansuoshuqi"
          /> : null
        }
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
      </div>
    </div>
  ));
};
