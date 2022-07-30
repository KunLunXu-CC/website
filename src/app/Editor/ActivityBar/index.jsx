import classNames from 'classnames';
import scss from './index.module.scss';

import { useCallback } from 'react';
import { Icon } from '@kunlunxu/brick';
import { ACTIVITY_LIST } from '../consts';
import { useDispatch, useSelector } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  const { selectKey } = useSelector((state) => ({
    selectKey: state.editor.activity.selectKey,
  }));

  // 点击菜单
  const onClick = (selectKey) => dispatch({
    type: 'editor/setActivity',
    activity: { selectKey },
  });

  // 菜单项 className
  const getItemClassName = useCallback((key) => classNames(
    scss['activity-item'],
    { [scss['activity-item-action']]: key === selectKey },
  ), [selectKey]);

  return { onClick, getItemClassName };
};

export default () => {
  const state = useStateHook();
  return (
    <div className={scss.activity}>
      {ACTIVITY_LIST.map((v) => (
        <div
          key={v.key}
          onClick={state.onClick.bind(null, v.key)}
          className={state.getItemClassName(v.key)}>
          <Icon type={v.icon} />
        </div>
      ))}
    </div>
  );
};
