import React, {
  useEffect,
} from 'react';
import Item from './Item';
import scss from './index.module.scss';

import { Empty } from 'antd';
import { Scroll } from 'qyrc';
import { useDispatch, useSelector } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  const photos = useSelector(state => _.get(state, 'album.photos'));

  // 删除
  const onDelete = data => {
    dispatch({ type: 'album/removePhotos', id: data.id });
  };

  useEffect(() => {
    dispatch({ type: 'album/getPhotos', search: void 0 });
  }, []);

  return { onDelete, photos };
};

export default () => {
  const state = useStateHook();

  return (
    <Scroll>
      <div className={scss.list}>
        {state.photos.length > 0 ?
          state.photos.map(v => (
            <Item
              data={v}
              key={v.id}
              onDelete={state.onDelete}
            />
          )) :
          <Empty className={scss.empty}/>
        }
      </div>
    </Scroll>
  );
};
