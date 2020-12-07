import React from 'react';

import { Checkbox } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  const setting = useSelector(state => state.setting.desktop);

  // 修改值
  const onChange = React.useCallback((key, event) => {
    const value = event.target.checked;
    dispatch({
      type: 'setting/setValue',
      setting: { desktop: { [key]: value } },
    });
  }, []);

  return { setting, onChange };
};

export default () => {
  const state = useStateHook();

  return (
    <React.Fragment>
      <Checkbox
        checked={state.setting.autoFullScreen}
        onChange={state.onChange.bind(null, 'autoFullScreen')}>
        进入系统自动全屏进行展示
      </Checkbox>
    </React.Fragment>
  );
};
