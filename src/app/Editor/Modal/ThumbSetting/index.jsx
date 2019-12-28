import React, {
  useMemo,
} from 'react';
import { Modal } from 'antd';
import { useStore } from '../../store';
import { THUMB_SETTING } from '../consts';
import { useObserver } from 'mobx-react-lite';
import scss from './index.module.scss';

const useStateHook = store => {
  const modal = useMemo(() => (
    store.global.modal.modals[THUMB_SETTING]
  ), [store.global.modal.modals]);

  const onCancel = () => {
    store.global.modal.close(THUMB_SETTING);
  };

  const onOk = async () => {
    onCancel();
  };

  return { modal, onCancel, onOk };
};

export default () => {
  const store = useStore();
  return useObserver(() => {
    const state = useStateHook(store);
    return (
      <Modal
        okText="确定"
        closable={false}
        title="缩略图配置"
        cancelText="取消"
        onOk={state.onOk}
        getContainer={false}
        className={scss.modal}
        visible={!!state.modal}
        onCancel={state.onCancel}>
        缩略图配置
      </Modal>
    );
  });
};
