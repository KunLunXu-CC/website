import React from 'react';
import classNames from 'classnames';
import scss from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  const { listData, secondActiveKey } = useSelector(state => ({
    secondActiveKey: state.read.menu.secondActiveKey,
    listData: state.datasetsfrom[state.read.menu.firstActiveKey] ?? [],
  }));

  // 切换菜单(二级菜单): 修改 menu.secondActiveKey
  const onChangeMenu = secondActiveKey => {
    dispatch({
      type: 'read/setMenu',
      menu: { secondActiveKey },
    });
  };

  return { listData, secondActiveKey, onChangeMenu };
};


export default () => {
  const state = useStateHook();

  return (
    <div className={scss.menu}>
      {state.listData.map(v => (
        <div
          key={v.id}
          className={classNames(
            scss['menu-item'],
            { [scss.active]: v.value === state.secondActiveKey }
          )}
          onClick={state.onChangeMenu.bind(null, v.value)}>
          {v.name}
        </div>
      ))}
    </div>
  );
};
