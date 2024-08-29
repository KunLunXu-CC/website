import Tab from "./Tab";
import Editor from "./Editor";
import scss from "./index.module.scss";
import TabBarExtra from "./TabBarExtra";

import { Tabs } from "antd";
import { actions } from "@/store";
import { Icon } from "@kunlunxu/brick";
import { APP_SETTING } from "@/config/constants";
import { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const Work = () => {
  const dispatch = useDispatch();

  const { works } = useSelector((state) => ({
    works: state.editor?.works,
    // showWork: state.app.opens.find(
    //   (v) => v.code === APP_SETTING.EDITOR.code && !v.isMin,
    // ),
  }));

  // 当前选中项
  const activeKey = useMemo(
    () => works.find((v) => v.active)?.articleId,
    [works],
  );

  const tabsItems = useMemo(
    () =>
      works.map((work) => ({
        key: work.articleId,
        label: <Tab work={work} />,
        children: <Editor work={work} />,
      })),
    [works],
  );

  // 点击 tab 切换事件: 将当前窗口设置为活动窗口
  const handleTabsChange = useCallback(
    (articleId) => {
      dispatch(actions.editor.appendWork(articleId));
    },
    [dispatch],
  );

  console.log(
    "%c [ works ]-48",
    "font-size:13px; background:pink; color:#bf2c9f;",
    works,
  );

  return (
    <div className={scss.work}>
      {works.length > 0 ? (
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
