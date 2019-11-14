import React from 'react';
import { Scroll } from 'qyrc';
import scss from './index.module.scss';
import { useObserver } from 'mobx-react-lite';
import { useStore } from '../../store';
import Item from './Item';

const useStateHook = () => {
  // 删除
  const onDelete = data => {
    console.log('============>>> 文件删除:', data);
  };

  return { onDelete };
};

export default () => {
  const store = useStore();
  const state = useStateHook();

  return useObserver(() => (
    <Scroll>
      <div className={scss.list}>
        {store.photos.list.map(v => (
          <Item
            data={v}
            key={v.id}
            onDelete={state.onDelete}
          />
        ))}
      </div>
    </Scroll>
  ));
};
