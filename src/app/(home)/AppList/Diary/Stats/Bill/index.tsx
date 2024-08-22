import dayjs from "dayjs";
import ECharts from "./ECharts";
import Overview from "./Overview";
import classNames from "classnames";
import scss from "./index.module.scss";

import { Card } from "antd";
import { useDispatch } from "react-redux";
import { STATS_SPAN } from "../../constants";
import { useState, useEffect, memo } from "react";
import { useGetStatsBillQuery } from "@/store/graphql";

// span 和 name 映射表
const SPAN_MAP_NAME = {
  [STATS_SPAN.MONTH.VALUE]: [
    dayjs().startOf("month").subtract(12, "months").format("YYYY-MM-DD"),
    dayjs().endOf("month").format("YYYY-MM-DD"),
  ],
  [STATS_SPAN.YEAR.VALUE]: [
    dayjs().subtract(10, "years").startOf("years").format("YYYY-MM-DD"),
    dayjs().endOf("years").format("YYYY-MM-DD"),
  ],
};

const Bill = () => {
  const [span, setSpan] = useState(STATS_SPAN.MONTH.VALUE);

  const { data } = useGetStatsBillQuery({
    search: {
      span,
      name: SPAN_MAP_NAME[span],
    },
  });

  const dispatch = useDispatch();

  // 切换
  const onToggleSpan = (span) => {
    setSpan(span);
  };

  // 获取按钮 classNam
  const getBtnClassName = (value) =>
    classNames(scss["header-btn"], {
      [scss["header-btn-action"]]: span === value,
    });

  // 监听 span 的变化并查询数据
  useEffect(() => {
    dispatch({
      type: "diary/getStatsBill",
      search: {
        span,
        name: SPAN_MAP_NAME[span],
      },
    });
  }, [span]);

  return (
    <Card
      bordered={false}
      title="历史收入 / 支出"
      className={scss.card}
      extra={
        <div className={scss["header-btn"]}>
          {Object.values(STATS_SPAN).map((v) => (
            <div
              key={v.VALUE}
              className={getBtnClassName(v.VALUE)}
              onClick={onToggleSpan.bind(null, v.VALUE)}
            >
              {v.DESC}
            </div>
          ))}
        </div>
      }
    >
      <Overview data={data?.statsBill.stats} />
      <ECharts data={data?.statsBill.groupWithName} />
    </Card>
  );
};

export default memo(Bill);
