import classNames from 'classnames';
import scss from './index.module.scss';

import { actions } from '@store';
import { MENUS } from '../consts';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  const { selectedMenuKey } = useSelector((state) => state.setting);

  // 点击菜单项
  const onClickMenuItem = useCallback((selectedMenuKey) => {
    dispatch(actions.setting.toggleMenu(selectedMenuKey));
  }, [dispatch]);

  return { selectedMenuKey, onClickMenuItem };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.menu}>
      {MENUS.map((v) => (
        <div
          key={v.key}
          onClick={state.onClickMenuItem.bind(null, v.key)}
          className={classNames(
            scss.item,
            { [scss.selected]: state.selectedMenuKey === v.key },
          )}>
          {v.title}
        </div>
      ))}
    </div>
  );
};
