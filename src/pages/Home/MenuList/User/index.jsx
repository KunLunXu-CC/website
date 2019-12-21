import React, {
  useRef,
  useState,
  useCallback,
} from 'react';
import { Icon } from 'qyrc';
import { Dropdown } from 'antd';

import Overlay from './Overlay';
import scss from './index.module.scss';

const useStateHook = () => {
  const [visible, setVisible] = useState(false);
  const bodyRef = useRef(null);

  // 菜单渲染父节点
  const getPopupContainer = useCallback(() => bodyRef.current, [bodyRef]);

  // 菜单显示状态改变
  const onVisibleChange = useCallback(visible => {
    setVisible(visible);
  }, []);

  return { bodyRef, getPopupContainer, visible, onVisibleChange };
};

export default () => {
  const state = useStateHook();

  return (
    <div ref={state.bodyRef}>
      <Dropdown
        trigger={['click']}
        visible={state.visible}
        onVisibleChange={state.onVisibleChange}
        getPopupContainer={state.getPopupContainer}
        overlay={<Overlay onVisibleChange={state.onVisibleChange}/>}>
        <span className={scss.dropown}>
          <Icon type="icon-caidan"/>
        </span>
      </Dropdown>
    </div>
  );
};
