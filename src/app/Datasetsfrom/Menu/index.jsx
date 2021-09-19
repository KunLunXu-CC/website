import React from 'react';
import classNames from 'classnames';
import scss from './index.module.scss';

import { Icon } from 'qyrc';
import { useSelector, useDispatch } from 'react-redux';
import { MENU_LIST, MODAL_CODE_DATASETSFROM_EDITOR } from '../consts';

const useStateHook = () => {
  const dispatch = useDispatch();
  const { selectedKey } = useSelector(
    (state) => state.datasetsfromManage.menu,
  );

  // 切换菜单
  const onToggleMenu = ({ key: selectedKey }) => {
    dispatch({
      menu: { selectedKey },
      type: 'datasetsfromManage/setMenu',
    });
  };

  // 添加
  const onAdd = () => {
    dispatch({
      title: '新增字典',
      type: 'modal/openModal',
      code: MODAL_CODE_DATASETSFROM_EDITOR,
    });
  };

  return { selectedKey, onToggleMenu, onAdd };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.menu}>
      <div className={scss['menu-body']}>
        {MENU_LIST.map((v) => (
          <div
            key={v.key}
            onClick={state.onToggleMenu.bind(null, v)}
            className={classNames(scss['menu-item'], {
              [scss['menu-item-action']]: v.key === state.selectedKey,
            })}>
            <Icon type={v.icon} />
            {v.label}
          </div>
        ))}
      </div>
      <div
        className={scss['menu-add']}
        onClick={state.onAdd}>
        <Icon type="icon-xinzeng" />
      </div>
    </div>
  );
};
