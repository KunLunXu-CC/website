import Tab from './Tab';
import React from 'react';
import Editor from './Editor';
import scss from './index.module.scss';
import TabBarExtra from './TabBarExtra';

import { Tabs } from 'antd';
import { Icon } from 'qyrc';
import { APP_CODE } from '@config/consts';
import { useDispatch, useSelector } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();

  const { works, showWork } = useSelector(state => ({
    works: state.editor ?. works,
    showWork: state.app.opens.find(
      v => v.code === APP_CODE.EDITOR && !v.isMin
    ),
  }));

  // 当前选中项
  const selected = React.useMemo(() => (
    _.get(works.find(v => v.action), 'article')
  ), [works]);

  // 点击 tab 切换事件: 将当前窗口设置为活动窗口
  const onTabsChange = article => {
    dispatch({
      article,
      type: 'editor/appendWorks',
    });
  };

  return { onTabsChange, selected, works, showWork };
};

export default () => {
  const state = useStateHook();
  return (
    <div className={scss.work}>
      {state.works.length > 0 && state.showWork ?
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
        </Tabs> :
        <div className={scss.empty}>
          <Icon type="icon-kong"/>
        </div>
      }
    </div>
  );
};
