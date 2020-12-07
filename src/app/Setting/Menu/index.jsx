import React from 'react';
import classNames from 'classnames';
import scss from './index.module.scss';

import { MENUS } from '../consts';
import { useDispatch, useSelector } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  const { selectedMenuKey } = useSelector(state => state.settingManage);

  // 点击菜单项
  const onClickMenuItem = React.useCallback(selectedMenuKey => {
    dispatch({
      type: 'settingManage/toggleSelectedMenuKey',
      selectedMenuKey,
    });
  }, []);

  return { selectedMenuKey, onClickMenuItem };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.menu}>
      {MENUS.map(v => (
        <div
          key={v.key}
          onClick={state.onClickMenuItem.bind(null, v.key)}
          className={classNames(
            scss.item,
            { [scss.selected]: state.selectedMenuKey === v.key }
          )}>
          {v.title}
        </div>
      ))}
    </div>
  );
};
