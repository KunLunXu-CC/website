import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import scss from './index.module.scss';
import Editor from './Editor';

const useStateHook = () => {

  // 编辑
  const onEdit = (targetKey, action) => {
    console.log('targetKey, action', targetKey, action);
  }

  return { onEdit };
}

export default (props) => {
  const state = useStateHook(props);

  return (
    <div className={scss['work']}>
      <Tabs hideAdd type="editable-card" onEdit={state.onEdit}>
        <Tabs.TabPane tab="Tab Title 1" key="1">
          <div className={scss['tab-pane-body']}><Editor /></div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tab Title 2" key="2"></Tabs.TabPane>
        <Tabs.TabPane tab="Tab Title 3" key="3"></Tabs.TabPane>
      </Tabs>
    </div>
  );
};
