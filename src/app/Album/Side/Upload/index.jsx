import React from 'react';
import scss from './index.module.scss';

import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';

const useStateHook = () => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch({ type: 'album/openUploadForm' });
  };

  return { onClick };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.upload}>
      <Button
        block
        type="primary"
        icon={<UploadOutlined />}
        onClick={state.onClick}>
        上传
      </Button>
    </div>
  );
};
