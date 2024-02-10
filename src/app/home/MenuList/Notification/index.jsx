
import User from './User';
import Target from './Target';
import scss from './index.module.scss';

import { useState, useCallback  } from 'react';
import { Drawer } from 'antd';

export default () => {
  const [open, setOpen] = useState(false);

  // 关闭
  const onClose = useCallback(() => setOpen(false), []);

  // 切换状态(显示/关闭)
  const onToggle = useCallback(() => setOpen((pre) => !pre), []);

  // // 点击抽屉
  // const onCloseDrawer = useCallback(() => {
  // }, []);


  return (
    <>
      <Target onClick={onToggle} />
      <Drawer
        width={374}
        open={open}
        closable={false}
        placement="right"
        // getContainer={false}
        onClose={onClose}
        rootClassName={scss.notification}>
        <User />
      </Drawer>
    </>
  );
};
