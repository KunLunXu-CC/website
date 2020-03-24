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
        {Object.values(SIDE_MENU).map(V => (
          <div
            key={V.KEY}
            onClick={state.onClick.bind(null, V.KEY)}
            className={state.getItemClassName(V.KEY)}>
            <Icon key={V.KEY} type={V.ICON}/>
          </div>
        ))}
      </div>
      <div className={scss['side-footer']}>
      </div>
    </div>
  );
};
