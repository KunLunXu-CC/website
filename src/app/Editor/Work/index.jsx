import React from 'react';
import { Icon } from 'qyrc';
import { Tabs } from 'antd';
import classNames from 'classnames';
import { useObserver } from 'mobx-react-lite';

import { useStore } from '../store';
import scss from './index.module.scss';
import Editor from './Editor';

const useStateHook = (props, store) => {
  // 移除
  const onClose = key => {
    store.article.close(key);
    store.menu.toggleSelected(key);
  }

  // tabs change 事件
  const onTabsChange = activeKey => {
    store.menu.toggleSelected(activeKey);
  }

  return { onClose, onTabsChange };
}

export default props => {
  const store = useStore();
  const state = useStateHook(props, store);

  return useObserver(() => (
    <div className={scss['work']}>
      <Tabs
        onChange={state.onTabsChange}
        activeKey={store.menu.selected}>
        {store.article.works.map(v => (
          <Tabs.TabPane
            key={v.article.id}
            tab={(
              <span className={scss['work-tab']}>
                {v.article.name}&nbsp;&nbsp;
                <Icon
                  type="icon-guanbi6"
                  className={classNames(
                    scss['work-tab-icon'],
                    { [scss['work-tab-icon-change']]: v.change }
                  )}
                  onClick={state.onClose.bind(null, v.article.id )}
                />
              </span>
            )}>
            <div className={scss['tab-pane-body']}>
              <Editor data={v}/>
            </div>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  ));
};
