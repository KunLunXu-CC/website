import React from 'react';
import scss from './index.module.scss';

import { Checkbox } from 'antd';
import { useSelector } from 'react-redux';

const useStateHook = () => {
  const setting = useSelector(state => state.setting);

  // 修改值
  const onChange = React.useCallback((key, event) => {
    console.log(key, event);
  }, []);

  return { setting, onChange };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.body}>
      <Checkbox
        checked={state.setting.hideDock}
        onChange={this.onChange.bind(null, 'hideDock')}>
        自动隐藏和显示程序坞
      </Checkbox>
    </div>
  );
};
