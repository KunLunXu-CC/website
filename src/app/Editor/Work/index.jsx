import React from 'react';

import { Tabs } from 'antd';
import { useStore } from '../store';
import { useObserver } from 'mobx-react-lite';

import Tab from './Tab';
import Empty from './Empty';
import Editor from './Editor';
import TabBarExtra from './TabBarExtra';
import scss from './index.module.scss';

const useStateHook = (props, store) => {
  // 移除
  const onClose = key => {
    store.article.close(key);
    store.menu.toggleSelected(key);
  };

  // tabs change 事件
  const onTabsChange = activeKey => {
    store.menu.toggleSelected(activeKey);
  };

  return { onClose, onTabsChange };
};

export default props => {
  const store = useStore();
  const state = useStateHook(props, store);

  return useObserver(() => (
    <div className={scss.work}>
      {store.article.works.length > 0 ?
        <Tabs
          type="card"
          onChange={state.onTabsChange}
          activeKey={store.menu.selected}
          tabBarExtraContent={<TabBarExtra/>}>
          {store.article.works.map(v => (
            <Tabs.TabPane
              key={v.article.id}
              tab={<Tab data={v} onClose={state.onClose}/>}>
              <Editor data={v}/>
            </Tabs.TabPane>
          ))}
        </Tabs> : <Empty/>
      }
    </div>
  ));
};
