import classNames from "classnames";
import scss from "./index.module.scss";
import useDiaryStore from "../hooks/useDiaryStore";

import { Icon } from "@kunlunxu/brick";
import { memo, useCallback } from "react";
import { DIARY_MENU } from "../constants";

// 菜单列表
const MENU_LIST = [DIARY_MENU.CALENDAR, DIARY_MENU.PROJECT, DIARY_MENU.STATS];

const Menu = () => {
  const { selectedMenuKey, setSelectedMenuKey } = useDiaryStore();

  // 获取子菜单 className
  const getMenuItemClassName = useCallback(
    (menuKey: string) =>
      classNames(scss["menu-body-list-item"], {
        [scss["menu-body-list-item-action"]]: menuKey === selectedMenuKey,
      }),
    [selectedMenuKey],
  );

  return (
    <div className={scss.menu}>
      <div className={scss["menu-bg-top"]} />
      <div className={scss["menu-bg-bottom"]} />
      <div className={scss["menu-body"]}>
        <div className={scss["menu-body-list"]}>
          {MENU_LIST.map(({ VALUE, ICON }) => (
            <div
              key={VALUE}
              className={getMenuItemClassName(VALUE)}
              onClick={setSelectedMenuKey.bind(null, VALUE)}
            >
              <Icon type={ICON} />
            </div>
          ))}
        </div>
        <div className={scss["menu-body-footer"]}>
          <div className={scss["menu-body-footer-body"]}>
            <Icon
              type="icon-setting-copy"
              className={scss["menu-body-footer-icon"]}
            />
            更多
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Menu);
