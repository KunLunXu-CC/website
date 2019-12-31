import React, {
  useMemo,
} from 'react';
import scss from './index.module.scss';

import { Select } from 'antd';
import { PHOTO_TYPE } from '@config/consts';
import { useStore } from '../../../../store';

const useStateHook = (props, store) => {
  // select option 数据
  const options = useMemo(() => Object.keys(PHOTO_TYPE).map(key => ({
    key: PHOTO_TYPE[key].VALUE,
    title: PHOTO_TYPE[key].DESC,
    value: PHOTO_TYPE[key].VALUE,
  })), []);

  const onChange = value => {
    store.upload.setType(value);
  };

  return { options, onChange };
};

export default props => {
  const store = useStore();
  const state = useStateHook(props, store);
  return (
    <div className={scss.select}>
      <Select
        allowClear
        onChange={state.onChange}
        style={{ width: '100%' }}
        placeholder="选择上传图片类型"
      >
        {state.options.map(v => (
          <Select.Option key={v.key} value={v.value}>{v.title}</Select.Option>
        ))}
      </Select>
    </div>
  );
};
