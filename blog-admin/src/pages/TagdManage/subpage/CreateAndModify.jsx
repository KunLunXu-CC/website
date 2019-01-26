import React from 'react';
import { Modal } from 'antd';

export default () => {
  return (
    <Modal
      title="Basic Modal"
      visible={false}
      onOk={() => {}}
      onCancel={() => {}}
      >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
}
