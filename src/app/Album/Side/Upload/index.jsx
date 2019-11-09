import React from 'react';
import { Button } from 'antd';
import scss from './index.module.scss';
import { useStore } from '../../store';

const useStateHooks = (props, store) => {
  const onClick = () => {
    store.upload.open();
  }
  return { onClick };
};

export default props => {
  const store = useStore();
  const state = useStateHooks(props, store);

  return (
    <div className={scss['upload']}>
      <Button
        block
        icon="upload"
        type="primary"
        onClick={state.onClick}>
        上传
      </Button>
    </div>
  );
}
