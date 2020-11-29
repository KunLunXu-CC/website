import React from 'react';
import User from './User';
import Target from './Target';
import scss from './index.module.scss';

import { Drawer } from 'antd';

const useStateHook = () => {
  const [visible, setVisible] = React.useState(false);

  // 关闭
  const onClose = React.useCallback(setVisible.bind(null, false), []);

  // 切换状态(显示/关闭)
  const onToogle = React.useCallback(
    setVisible.bind(null, !visible),
    [visible]
  );

  // // 点击抽屉
  // const onCloseDrawer = React.useCallback(() => {
  // }, []);

  return { visible, onClose, onToogle };
};

export default () => {
  const state = useStateHook();

  return (
    <React.Fragment>
      <Target onClick={state.onToogle}/>
      <Drawer
        width={300}
        closable={false}
        placement="right"
        // getContainer={false}
        onClose={state.onClose}
        visible={state.visible}
        className={scss.notification}>
        <User/>
      </Drawer>
    </React.Fragment>
  );
};
