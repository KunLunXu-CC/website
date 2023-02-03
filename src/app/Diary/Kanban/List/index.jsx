import classNames from 'classnames';
import scss from './index.module.scss';
import { Icon } from '@kunlunxu/brick';
import { useState, useCallback, useEffect, useMemo } from 'react';

const useStateHook = () => {
  const [active, setActive] = useState(false);

  // 开启弹窗
  const onOpen = useCallback(() => {
    if (active) {
      return false;
    }

    setActive(true);
  }, [active]);

  // 容器 className
  const className = useMemo(() => classNames(
    scss.wrapper,
    { [scss.active]: active },
  ), [active]);

  // 监听 active 并绑定 click 用于关闭弹窗
  useEffect(() => {
    if (active) {
      const onClose = () => setActive(false);
      window.addEventListener('click', onClose);
      return () => window.removeEventListener('click', onClose);
    }
  }, [active]);

  return { onOpen, className };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={state.className}>
      <div
        className={scss.btn}
        onClick={state.onOpen}
      />
      <div className={scss.body}>
        <div className={scss.list}>
          {Array.from({ length: 20 }).map((v, index) => (
            <div
              className={scss.item}
              key={index}>
              <div className={scss.title}>
                扫描结束!
              </div>
              <div className={scss.desc}>
                继续并倾倒所有垃圾文件夹, 获得更多控件。
              </div>
            </div>
          ))}
        </div>
        <div className={scss.footer}>
          <Icon type="icon-xinzeng" />
        </div>
      </div>
    </div>
  );
};
