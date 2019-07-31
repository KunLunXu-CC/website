import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useStore } from '@store/index';
import dockList from '@config/dock';
import { FontIcon } from '@components';
import scss from '../index.module.scss';

const FT = 20;
const useStateHook = (props, store) => {
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

  // 点击事件
  const onClick = (dock) => {
    store.app.open(dock.defaultUrl);
  }

  return { dockClassName, onMouseLeave, dockRef, onClick };
}

const Dock = (props) => {
  const store = useStore();
  const state = useStateHook(props, store);

  return (
    <div ref={state.dockRef} className={state.dockClassName} >
      <div className={scss['dock-wrapper']}>
        {
          dockList.map(v => (
            <div className={scss['dock-app']} key={v.code}>
              <div
                className={scss['dock-app-content']}
                onClick={state.onClick.bind(null, v)}>
                <FontIcon icon={v.icon} size="50px"/>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Dock;
