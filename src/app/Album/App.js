import React, { useEffect, useRef } from 'react';
import { useStore } from './store';
import scss from './index.module.scss';
import Body from './Body';
import Side from './Side';

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
  return (
    <div className={scss.layout}>
      <div className={scss['layout-side']}><Side/></div>
      <div className={scss['layout-body']}><Body/></div>
      <div ref={state.messageRef} />
    </div>
  );
};
