import React from 'react';
import { Modal } from 'antd';

class CreateAndModify extends React.Component{
  render(){
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
}

export default CreateAndModify;
