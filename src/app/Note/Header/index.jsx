import React from 'react';
import { Input } from 'antd';

import { useStore } from '../store';
import scss from './index.module.scss';

// 阻止冒泡
const stopPropagation = event => {
  event.stopPropagation();
  event.nativeEvent.stopPropagation();
};

const useStateHook = (props, store) => {
  const onSearch = value => {
    store.setSearch({ name: value });
  };
  return { onSearch };
};

export default props => {
  const store = useStore();
  const state = useStateHook(props, store);
  return (
    <div className={scss.header}>
      <Input.Search
        placeholder="搜索"
        onSearch={state.onSearch}
        onMouseDown={stopPropagation}
      />
    </div>
  );
};
