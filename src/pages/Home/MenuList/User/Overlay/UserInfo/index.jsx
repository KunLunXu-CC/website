import _ from 'lodash';
import React from 'react';
import { Image } from 'qyrc';
import { useObserver } from 'mobx-react-lite';

import { useStore } from '@store';
import scss from './index.module.scss';
import icon from '@assets/img/login_head.jpg';

export default () => {
  const store = useStore();

  return useObserver(() => (
    <div className={scss.userInfo}>
      <div className={scss.icon}>
        <Image src={icon}/>
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
