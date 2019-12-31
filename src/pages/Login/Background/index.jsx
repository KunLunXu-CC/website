import React, {
  useMemo,
} from 'react';
import Error from './Error';
import Loading from './Loading';
import scss from './index.module.scss';

import { Image } from 'qyrc';
import { useStore } from '@store';
import { useObserver } from 'mobx-react-lite';

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
