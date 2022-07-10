import React from 'react';
import scss from './index.module.scss';

import { Icon, Image } from '@kunlunxu/brick';
import { useDispatch, useSelector } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.album?.upload?.files);

  // 添加文件
  const addFiles = (e) => {
    const { files } = e.target;
    dispatch({ type: 'album/addUploadFiles', files });
  };

  return { files, addFiles };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss['upload-list']}>
      <label className={scss.upload}>
        <Icon type="icon-tupianshangchuan" />
        <input
          type="file"
          accept="image/*"
          multiple="multiple"
          onChange={state.addFiles}
        />
      </label>
      {state.files.map((file, index) => (
        <div
          key={index}
          className={scss.item}>
          <Image src={file} />
        </div>
      ))}
    </div>
  );
};
