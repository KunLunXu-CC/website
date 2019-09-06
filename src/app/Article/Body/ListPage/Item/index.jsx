import React, { useRef } from 'react';
import scss from './index.module.scss';

const useStateHook = (props) => {
  const iframeRef = useRef(null);
  return { iframeRef };
};

export default (props) => {
  const state = useStateHook(props);
  return (
    <div className={scss['item']}>
      <iframe frameBorder="0" ref={state.iframeRef} className={scss['iframe']}/>      
    </div>
  );
}
