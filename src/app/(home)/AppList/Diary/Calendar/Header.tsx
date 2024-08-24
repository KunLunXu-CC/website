import dayjs from "dayjs";
import scss from "./header.module.scss";
import useCalendarStore from "../hooks/useCalendarStore";

import { Input } from "antd";
import { Icon } from "@kunlunxu/brick";
import {
  memo,
  useEffect,
  ChangeEvent,
  useCallback,
  KeyboardEvent,
} from "react";

interface IHeaderProps {
  value: dayjs.Dayjs;
  onChange: (value: dayjs.Dayjs) => void;
}

const Header = (props: IHeaderProps) => {
  const { value: outerValue, onChange: outerOnChange } = props;
  const { currentMonth, setCurrentMonth } = useCalendarStore();

  // 切换面板: 1 下一个月, -1 上一个月, event 读取输入框值
  const handleChange = useCallback(
    (value: 1 | -1 | KeyboardEvent<HTMLInputElement>) => {
      if (value === 1) {
        outerOnChange(outerValue.clone().add(1, "months"));
      } else if (value === -1) {
        outerOnChange(outerValue.clone().subtract(1, "months"));
      } else {
        const time = `${(value.target as HTMLInputElement).value}-${outerValue.format("DD")}`;
        outerOnChange(dayjs(time));
      }
    },
    [outerOnChange, outerValue],
  );

  const handleChangeValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setCurrentMonth(event.target.value);
    },
    [setCurrentMonth],
  );

  useEffect(() => {
    setCurrentMonth(outerValue.format("YYYY-MM"));
  }, [outerValue, setCurrentMonth]);

  return (
    <div className={scss.header}>
      <div
        onClick={handleChange.bind(null, -1)}
        className={`${scss.arrow} ${scss["arrow-left"]}`}
      >
        <Icon type="icon-jiantou" />
      </div>
      <div className={scss["input-fied"]}>
        <Input
          value={currentMonth}
          onPressEnter={handleChange}
          onChange={handleChangeValue}
        />
      </div>
      <div
        onClick={handleChange.bind(null, 1)}
        className={`${scss.arrow} ${scss["arrow-right"]}`}
      >
        <Icon type="icon-jiantou" />
      </div>
    </div>
  );
};

export default memo(Header);
