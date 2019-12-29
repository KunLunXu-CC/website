import React, {
  useRef,
  useEffect,
} from 'react';
import { useStore } from '../store';

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
  return (<div ref={state.messageRef} />);
};
