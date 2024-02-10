import { useCallback } from 'react';
import classNames from 'classnames';
import scss from './index.module.scss';

import { actions } from '@/store';
import { Icon } from '@kunlunxu/brick';
import { DIARY_MENU } from '../constants';
import { useDispatch, useSelector } from 'react-redux';

// 菜单列表
const MENU_LIST = [
  DIARY_MENU.CALENDAR,
  DIARY_MENU.PROJECT,
  DIARY_MENU.STATS,
];

export default () => {
  const dispatch = useDispatch();
  const { menu } = useSelector((state) => (state.diary));

  // 选中菜单
  const onSelect = useCallback((selectedKey) => {
    dispatch(actions.diary.updateMenu({ selectedKey }));
  }, [dispatch]);

  // 获取子菜单 className
  const getMenuItemClassName = useCallback((menuKey) => classNames(
    scss['menu-body-list-item'],
    { [scss['menu-body-list-item-action']]: menuKey === menu.selectedKey },
  ), [menu.selectedKey]);


  return (
    <div className={scss.menu}>
      <div className={scss['menu-bg-top']} />
      <div className={scss['menu-bg-bottom']} />
      <div className={scss['menu-body']}>
        <div className={scss['menu-body-list']}>
          {MENU_LIST.map(({ VALUE, ICON }) => (
            <div
              key={VALUE}
              onClick={onSelect.bind(null, VALUE)}
              className={getMenuItemClassName(VALUE)}>
              <Icon type={ICON} />
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
