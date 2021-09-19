import React, {
  useMemo,
  useState,
} from 'react';
import scss from './index.module.scss';

import { Modal } from 'antd';
import { Icon, Image } from 'qyrc';
import { THUMB_SETTING } from '../../consts';
import { useDispatch, useSelector } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  // 获取当前文章内容
  const article = useSelector(
    (state) => _.get(state, `modal[${THUMB_SETTING}].article`),
  );

  // 点击取消
  const onCancel = () => {
    setFile(null);
    dispatch({
      code: THUMB_SETTING,
      type: 'modal/closeModal',
    });
  };

  // 点击确定
  const onOk = async () => {
    dispatch({
      file,
      id: article.id,
      type: 'editor/setArticleThumb',
    });
    onCancel();
  };

  // 前端上传文件
  const onUpload = (event) => {
    const { files: [file] } = event.target;
    file && setFile(file);
  };

  // 获取缩略图 src
  const src = useMemo(
    () => (file || _.get(article, 'thumb')),
    [file, article],
  );

  return { article, onCancel, onOk, onUpload, src };
};

export default () => {
  const state = useStateHook();
  return (
    <Modal
      okText="确定"
      closable={false}
      title="缩略图配置"
      cancelText="取消"
      onOk={state.onOk}
      getContainer={false}
      maskClosable={false}
      className={scss.modal}
      visible={!!state.article}
      onCancel={state.onCancel}>
      <label className={scss.upload}>
        {state.src ? (
          <Image src={state.src}>
            <Icon type="icon-editor" />
          </Image>
        ) :
          <Icon type="icon-tupianshangchuan" />
        }
        <input
          type="file"
          onChange={state.onUpload}
        />
      </label>
    </Modal>
  );
};
