import React from 'react';
import classNames from 'classnames';
import scss from './index.module.scss';

import { DEFAULT_MENU } from '../../consts';
import { useSelector, useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();

  const { list, selectedKey } = useSelector((state) => ({
    ...state.reader.menu,
    list: [], // TODO： 删除了文件类型
  }));

  // 切换
  const onToggle = React.useCallback((selectedKey) => {
    dispatch({
      menu: { selectedKey },
      type: 'reader/setMenu',
    });
  }, []);

  return { list, selectedKey, onToggle };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.menu}>
      {[DEFAULT_MENU, ...state.list].map((v) => (
        <div
          key={v.value}
          className={classNames(
            scss.item,
            { [scss.selected]: v.value === state.selectedKey },
          )}
          onClick={state.onToggle.bind(null, v.value)}>
          {v.name}
        </div>
      ))}
    </div>
  );
};
