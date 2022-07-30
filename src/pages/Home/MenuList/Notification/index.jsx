
import User from './User';
import Target from './Target';
import scss from './index.module.scss';

import { useState, useCallback  } from 'react';
import { Drawer } from 'antd';

export default () => {
  const [visible, setVisible] = useState(false);

  // 关闭
  const onClose = useCallback(() => setVisible(false), []);

  // 切换状态(显示/关闭)
  const onToggle = useCallback(() => setVisible((pre) => !pre), []);

  // // 点击抽屉
  // const onCloseDrawer = useCallback(() => {
  // }, []);


  return (
    <>
      <Target onClick={onToggle} />
      <Drawer
        width={374}
        closable={false}
        placement="right"
        // getContainer={false}
        onClose={onClose}
        visible={visible}
        className={scss.notification}>
        <User />
      </Drawer>
    </>
  );
};
