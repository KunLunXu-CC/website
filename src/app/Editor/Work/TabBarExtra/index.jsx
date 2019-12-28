import React from 'react';
import { Icon } from 'qyrc';
import { useStore } from '../../store';
import { RELEASE_CONFIRM } from '../../Modal/consts';
import scss from './index.module.scss';

const useStateHook = store => {
  const onRelease = () => {
    store.global.modal.open({
      code: RELEASE_CONFIRM,
    });
  };

  return { onRelease };
};

export default () => {
  const store = useStore();
  const state = useStateHook(store);
  return (
    <div className={scss.extra}>
      <Icon
        type="icon-yulan"
        className={scss['icon-preview']}/>
      <Icon
        type="icon-genghuanfengmian"
        className={scss['icon-thumbnail']}/>
      <Icon
        type="icon-fabu"
        onClick={state.onRelease}
        className={scss['icon-release']}/>
      {/* 下架图标 */}
      {/* <Icon
        type="icon-xiajia"
        className={scss['icon-lower-shelf']}/> */}
    </div>
  );
};
