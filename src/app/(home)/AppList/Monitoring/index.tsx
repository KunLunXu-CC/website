import { useMemo } from "react";
import { MENU_OPTIONS } from "./constants";

import classNames from "classnames";
import scss from "./index.module.scss";
import useMonitoringStore from "./hooks/useMonitoringStore";

const Monitoring = () => {
  const { activeMenuKey, setActiveMenuKey } = useMonitoringStore();

  const { bg, body: Body } = useMemo(
    () => MENU_OPTIONS.find((v) => v.key === activeMenuKey)!,
    [activeMenuKey],
  );

  return (
    <div className={scss.logger}>
      {/* 左侧菜单 */}
      <div className={scss.side} style={{ background: bg.side }}>
        {MENU_OPTIONS.map((v) => (
          <div
            key={v.key}
            className={classNames(scss["menu-item"], {
              [scss["active-mene"]]: v.key === activeMenuKey,
            })}
            onClick={setActiveMenuKey.bind(null, v.key)}
          >
            {v.title}
          </div>
        ))}
      </div>

      {/* 右侧内容 */}
      <div className={scss.body} style={{ background: bg.body }}>
        <Body />
      </div>
    </div>
  );
};

export default Monitoring;
