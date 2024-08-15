import classNames from "classnames";
import scss from "./list.module.scss";
import styled from "styled-components";
import apps from "@/app/(home)/AppList/config";
import useSettingStore from "@/store/useSettingStore";

import { isNumber, isFunction } from "lodash";
import { useState, useCallback, useMemo, memo } from "react";

const DockApp = styled.div`
  --scale: ${({ index, currentIndex }) => {
    const defaultValue = 1;

    if (!isNumber(currentIndex)) {
      return defaultValue;
    }

    const mapIndex = 2 - Math.abs(currentIndex - index);
    return [1.1, 1.2, 1.3]?.[mapIndex] || defaultValue;
  }};
`;

const List = (props) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const { dock } = useSettingStore();

  // 点击事件
  const handleClick = useCallback(
    (dock) => {
      isFunction(props.onClick) && props.onClick(dock);
    },
    [props],
  );

  // 最外层容器 className
  const className = useMemo(
    () => classNames(scss.dock, { [scss["dock-auto-hiding"]]: dock.hideDock }),
    [dock.hideDock],
  );

  return (
    <div className={className}>
      <div className={scss["dock-body"]}>
        {props.dataSource.map((v, index) => (
          <DockApp
            index={index}
            key={v.code || index}
            className={scss["dock-app"]}
            currentIndex={currentIndex}
            onClick={handleClick.bind(null, v)}
            onMouseLeave={setCurrentIndex.bind(null, null)}
            onMouseEnter={setCurrentIndex.bind(null, index)}
          >
            <div className={scss["dock-tooltip"]}>{apps[v.code].name}</div>
            <img
              src={apps[v.code].icon}
              alt={apps[v.code].name}
              className={scss["dock-icon"]}
            />
          </DockApp>
        ))}
      </div>
    </div>
  );
};

export default memo(List);
