import React from 'react';
import classNames from 'classnames';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { MENU_LIST } from '../consts';
import { useSelector, useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  const { firstActiveKey } = useSelector(state => state.read.menu);

  // 切换菜单(一级菜单): 修改 menu.firstActiveKey
  const onChangeMenu = firstActiveKey => {
    dispatch({
      firstActiveKey,
      type: 'read/toggleFirstActiveKey',
    });
  };

  React.useEffect(() => {
    dispatch({ type: 'read/toggleFirstActiveKey' });
  }, []);

  return { firstActiveKey, onChangeMenu };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.header}>
      <div className={scss.menu}>
        {MENU_LIST.map(v => (
          <div
            key={v.VALUE}
            className={classNames(
              scss['menu-item'],
              { [scss.active]: v.VALUE === state.firstActiveKey }
            )}
            onClick={state.onChangeMenu.bind(null, v.VALUE)}>
            <Icon type={v.ICON} />
          </div>
        ))}
      </div>
    </div>
  );
};
