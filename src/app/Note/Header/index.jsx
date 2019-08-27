import React from 'react';
import { Input, Icon } from 'antd';
import { useObserver } from 'mobx-react-lite';

import { useStore } from '../store'
import scss from './index.module.scss';

const useStateHook = (props, store) => {
  const onSearch = (value) => {
    store.setSearch({ name: value });
  };
  return { onSearch };
};

export default (props) => {
  const store = useStore();
  const state = useStateHook(props, store);
  return (
    <div className={scss['header']}>
      <Input.Search
        placeholder="搜索"
        onSearch={state.onSearch}
        onMouseDown={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopPropagation();
        }}
      />
    </div>
  );
};
