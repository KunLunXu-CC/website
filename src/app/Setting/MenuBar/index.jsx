import React from 'react';

import { Checkbox } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  const setting = useSelector(state => state.setting.menuBar);

  // 修改值
  const onChange = React.useCallback((key, event) => {
    const value = event.target.checked;
    dispatch({
      type: 'setting/setValue',
      setting: { menuBar: { [key]: value } },
    });
  }, []);

  return { setting, onChange };
};

export default () => {
  const state = useStateHook();

  return (
    <React.Fragment>
      <Checkbox
        checked={state.setting.showFullScreenOnMenu}
        onChange={state.onChange.bind(null, 'showFullScreenOnMenu')}>
        在菜单栏显示全屏切换图标
      </Checkbox>
    </React.Fragment>
  );
};
