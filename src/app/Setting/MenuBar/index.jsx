import React from 'react';
import scss from './index.module.scss';

import { Checkbox, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  const setting = useSelector((state) => state.setting.menuBar);

  // 修改值
  const onChange = React.useCallback((key, valuePath, event) => {
    const value = _.get(event, valuePath, event);
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
        onChange={state.onChange.bind(
          null,
          'showFullScreenOnMenu',
          'target.checked',
        )}>
        在菜单栏显示全屏切换图标
      </Checkbox>
      <Checkbox
        checked={state.setting.showWeek}
        onChange={state.onChange.bind(
          null,
          'showWeek',
          'target.checked',
        )}>
        显示星期
      </Checkbox>
      <div className={scss['format-date']}>
        日期显示格式
        <Input
          value={state.setting.formatDate}
          onChange={state.onChange.bind(
            null,
            'formatDate',
            'target.value',
          )}
        />
      </div>
    </React.Fragment>
  );
};
