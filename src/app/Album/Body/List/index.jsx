import React from 'react';
import Item from './Item';
import scss from './index.module.scss';

import { Empty } from 'antd';
import { Scroll } from 'qyrc';
import { useStore } from '../../store';
import { useObserver } from 'mobx-react-lite';

const useStateHook = store => {
  // 删除
  const onDelete = data => {
    store.photos.removePhotos({ id: data.id });
  };

  return { onDelete };
};

export default () => {
  const store = useStore();
  const state = useStateHook(store);

  return useObserver(() => (
    <Scroll>
      <div className={scss.list}>
        {store.photos.list.length > 0 ?
          store.photos.list.map(v => (
            <Item
              data={v}
              key={v.id}
              onDelete={state.onDelete}
            />
          )) :
          <Empty />
        }
      </div>
    </Scroll>
  ));
};
