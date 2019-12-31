import React from 'react';
import Form from './Form';
import Footer from './Footer';
import scss from './index.module.scss';

import { Drawer } from 'antd';
import { useStore } from '../../store';
import { useObserver } from 'mobx-react-lite';

const useStateHook = (props, store) => {
  const onClose = () => {
    store.upload.close();
  };
  return { onClose };
};

export default props => {
  const store = useStore();
  const state = useStateHook(props, store);

  return useObserver(() => (
    <Drawer
      width="420"
      title="文件上传"
      placement="left"
      getContainer={false}
      className={scss.upload}
      onClose={state.onClose}
      visible={store.upload.show}
    >
      <Form />
      <Footer />
    </Drawer>
  ));
};
