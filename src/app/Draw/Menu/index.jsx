import React from 'react';
import classNames from 'classnames';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { MENU_LIST } from '../consts';
import { useSelector, useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  const { activeKey } = useSelector(state => state.draw.menu);

  const onTOggleMenu = activeKey => {
    dispatch({
      type: 'draw/setMenu',
      menu: { activeKey },
    });
  };

  return { activeKey, onTOggleMenu };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.menu}>
      {MENU_LIST.map(v => (
        <div
          key={v.key}
          className={classNames(scss.item, {
            [scss.active]: state.activeKey === v.key,
          })}
          onClick={state.onTOggleMenu.bind(null, v.key)}>
          <Icon type={v.icon} />
        </div>
      ))}
    </div>
  );
};
