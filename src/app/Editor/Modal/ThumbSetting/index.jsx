import React, {
  useMemo,
  useState,
} from 'react';
import scss from './index.module.scss';

import { Icon, Image } from 'qyrc';
import { Modal } from 'antd';
import { useStore } from '../../store';
import { THUMB_SETTING } from '../consts';
import { useObserver } from 'mobx-react-lite';

const useStateHook = store => {
  const [file, setFile] = useState(null);
  const modal = useMemo(() => (
    store.global.modal.modals[THUMB_SETTING]
  ), [store.global.modal.modals]);

  const onCancel = () => {
    setFile(null);
    store.global.modal.close(THUMB_SETTING);
  };

  const onOk = async () => {
    const article = _.get(store, 'article.action.article.id');
    file && article && store.article.uploadThumb({ file, article });
    onCancel();
  };

  const onUpload = event => {
    const { files: [file] } = event.target;
    file && setFile(file);
  };

  const src = useMemo(() => {
    const thumb = _.get(store.article.action, 'article.thumb');
    return file || thumb;
  }, [file, store.article.action]);

  return { modal, onCancel, onOk, onUpload, src };
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
        <label className={scss.upload}>
          {state.src ?
            <Image src={state.src}>
              <Icon type="icon-editor"/>
            </Image> :
            <Icon type="icon-tupianshangchuan"/>
          }
          <input type="file" onChange={state.onUpload}/>
        </label>
      </Modal>
    );
  });
};
