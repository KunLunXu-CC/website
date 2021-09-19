import React from 'react';

import { Checkbox } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  const setting = useSelector((state) => state.setting.dock);

  // 修改值
  const onChange = React.useCallback((key, event) => {
    const value = event.target.checked;
    dispatch({
      type: 'setting/setValue',
      setting: { dock: { [key]: value } },
    });
  }, []);

  return { setting, onChange };
};

export default () => {
  const state = useStateHook();

  return (
    <Checkbox
      checked={state.setting.hideDock}
      onChange={state.onChange.bind(null, 'hideDock')}>
      自动隐藏和显示程序坞
    </Checkbox>
  );
};
