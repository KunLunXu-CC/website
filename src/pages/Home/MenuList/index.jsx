import React, {
  useMemo,
} from 'react';
import classNames from 'classnames';

import { Icon } from 'qyrc';
import { useStore } from '@store';
import { useObserver } from 'mobx-react-lite';

import Date from './Date';
import User from './User';
import scss from './index.module.scss';

const useStateHook = (props, store) => {
  const menuClassName = useMemo(() => {
    const hasMaxApp = store.app.list.find(v => v.isMax);
    return classNames(
      scss.menu,
      { [scss['menu-auto-hiding']]: hasMaxApp },
    );
  }, [store.app.list]);

  return { menuClassName };
};

export default props => {
  const store = useStore();
  return useObserver(() => {
    const state = useStateHook(props, store);
    return (
      <div className={state.menuClassName}>
        <div className={scss.body}>
          <Date/>
          <Icon type="icon-wifi"/>
          <Icon type="icon-dianliang"/>
          <User/>
        </div>
      </div>
    );
  });
};
