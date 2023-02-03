import scss from './index.module.scss';

import { Modal } from 'antd';
import { RELEASE_CONFIRM } from '../../consts';
import { useDispatch, useSelector } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();

  // 获取当前文章内容
  const article = useSelector(
    (state) => state.modal?.[RELEASE_CONFIRM]?.article,
  );

  // 点击取消
  const onCancel = () => {
    dispatch({
      code: RELEASE_CONFIRM,
      type: 'modal/closeModal',
    });
  };

  // 点击发布
  const onOk = async () => {
    dispatch({
      id: article.id,
      type: 'editor/releaseArticle',
    });
    onCancel();
  };

  return { article, onCancel, onOk };
};

export default () => {
  const state = useStateHook();

  return (
    <Modal
      okText="发布"
      closable={false}
      cancelText="取消"
      onOk={state.onOk}
      maskClosable={false}
      getContainer={false}
      open={!!state.article}
      className={scss.modal}
      onCancel={state.onCancel}>
      发布文章:
      <span className={scss['article-name']}>
        {state.article?.name ?? '---'}
      </span>
      ？
    </Modal>
  );
};
