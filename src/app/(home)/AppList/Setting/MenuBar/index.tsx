import scss from './index.module.scss';
import useSettingStore from '@/store/useSettingStore';

import { Checkbox, Input } from 'antd';
import { ChangeEvent, useCallback } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

const MenuBar = () => {
  const { menuBar, updateMenuBar } = useSettingStore();

  // 修改值
  const handleChange = useCallback(
    (key: string, event: CheckboxChangeEvent | ChangeEvent<HTMLInputElement>) => {
      const value = event.target?.value ?? event.target?.checked;
      updateMenuBar({ [key]: value });
    },
    [updateMenuBar],
  );

  return (
    <>
      <Checkbox
        checked={menuBar.showFullScreenOnMenu}
        onChange={handleChange.bind(null, 'showFullScreenOnMenu')}>
        在菜单栏显示全屏切换图标
      </Checkbox>
      <Checkbox
        checked={menuBar.showWeek}
        onChange={handleChange.bind(null, 'showWeek')}>
        显示星期
      </Checkbox>
      <div className={scss['format-date']}>
        日期显示格式
        <Input
          value={menuBar.formatDate}
          onChange={handleChange.bind(null, 'formatDate')}
        />
      </div>
    </>
  );
};

export default MenuBar;
