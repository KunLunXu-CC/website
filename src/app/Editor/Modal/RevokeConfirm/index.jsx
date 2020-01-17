import React, {
  useMemo,
} from 'react';
import scss from './index.module.scss';

import { Modal } from 'antd';
import { useStore } from '../../store';
import { REVOKE_CONFIRM } from '../consts';
import { useObserver } from 'mobx-react-lite';

const useStateHook = store => {
  const modal = useMemo(() => (
    store.global.modal.modals[REVOKE_CONFIRM]
  ), [store.global.modal.modals]);

  const onCancel = () => {
    store.global.modal.close(REVOKE_CONFIRM);
  };

  const onOk = async () => {
    const id = _.get(store, 'article.action.article.id');
    if (!id) {
      return false;
    }
    await store.article.revokeArticle({ id });
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
        okText="撤销"
        closable={false}
        cancelText="取消"
        onOk={state.onOk}
        getContainer={false}
        className={scss.modal}
        visible={!!state.modal}
        onCancel={state.onCancel}>
        撤销文章:
        <span className={scss['article-name']}>
          {_.get(store, 'article.action.article.name') || '---'}
        </span>
        ？
      </Modal>
    );
  });
};
