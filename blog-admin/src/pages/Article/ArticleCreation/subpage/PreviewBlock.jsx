import React, {useState} from 'react';
import { FontIcon } from '@components';
import { Drawer } from 'antd';

const useStateHook = () => {
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
  const { visible, onClose, onOpen } = useStateHook();

  return (
    <div>
      <div className="preview-btn cp" onClick = {onOpen}>
        <FontIcon icon="#icon-yulan" />
      </div>
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        width="70%"
        onClose={onClose}
        visible={visible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
}
