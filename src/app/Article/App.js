import { Spin } from 'antd';
import { useObserver } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';

import Body from './Body';
import Side from './Side';
import Menu from './Menu';

import { useStore } from './store';
import scss from './index.module.scss';

const useStateHook = (props, store) => {
  const messageRef = useRef(null);
  useEffect(() => {
    store.message.setContainer(messageRef.current);
  }, [store.message]);
  return { messageRef };
};

export default props => {
  const store = useStore();
  const state = useStateHook(props, store);

  return useObserver(() => (
    <div className={scss.layout}>
      <div className={scss['layout-menu']}><Menu/></div>
      <div className={scss['layout-body']}><Body/></div>
      <div className={scss['layout-side']}><Side/></div>
      <div ref={state.messageRef} />
      {store.spin.spinning
        ? <Spin className={scss['layout-spin']}/>
        : null
      }
    </div>
  ));
};
