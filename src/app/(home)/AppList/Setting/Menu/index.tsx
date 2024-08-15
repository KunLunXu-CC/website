import classNames from "classnames";
import scss from "./index.module.scss";
import useSettingStore from "@/store/useSettingStore";

import { memo } from "react";
import { MENUS } from "../constants";

const Menu = () => {
  const { toggleMenu, selectedMenuKey } = useSettingStore();

  return (
    <div className={scss.menu}>
      {MENUS.map((v) => (
        <div
          key={v.key}
          onClick={() => toggleMenu(v.key)}
          className={classNames(scss.item, {
            [scss.selected]: selectedMenuKey === v.key,
          })}
        >
          {v.title}
        </div>
      ))}
    </div>
  );
};

export default memo(Menu);
