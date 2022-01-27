import React from 'react';
import Form from './Form';
import Footer from './Footer';
import scss from './index.module.scss';

import { Drawer } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.album?.upload?.show);

  const onClose = () => {
    dispatch({ type: 'album/closeUploadForm' });
  };

  return { show, onClose };
};

export default () => {
  const state = useStateHook();

  return (
    <Drawer
      width="420"
      title="文件上传"
      placement="left"
      getContainer={false}
      visible={state.show}
      className={scss.upload}
      onClose={state.onClose}>
      <Form />
      <Footer />
    </Drawer>
  );
};
