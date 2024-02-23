import scss from './index.module.scss';

import { Modal } from 'antd';
import { RELEASE_CONFIRM } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

const ReleaseConfirm = () => {
  const dispatch = useDispatch();

  // 获取当前文章内容
  const article = useSelector(
    (state) => state.modal?.[RELEASE_CONFIRM]?.article,
  );

  // 点击取消
  const handleCancel = useCallback(() => {
    dispatch({
      type: 'modal/close',
      payload: RELEASE_CONFIRM,
    });
  }, [dispatch]);

  // 点击发布
  const handleOk = useCallback(async () => {
    if (!article) return;

    dispatch({
      id: article.id,
      type: 'editor/releaseArticle',
    });
    handleCancel();
  }, [article, dispatch, handleCancel]);

  return (
    <Modal
      okText="发布"
      onOk={handleOk}
      open={!!article}
      closable={false}
      cancelText="取消"
      getContainer={false}
      className={scss.modal}
      onCancel={handleCancel}>
      发布文章:
      <span className={scss['article-name']}>
        {article?.name ?? '---'}
      </span>
      ?
    </Modal>
  );
};

export default ReleaseConfirm;
