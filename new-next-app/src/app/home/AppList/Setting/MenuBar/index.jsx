import scss from './index.module.scss';

import { actions } from '@/store';
import { useCallback } from 'react';
import { Checkbox, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  const setting = useSelector((state) => state.setting.menuBar);

  // 修改值
  const onChange = useCallback((key, { target }) => {
    const value = target?.value ?? target?.checked;

    dispatch(actions.setting.set({
      menuBar: { [key]: value },
    }));
  }, [dispatch]);

  return { setting, onChange };
};

export default () => {
  const state = useStateHook();

  return (
    <>
      <Checkbox
        checked={state.setting.showFullScreenOnMenu}
        onChange={state.onChange.bind(null, 'showFullScreenOnMenu')}>
        在菜单栏显示全屏切换图标
      </Checkbox>
      <Checkbox
        checked={state.setting.showWeek}
        onChange={state.onChange.bind(null, 'showWeek')}>
        显示星期
      </Checkbox>
      <div className={scss['format-date']}>
        日期显示格式
        <Input
          value={state.setting.formatDate}
          onChange={state.onChange.bind(null, 'formatDate')}
        />
      </div>
    </>
  );
};
