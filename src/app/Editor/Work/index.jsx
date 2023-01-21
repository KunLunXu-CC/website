import Tab from './Tab';
import Editor from './Editor';
import scss from './index.module.scss';
import TabBarExtra from './TabBarExtra';

import { Tabs } from 'antd';
import { actions } from '@store';
import { Icon } from '@kunlunxu/brick';
import { APP_CODE } from '@config/consts';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default () => {
  const dispatch = useDispatch();

  const { works, showWork } = useSelector((state) => ({
    works: state.editor?.works,
    showWork: state.app.opens.find(
      (v) => v.code === APP_CODE.EDITOR && !v.isMin,
    ),
  }));

  // 当前选中项
  const activeKey = useMemo(() => (
    works.find((v) => v.action)?.articleId
  ), [works]);

  const tabsItems = useMemo(() => works.map((work) => ({
    key: work.articleId,
    label: <Tab work={work} />,
    children: <Editor work={work} />,
  })), [works]);

  // 点击 tab 切换事件: 将当前窗口设置为活动窗口
  const handleTabsChange = useCallback((articleId) => {
    dispatch(actions.editor.appendWorks(articleId));
  }, [dispatch]);

  return (
    <div className={scss.work}>
      {works.length > 0 && showWork ? (
        <Tabs
          type="card"
          items={tabsItems}
          activeKey={activeKey}
          onChange={handleTabsChange}
          tabBarExtraContent={<TabBarExtra />}
        />
      ) : (
        <div className={scss.empty}>
          <Icon type="icon-kong" />
        </div>
      )}
    </div>
  );
};
