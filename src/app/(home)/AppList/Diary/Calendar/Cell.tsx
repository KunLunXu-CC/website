import dayjs from "dayjs";
import scss from "./cell.module.scss";
import useCalendarStore from "../hooks/useCalendarStore";
import useDisclosureStore from "@/store/useDisclosureStore";

import { Icon } from "@kunlunxu/brick";
import { DIARY_EDITOR_DIARY } from "../constants";
import { useMemo, useCallback, memo, FC } from "react";

interface ICellProps {
  date: dayjs.Dayjs;
}

const Cell: FC<ICellProps> = (props) => {
  const { date } = props;

  const { onOpen } = useDisclosureStore();
  const { diaries = [] } = useCalendarStore();

  // 当天笔记
  const diary = useMemo(
    () => diaries.find((v) => v.name === props.date.format("YYYY-MM-DD")),
    [diaries, props.date],
  );

  // 体重
  const weight = useMemo(() => diary?.bodyIndex?.weight ?? "---", [diary]);

  // 花销
  const expenses = useMemo(
    () =>
      (diary?.bill ?? [])
        .reduce((total, ele) => total + (ele?.expend || 0), 0)
        .toFixed(1),
    [diary],
  );

  // 点击单元格
  const handleClick = useCallback(() => {
    onOpen(DIARY_EDITOR_DIARY, { diary, date });
  }, [date, diary, onOpen]);

  return (
    <div className={scss.cell} onClick={handleClick}>
      <div className={scss.date}>{date.date()}</div>
      {diary ? (
        <div className={scss.stats}>
          <div className={scss["stats-item"]}>
            {expenses}
            <Icon type="icon-dingdanjine" />
          </div>
          <div className={scss["stats-item"]}>
            {weight}
            <Icon type="icon-ccgl-chengzhongsaomiao-5" />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default memo(Cell);
