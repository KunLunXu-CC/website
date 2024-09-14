import Tab from './Tab';
import Editor from './Editor';
import scss from './index.module.scss';
import TabBarExtra from './TabBarExtra';
import useWorkspaceStore from '../hooks/useWorkspaceStore';

import { Tabs } from 'antd';
import { memo, useMemo } from 'react';
import { Icon } from '@kunlunxu/brick';

const Work = () => {
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

  return (
    <div className={scss.work}>
      {workspaces.length > 0 ? (
        <Tabs
          type="card"
          items={tabsItems}
          activeKey={activeKey}
          onChange={appendArticleWorkspace}
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
