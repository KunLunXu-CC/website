import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import scss from '../index.module.scss';

const FT = 20;
const useStateHook = () => {
  const [show, setShow] = useState(false);
  const staticState = useMemo(v => ({
    mouseEnter: false
  }), []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    }
  }, [onMouseMove]);

  const onMouseMove = useCallback((e) => {
    const { clientHeight } = document.documentElement;
    const conds = [
      staticState.mouseEnter,
      clientHeight - e.clientY < FT
    ];
    const reset = conds.includes(true);
    reset !== show && setShow(reset);
  }, [show]);
  
  const onMouseEnter = useCallback(() => {
    staticState.mouseEnter = true;
  }, []);

  const onMouseLeave = useCallback(() => {
    staticState.mouseEnter = false;
    setShow(false);
  }, []);

  const dockClassName = useMemo( () => (
    scss[`dock-${show ? 'show' : 'hidden'}`]
  ), [show]);

  return { dockClassName, onMouseEnter, onMouseLeave };
}

export default () => {
  const state = useStateHook();

  return (
    <div 
      onMouseEnter={state.onMouseEnter}
      onMouseLeave={state.onMouseLeave}
      className={state.dockClassName}
    >
      <div className={scss['dock-wrapper']}>
        <div className={scss['dock-app']}>
          <div className={scss['dock-app-content']}></div>
        </div>
        <div className={scss['dock-app']}>
          <div className={scss['dock-app-content']}></div>
        </div>
        <div className={scss['dock-app']}>
          <div className={scss['dock-app-content']}></div>
        </div>
        <div className={scss['dock-app']}>
          <div className={scss['dock-app-content']}></div>
        </div>
      </div>

    </div>
  );
}
