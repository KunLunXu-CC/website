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

  const { selected, openList, articles } = useSelector(state => ({
    selected: _.get(state, 'editor.menu.selected'),
    openList: _.get(state, 'editor.openList'),
    articles: _.get(state, 'editor.articles'),
  }));

  const works = useMemo(() => (
    openList.map(v => ({
      ... articles.find(article => article.id === v),
    }))
  ), [openList, articles]);

  // 移除
  const onClose = key => {
    dispatch({ type: 'editor/removeOpenList', key });
  };

  // tabs change 事件
  const onTabsChange = activeKey => {
    dispatch({
      type: 'editor/setMenu',
      menu: { selected: activeKey },
    });
  };

  return { onClose, onTabsChange, selected, openList, works };
};

export default () => {
  const state = useStateHook();
  return (
    <div className={scss.work}>
      {state.works.length > 0 ?
        <Tabs
          type="card"
          onChange={state.onTabsChange}
          activeKey={state.selected}
          tabBarExtraContent={<TabBarExtra/>}
        >
          {state.works.map(v => (
            <Tabs.TabPane
              key={v.id}
              tab={<Tab data={v} onClose={state.onClose}/>}>
              <Editor data={v}/>
            </Tabs.TabPane>
          ))}
        </Tabs> : <Empty/>
      }
    </div>
  );
};
