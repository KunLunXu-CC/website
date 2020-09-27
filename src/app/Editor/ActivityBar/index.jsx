import React from 'react';
import classNames from 'classnames';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { ACTIVITY_LIST } from '../consts';
import { useDispatch, useSelector } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  const { selectKey } = useSelector(state => ({
    selectKey: state.editor.activity.selectKey,
  }));

  // 点击菜单
  const onClick = selectKey => {
    dispatch({
      type: 'editor/setActivity',
      activity: { selectKey },
    });
  };

  // 菜单项 className
  const getItemClassName = React.useCallback(key => classNames(
    scss['activity-menu-item'],
    { [scss['activity-menu-item-action']]: key === selectKey }
  ), [selectKey]);

  return { onClick, getItemClassName };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.activity}>
      <div className={scss['activity-menu']}>
        {Object.values(ACTIVITY_LIST).map(V => (
          <div
            key={V.KEY}
            onClick={state.onClick.bind(null, V.KEY)}
            className={state.getItemClassName(V.KEY)}>
            <Icon key={V.KEY} type={V.ICON}/>
          </div>
        ))}
      </div>
      <div className={scss['activity-footer']}>
      </div>
    </div>
  );
};
