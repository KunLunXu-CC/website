import Menu from "./Menu";
import Header from "./Header";
import scss from "./index.module.scss";
import useSettingStore from "@/store/useSettingStore";

import { MENUS } from "./constants";
import { memo, useMemo } from "react";

const Setting = () => {
  const { selectedMenuKey } = useSettingStore();

  // 获取 body 组件
  const Body = useMemo(
    () => MENUS.find((v) => v.key === selectedMenuKey)!.component,
    [selectedMenuKey],
  );

  return (
    <div className={scss.setting}>
      <Header />
      <div className={scss.main}>
        <Menu />
        <div className={scss.body}>
          <Body />
        </div>
      </div>
    </div>
  );
};

export default memo(Setting);
