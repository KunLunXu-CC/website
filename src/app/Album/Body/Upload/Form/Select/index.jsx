import React, {
  useMemo,
} from 'react';
import scss from './index.module.scss';

import { Select } from 'antd';
import { PHOTO_TYPE } from '@config/consts';
import { useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();

  // select option 数据
  const options = useMemo(() => Object.keys(PHOTO_TYPE).map(key => ({
    key: PHOTO_TYPE[key].VALUE,
    title: PHOTO_TYPE[key].DESC,
    value: PHOTO_TYPE[key].VALUE,
  })), []);

  const onChange = value => {
    dispatch({
      type: 'album/setUploadType',
      uploadType: value,
    });
  };

  return { options, onChange };
};

export default () => {
  const state = useStateHook();
  return (
    <div className={scss.select}>
      <Select
        allowClear
        onChange={state.onChange}
        style={{ width: '100%' }}
        placeholder="选择上传图片类型"
      >
        {state.options.map(v => (
          <Select.Option key={v.key} value={v.value}>
            {v.title}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};
