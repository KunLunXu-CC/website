import React from 'react';
import scss from './index.module.scss';

import { Modal } from 'antd';
import { REVOKE_CONFIRM } from '../consts';
import { useDispatch, useSelector } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();

  const article = useSelector(
    state => _.get(state, `modal[${REVOKE_CONFIRM}].article`)
  );

  const onCancel = () => {
    dispatch({
      code: REVOKE_CONFIRM,
      type: 'modal/closeModal',
    });
  };

  const onOk = async () => {
    dispatch({
      id: article.id,
      type: 'editor/revokeArticle',
    });
    onCancel();
  };

  return { article, onCancel, onOk };
};

export default () => {
  const state = useStateHook();

  return (
    <Modal
      okText="撤销"
      closable={false}
      cancelText="取消"
      onOk={state.onOk}
      getContainer={false}
      className={scss.modal}
      visible={!!state.article}
      onCancel={state.onCancel}>
      撤销文章:
      <span className={scss['article-name']}>
        {_.get(state, 'article.name') || '---'}
      </span>
      ？
    </Modal>
  );
};
