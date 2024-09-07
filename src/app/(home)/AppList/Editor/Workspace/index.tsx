import Tab from './Tab';
import Editor from './Editor';
import scss from './index.module.scss';
import TabBarExtra from './TabBarExtra';
import useWorkspaceStore from '../hooks/useWorkspaceStore';

import { Tabs } from 'antd';
import { actions } from '@/store';
import { Icon } from '@kunlunxu/brick';
import { APP_SETTING } from '@/config/constants';
import { memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Work = () => {
  const dispatch = useDispatch();
  const { workspaces, appendArticleWorkspace } = useWorkspaceStore();

  // 当前选中项
  const activeKey = useMemo(() => workspaces.find((v) => v.active)?.dataId, [workspaces]);

  const tabsItems = useMemo(
    () =>
      workspaces.map((workspace) => ({
        key: workspace.dataId,
        label: <Tab workspace={workspace} />,
        children: <Editor workspace={workspace} />,
      })),
    [workspaces],
  );

  // 点击 tab 切换事件: 将当前窗口设置为活动窗口
  const handleTabsChange = useCallback(
    (articleId) => {
      dispatch(actions.editor.appendWork(articleId));
    },
    [dispatch],
  );

  console.log('%c [ works ]-48', 'font-size:13px; background:pink; color:#bf2c9f;', workspaces);

  return (
    <div className={scss.work}>
      {workspaces.length > 0 ? (
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

export default memo(Work);
