import React from 'react';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();

  const article = useSelector(state => _.get(state, 'article.article'));

  // 回退
  const onBack = () => {
    // store.article.drop();
  };

  // 搜索
  const onSearch = event => {
    // store.article.search(event.target.value);
  };

  return { article, onBack, onSearch };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss['search-bar']}>
      <div className={scss['search-bar-prefix']}>
        {state.article ?
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
  );
};
