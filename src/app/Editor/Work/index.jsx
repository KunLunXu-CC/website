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

  const selected = useMemo(() => (
    _.get(works.find(v => v.action), 'article')
  ), [works]);

  // tabs change 事件
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
          tabBarExtraContent={<TabBarExtra/>}
        >
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
