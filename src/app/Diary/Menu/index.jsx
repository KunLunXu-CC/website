import React, {
  useCallback,
} from 'react';
import classNames from 'classnames';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { DIARY_MENU } from '@config/consts';
import { useDispatch, useSelector } from 'react-redux';

// 菜单列表
const MENU_LIST = [
  DIARY_MENU.CALENDAR,
  DIARY_MENU.STATS,
  DIARY_MENU.EXPORT,
];

const useStateHook = () => {
  const dispatch = useDispatch();
  const { menu } = useSelector(state => (state.diary));

  // 选中菜单
  const onSelect = selectedKey => {
    dispatch({
      type: 'diary/setMenu',
      menu: { selectedKey },
    });
  };

  // 获取子菜单 className
  const getMenuItemClassName = useCallback(menuKey => classNames(
    scss['menu-body-list-item'],
    { [scss['menu-body-list-item-action']]: menuKey === menu.selectedKey }
  ), [menu.selectedKey]);

  return { onSelect, getMenuItemClassName };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.menu}>
      <div className={scss['menu-bg-top']}/>
      <div className={scss['menu-bg-bottom']}/>
      <div className={scss['menu-body']}>
        <div className={scss['menu-body-list']}>
          {MENU_LIST.map(({ VALUE, ICON }) => (
            <div
              key={VALUE}
              onClick={state.onSelect.bind(null, VALUE)}
              className={state.getMenuItemClassName(VALUE)}>
              <Icon type={ICON}/>
            </div>
          ))}
        </div>
        <div className={scss['menu-body-footer']}>
          <div className={scss['menu-body-footer-body']}>
            <Icon
              type="icon-setting-copy"
              className={scss['menu-body-footer-icon']}
            />
            更多
          </div>
        </div>
      </div>
    </div>
  );
};
