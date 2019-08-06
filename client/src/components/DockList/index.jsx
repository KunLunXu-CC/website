import _ from 'lodash';
import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { Icon } from 'qyrc';
import classNames from 'classnames';
import scss from './index.module.scss';

const FT = 20;
const useStateHook = (props) => {
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
    _.isFunction(props.onClick) && props.onClick(dock);
  }

  return { dockClassName, onMouseLeave, dockRef, onClick };
}

const Dock = (props) => {
  const state = useStateHook(props);

  return (
    <div ref={state.dockRef} className={classNames(state.dockClassName, scss['dock'])} >
      <div className={scss['dock-body']}>
        {
          props.dataSource.map(v => (
            <div key={v.code} className={scss['dock-app']} onClick={state.onClick.bind(null, v)}>
              <Icon type={v.icon} style={{ fontSize: '50px' }}/>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Dock;
