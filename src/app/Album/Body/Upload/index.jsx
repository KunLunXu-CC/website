import React from 'react';
import { Drawer } from 'antd';
import { useObserver } from 'mobx-react-lite';

import { useStore } from '../../store';
import scss from './index.module.scss';
import Footer from './Footer';
import Form from './Form';

const useStateHook = (props, store) => {
  const onClose = () => {
    store.upload.close();
  };
  return { onClose };
}

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
