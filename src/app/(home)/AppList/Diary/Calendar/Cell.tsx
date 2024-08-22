import dayjs from "dayjs";
import scss from "./cell.module.scss";

import { actions } from "@/store";
import { Icon } from "@kunlunxu/brick";
import { useMemo, useCallback, memo } from "react";
import { DIARY_EDITOR_DIARY } from "../constants";
import { useSelector, useDispatch } from "react-redux";

const Cell = (props) => {
  const { diaries = [] } = useSelector((state) => state.diary);
  const dispatch = useDispatch();

  // 日期
  const date = useMemo(() => dayjs(props.date).date(), [props.date]);

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
        .reduce((total, ele) => total + ele.expend || 0, 0)
        .toFixed(1),
    [diary],
  );

  // 点击单元格
  const handleClick = useCallback(() => {
    dispatch(
      actions.modal.open({
        diary,
        date: props.date,
        code: DIARY_EDITOR_DIARY,
      }),
    );
  }, [props.date, diary, dispatch]);

  return (
    <div className={scss.cell} onClick={handleClick}>
      <div className={scss.date}>{date}</div>
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
