import React from 'react';
import scss from './index.module.scss';

import { Button } from 'antd';
import { useDispatch } from 'react-redux';

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
        icon="upload"
        type="primary"
        onClick={state.onClick}>
        上传
      </Button>
    </div>
  );
};
