import React from 'react';
import scss from './index.module.scss';

import { Button } from 'antd';
import { useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();

  // 取消
  const onCancel = () => {
    dispatch({ type: 'album/closeUploadForm' });
  };

  // 上传
  const onUpload = async () => {
    dispatch({ type: 'album/upload' });
  };

  return { onCancel, onUpload };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.footer}>
      <Button type="primary" onClick={state.onUpload}>上传</Button>
      <Button onClick={state.onCancel}>取消</Button>
    </div>
  );
};
