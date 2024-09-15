import useSettingStore from '@/store/useSettingStore';

import { Checkbox } from 'antd';
import { memo, useCallback } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

const Dock = () => {
  const { dock, updateDock } = useSettingStore();

  // 修改值
  const onChange = useCallback(
    (key: string, event: CheckboxChangeEvent) => {
      const value = event.target.checked;
      updateDock({ [key]: value });
    },
    [updateDock],
  );

  return (
    <Checkbox
      checked={dock.hideDock}
      onChange={onChange.bind(null, 'hideDock')}>
      自动隐藏和显示程序坞
    </Checkbox>
  );
};

export default memo(Dock);
