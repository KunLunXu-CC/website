import React from 'react';
import classNames from 'classnames';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { MENU_LIST } from '../consts';
import { useSelector, useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  const { selectedKey } = useSelector(state => state.datasetsfrom.menu);

  // 切换菜单
  const onToggleMenu = ({ key: selectedKey }) => {
    dispatch({
      menu: { selectedKey },
      type: 'datasetsfrom/setMenu',
    });
  };

  return { selectedKey, onToggleMenu };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.menu}>
      {MENU_LIST.map(v => (
        <div
          key={v.key}
          onClick={state.onToggleMenu.bind(null, v)}
          className={classNames(scss['menu-item'], {
            [scss['menu-item-action']]: v.key === state.selectedKey,
          })}>
          <Icon type={v.icon}/>
          {v.label}
        </div>
      ))}
    </div>
  );
};
