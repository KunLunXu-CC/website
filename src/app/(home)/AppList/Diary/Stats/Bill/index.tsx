import clsx from "clsx";
import Line from "./Line";
import Overview from "./Overview";
import scss from "./index.module.scss";
import useBillStats from "../../hooks/useStatsBill";

import { Card } from "antd";
import { memo } from "react";
import { STATS_SPAN_OPTS } from "../../constants";
import { STATS_SPAN_VALUE } from "../../types";

const Bill = () => {
  const { span, onToggleSpan, statsBill } = useBillStats();

  return (
    <Card
      bordered={false}
      title="历史收入 / 支出"
      className={scss.card}
      extra={
        <div className={scss["header-btn"]}>
          {Object.entries(STATS_SPAN_OPTS).map(([key, opts]) => (
            <div
              key={key}
              className={clsx(scss["header-btn"], {
                [scss["header-btn-action"]]: span === key,
              })}
              onClick={onToggleSpan.bind(null, key as STATS_SPAN_VALUE)}
            >
              {opts.desc}
            </div>
          ))}
        </div>
      }
    >
      <Overview data={statsBill?.stats} />
      <Line data={statsBill?.groupWithName} />
    </Card>
  );
};

export default memo(Bill);
