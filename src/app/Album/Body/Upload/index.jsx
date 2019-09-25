import React from 'react';
import { Drawer, Button } from 'antd';
import { useObserver } from 'mobx-react-lite';

import { useStore } from '../../store';
import scss from './index.module.scss';

const useStateHook = (props, store) => {
  const onClose = () => {
    store.upload.close();
  }
  return { onClose };
} 

export default (props) => {
  const store = useStore();
  const state = useStateHook(props, store);

  return useObserver(() => (
    <Drawer
      width="50%"
      closable={false}
      placement="left"
      title="Basic Drawer"
      getContainer={false}
      onClose={state.onClose}
      visible={store.upload.show}
      style={{ position: 'absolute'}}
    >
      <p>Some contents...</p>
    </Drawer>
  ));
}
