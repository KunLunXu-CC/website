import React from 'react';
import { Button } from 'antd';

import scss from './index.module.scss';
import { useStore } from '../../../store';

const useStateHook = (props, store) => {
  // 取消
  const onCancel = () => {
    store.upload.close();
  };

  // 上传
  const onUpload = async () => {
    if (store.upload.fileList.length > 0) {
      await store.upload.upload();
      store.upload.close();
      store.message.setMessage({
        type: 'success',
        message: '文件上传成功!',
      });
      store.photos.setList();
    }
    store.message.setMessage({
      type: 'error',
      message: '上传文件列表不能为空!',
    });
  };

  return { onCancel, onUpload };
};

export default props => {
  const store = useStore();
  const state = useStateHook(props, store);

  return (
    <div className={scss.footer}>
      <Button type="primary" onClick={state.onUpload}>上传</Button>
      <Button onClick={state.onCancel}>取消</Button>
    </div>
  );
};
