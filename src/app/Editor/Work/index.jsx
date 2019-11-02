import React, {
  useEffect
} from 'react';
import { Tabs } from 'antd';
import { useObserver } from 'mobx-react-lite';

import { useStore } from '../store';
import scss from './index.module.scss';
import Editor from './Editor';

const useStateHook = (props, store) => {
  // 移除
  const remove = (key) => {
    store.article.close(key);
    store.menu.toggleSelected(key);
  }

  // 编辑
  const onEdit = (targetKey, action) => {
    const handlers = { remove };
    handlers[action](targetKey);
  }

  // tabs change 事件
  const onTabsChange = (activeKey) => {
    store.menu.toggleSelected(activeKey);
  }

  return { onEdit, onTabsChange };
}

export default (props) => {
  const store = useStore();
  const state = useStateHook(props, store);

  return useObserver(() => (
    <div className={scss['work']}>
      <Tabs
        hideAdd
        type="editable-card"
        onEdit={state.onEdit}
        onChange={state.onTabsChange}
        activeKey={store.menu.selected}>
        {store.article.works.map(v => (
          <Tabs.TabPane tab={v.article.name} key={v.article.id}>
            <div className={scss['tab-pane-body']}>
              <Editor data={v}/>
            </div>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  ));
};
