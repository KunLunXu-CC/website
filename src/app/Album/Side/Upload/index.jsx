import React from 'react';
import scss from './index.module.scss';

import { Button } from 'antd';
import { useStore } from '../../store';

const useStateHook = (props, store) => {
  const onClick = () => {
    store.upload.open();
  };
  return { onClick };
};

export default props => {
  const store = useStore();
  const state = useStateHook(props, store);

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
