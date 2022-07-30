import Form from './Form';
import Footer from './Footer';
import scss from './index.module.scss';

import { Drawer } from 'antd';
import { actions } from '@store';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default () => {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.photos?.upload?.show);

  const handleClose = useCallback(() => {
    dispatch(actions.photos.updateUpload({ show: false }));
  }, [dispatch]);

  return (
    <Drawer
      width="420"
      title="文件上传"
      placement="left"
      visible={visible}
      getContainer={false}
      onClose={handleClose}
      className={scss.upload}>
      <Form />
      <Footer />
    </Drawer>
  );
};
