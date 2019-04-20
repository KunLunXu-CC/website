import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import scss from '../index.module.scss';

const FT = 20;
const useStateHook = () => {
  const [show, setShow] = useState(false);
  const dockRef = useRef();

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    }
  });

  // document mousemove 事件
  const onMouseMove = useCallback((e) => {
    const { clientHeight } = document.documentElement;
    const { top } = dockRef.current.getBoundingClientRect();
    const reset = [
      e.clientY > top,
      clientHeight - e.clientY < FT,
    ].includes(true);
    reset !== show && setShow(reset);
  }, [show, dockRef]);

  // document mouseLeave 事件
  const onMouseLeave = useCallback(() => {
    setShow(false);
  }, []);

  // 计算 dock className
  const dockClassName = useMemo( () => (
    scss[`dock-${show ? 'show' : 'hidden'}`]
  ), [show]);

  return { dockClassName, onMouseLeave, dockRef };
}

export default () => {
  const state = useStateHook();

  return (
    <div ref={state.dockRef} className={state.dockClassName} >
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
