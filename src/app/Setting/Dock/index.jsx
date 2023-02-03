import { Checkbox } from 'antd';
import { actions } from '@store';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  const setting = useSelector((state) => state.setting.dock);

  // 修改值
  const onChange = useCallback((key, event) => {
    const value = event.target.checked;
    dispatch(actions.setting.set({
      dock: { [key]: value },
    }));
  }, [dispatch]);

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
