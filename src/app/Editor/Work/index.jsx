import Tab from './Tab';
import Empty from './Empty';
import Editor from './Editor';
import React, { useMemo } from 'react';
import scss from './index.module.scss';
import TabBarExtra from './TabBarExtra';

import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();

  const works = useSelector(state => _.get(state, 'editor.works'));

  // 当前选中项
  const selected = useMemo(() => (
    _.get(works.find(v => v.action), 'article')
  ), [works]);

  // 点击 tab 切换事件: 将当前窗口设置为活动窗口
  const onTabsChange = article => {
    dispatch({
      article,
      type: 'editor/appendWorks',
    });
  };

  return { onTabsChange, selected, works };
};

export default () => {
  const state = useStateHook();
  return (
    <div className={scss.work}>
      {state.works.length > 0 ?
        <Tabs
          type="card"
          activeKey={state.selected}
          onChange={state.onTabsChange}
          tabBarExtraContent={<TabBarExtra/>}>
          {state.works.map(v => (
            <Tabs.TabPane
              key={v.article}
              tab={<Tab work={v}/>}>
              <Editor work={v}/>
            </Tabs.TabPane>
          ))}
        </Tabs> : <Empty/>
      }
    </div>
  );
};
