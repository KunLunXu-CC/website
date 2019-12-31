import React from 'react';
import scss from './index.module.scss';

import { Icon, Image } from 'qyrc';
import { useStore } from '../../../../store';
import { useObserver } from 'mobx-react-lite';

const useStateHook = (props, store) => {
  // 添加文件
  const addFiles = e => {
    const { files } = e.target;
    store.upload.addFiles(files);
  };

  return { addFiles };
};

export default props => {
  const store = useStore();
  const state = useStateHook(props, store);

  return useObserver(() => (
    <div className={scss['upload-list']}>
      <label className={scss.upload}>
        <Icon type="icon-tupianshangchuan"/>
        <input type="file" multiple="multiple" onChange={state.addFiles}/>
      </label>
      {store.upload.fileList.map((file, index) => (
        <div key={index} className={scss.item}>
          <Image src={file} />
        </div>
      ))}
    </div>
  ));
};
