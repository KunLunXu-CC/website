import React from 'react';
import User from './User';
import scss from './index.module.scss';

import { Drawer } from 'antd';
import { Icon } from 'qyrc';

const useStateHook = () => {
  const [visible, setVisible] = React.useState(false);
  const drawerRef = React.useRef(null);

  // 关闭
  const onClose = React.useCallback(setVisible.bind(null, false), []);

  // 切换状态(显示/关闭)
  const onToogle = React.useCallback(
    setVisible.bind(null, !visible),
    [visible]
  );

  React.useEffect(() => {
    if (visible) {
      const onClose = event => {
        if (drawerRef.current.contains(event.target)) {
          return false;
        }
        setVisible(false);
      };
      window.addEventListener('click', onClose);
      return () => window.removeEventListener('click', onClose);
    }
  }, [visible]);

  return { visible, onClose, onToogle, drawerRef };
};

export default () => {
  const state = useStateHook();

  return (
    <React.Fragment>
      <Icon type="icon-caidan" onClick={state.onToogle}/>
      <Drawer
        width={300}
        mask={false}
        closable={false}
        placement="right"
        onClose={state.onClose}
        visible={state.visible}
        className={scss.notification}>
        <div ref={state.drawerRef} className={scss.body}>
          <User/>
        </div>
      </Drawer>
    </React.Fragment>
  );
};
