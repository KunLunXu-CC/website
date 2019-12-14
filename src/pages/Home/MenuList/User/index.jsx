import React, {
  useRef,
} from 'react';
import { Icon } from 'qyrc';
import { Dropdown } from 'antd';

import Overlay from './Overlay';
import scss from './index.module.scss';

const useStateHook = () => {
  const bodyRef = useRef(null);
  const triggerNode = () => bodyRef.current;
  return { bodyRef, triggerNode };
};

export default () => {
  const state = useStateHook();

  return (
    <div ref={state.bodyRef}>
      <Dropdown
        trigger={['click']}
        overlay={<Overlay/>}
        getPopupContainer={state.triggerNode}>
        <span className={scss.dropown}>
          <Icon type="icon-caidan"/>
        </span>
      </Dropdown>
    </div>
  );
};
