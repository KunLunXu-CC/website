import dayjs, { Dayjs } from "dayjs";
import scss from "./index.module.scss";
import useSettingStore from "@/store/useSettingStore";

import { useState, useMemo, useEffect, useRef, FC } from "react";
interface ITargetProps {
  onClick: () => void;
}

// TODO：优化，是否可以放于浏览器进程中
const Target: FC<ITargetProps> = (props) => {
  const { onClick } = props;
  const handleRef = useRef<number>(0);
  const [date, setDate] = useState<Dayjs>();

  const { menuBar } = useSettingStore();

  // 星期
  const week = useMemo(() => {
    if (!menuBar.showWeek || !date) {
      return "";
    }

    return `周${["一", "二", "三", "四", "五", "六", "天"][date.day()]}`;
  }, [date, menuBar.showWeek]);

  // 当前时间
  const time = useMemo(
    () => date?.format(menuBar.formatDate),
    [date, menuBar.formatDate],
  );

  useEffect(() => {
    const loop = () => {
      setDate(dayjs());
      handleRef.current = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(handleRef.current);
  }, []);

  return (
    <div className={scss.wrapper} onClick={onClick}>
      <div className={scss.week}>{week}</div>
      <div className={scss.time}>{time}</div>
    </div>
  );
};

export default Target;
