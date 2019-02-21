import React, {useState} from 'react';
import { FontIcon } from '@components';
import { Drawer } from 'antd';

const innerHook = () => {
  const [visible, setVisible] = useState(false);
  const onClose = () => {
    setVisible(false);
  }
  const onOpen = () => {
    setVisible(true);
  }
  return {visible, onClose, onOpen};
}

export default () => {
  const innerStore = innerHook();

  return (
    <div>
      <div className="preview-btn" onClick = {innerStore.onOpen}>
        <FontIcon icon="#icon-yulan" />
      </div>
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={innerStore.onClose}
        visible={innerStore.visible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
}
