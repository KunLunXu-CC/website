import React, {
  useMemo,
} from 'react';
import _ from 'lodash';
import { Image } from 'qyrc';

import Error from './Error';
import Loading from './Loading';

import { useObserver } from 'mobx-react-lite';
import { useStore } from '@store';
import scss from './index.module.scss';

const useStateHook = store => {
  const bg = useMemo(() => {
    const index = Math.floor(Math.random() * store.desktop.bgList.length);
    return store.desktop.bgList.length > 0
      ? _.get(store.desktop.bgList, `[${index}].url`, '')
      : '';
  }, [store.desktop.bgList]);
  return { bg };
};

export default props => {
  const store = useStore();
  return useObserver(() => {
    const state = useStateHook(store);
    return (
      <Image
        src={state.bg}
        error={<Error/>}
        loading={<Loading/>}
        className={scss.background}>
        {props.children}
      </Image>
    );
  });
};
