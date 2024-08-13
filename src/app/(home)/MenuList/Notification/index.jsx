import User from './User';
import Target from './Target';
import scss from './index.module.scss';

import { useState, useCallback  } from 'react';
import { Drawer } from 'antd';

const Notification = () => {
  const [open, setOpen] = useState(false);

  // 关闭
  const onClose = useCallback(() => setOpen(false), []);

  // 切换状态(显示/关闭)
  const onToggle = useCallback(() => setOpen((pre) => !pre), []);

  return (
    <>
      <Target onClick={onToggle} />
      <Drawer
        width={374}
        open={open}
        closable={false}
        placement="right"
        onClose={onClose}
        rootClassName={scss.notification}>
        <User />
      </Drawer>
    </>
  );
};

export default Notification;
