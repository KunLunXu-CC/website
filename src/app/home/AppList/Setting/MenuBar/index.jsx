import scss from './index.module.scss';

import { actions } from '@/store';
import { useCallback } from 'react';
import { Checkbox, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

const MenuBar = () => {
  const dispatch = useDispatch();
  const setting = useSelector((state) => state.setting.menuBar);

  // 修改值
  const onChange = useCallback((key, { target }) => {
    const value = target?.value ?? target?.checked;

    dispatch(actions.setting.set({
      menuBar: { [key]: value },
    }));
  }, [dispatch]);

  return (
    <>
      <Checkbox
        checked={setting.showFullScreenOnMenu}
        onChange={onChange.bind(null, 'showFullScreenOnMenu')}>
        在菜单栏显示全屏切换图标
      </Checkbox>
      <Checkbox
        checked={setting.showWeek}
        onChange={onChange.bind(null, 'showWeek')}>
        显示星期
      </Checkbox>
      <div className={scss['format-date']}>
        日期显示格式
        <Input
          value={setting.formatDate}
          onChange={onChange.bind(null, 'formatDate')}
        />
      </div>
    </>
  );
}

export default MenuBar;
