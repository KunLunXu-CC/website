import scss from './index.module.scss';

import { Modal } from 'antd';
import { REVOKE_CONFIRM } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();

  const article = useSelector(
    (state) => state.modal?.[REVOKE_CONFIRM]?.article,
  );

  // 点击取消按钮
  const onCancel = () => {
    dispatch({
      code: REVOKE_CONFIRM,
      type: 'modal/closeModal',
    });
  };

  // 点击撤销
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
      maskClosable={false}
      getContainer={false}
      open={!!state.article}
      className={scss.modal}
      onCancel={state.onCancel}>
      撤销文章:
      <span className={scss['article-name']}>
        {state.article?.name ?? '---'}
      </span>
      ？
    </Modal>
  );
};
