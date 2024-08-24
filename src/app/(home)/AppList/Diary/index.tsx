import Menu from "./Menu";
import Tips from "./Tips";
import Stats from "./Stats";
import Modal from "./Modal";
import Kanban from "./Kanban";
import Calendar from "./Calendar";
import scss from "./index.module.scss";
import useDiaryStore from "./hooks/useDiaryStore";

import { useMemo } from "react";
import { DIARY_MENU } from "./constants";

// 菜单和组件的映射关系
const MEN_MAP_TO_COMPONENT = {
  [DIARY_MENU.STATS.VALUE]: Stats,
  [DIARY_MENU.CALENDAR.VALUE]: Calendar,
  [DIARY_MENU.PROJECT.VALUE]: Kanban,
};

const Diary = () => {
  const { selectedMenuKey } = useDiaryStore();

  // 构建 body element
  const body = useMemo(() => {
    const Body = MEN_MAP_TO_COMPONENT[selectedMenuKey];
    return Body ? <Body /> : null;
  }, [selectedMenuKey]);

  return (
    <div className={scss.layout}>
      <div className={scss["layout-menu"]}>
        <Menu />
      </div>
      <div className={scss["layout-body"]}>{body}</div>
      <Tips />
      <Modal />
    </div>
  );
};

export default Diary;
