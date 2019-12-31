import React, {
  useMemo,
} from 'react';
import scss from './index.module.scss';

import { Image } from 'qyrc';
import { useStore } from '@store';
import { useObserver } from 'mobx-react-lite';

const useStateHook = (props, store) => {
  // 随机头像
  const avatar = useMemo(() => {
    const index = Math.floor(Math.random() * store.avatar.list.length);
    return store.avatar.list.length > 0
      ? _.get(store.avatar.list, `[${index}].url`, '')
      : '';
  }, [store.avatar.list]);

  return { avatar };
};

export default props => {
  const store = useStore();
  const state = useStateHook(props, store);

  return useObserver(() => (
    <div className={scss.userInfo}>
      <div className={scss.avatar}>
        <Image src={state.avatar}/>
      </div>
      <div className={scss.name}>
        {_.get(store, 'user.user.name') || '---'}
      </div>
      <div className={scss.motto}>
        { _.get(store, 'user.user.motto') || '这个人很懒什么都没写'}
      </div>
    </div>
  ));
};
