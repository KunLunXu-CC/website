import React, {
  useCallback,
} from 'react';
import classNames from 'classnames';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { SIDE_MENU } from '../consts';
import { useDispatch, useSelector } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  const { selectMenuKey } = useSelector(state => ({
    selectMenuKey: state.editor.side.selectMenuKey,
  }));

  // 点击菜单
  const onClick = selectMenuKey => {
    dispatch({
      type: 'editor/setSide',
      side: { selectMenuKey },
    });
  };

  // 菜单项 className
  const getItemClassName = useCallback(key => classNames(
    scss['side-menu-item'],
    { [scss['side-menu-item-action']]: key === selectMenuKey }
  ), [selectMenuKey]);

  return { onClick, getItemClassName };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.side}>
      <div className={scss['side-menu']}>
        {SIDE_MENU.map(v => (
          <div
            key={v.key}
            onClick={state.onClick.bind(null, v.key)}
            className={state.getItemClassName(v.key)}>
            <Icon key={v.key} type={v.icon}/>
          </div>
        ))}
      </div>
      <div className={scss['side-footer']}>
      </div>
    </div>
  );
};
