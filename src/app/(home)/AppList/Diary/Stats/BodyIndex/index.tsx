import dayjs from "dayjs";
import ECharts from "./ECharts";
import scss from "./index.module.scss";

import { memo, useState } from "react";
import { DatePicker, Card } from "antd";
import { useGetStatsBodyIndexQuery } from "@/store/graphql";

// 默认日期
const DEFAULT_DATE = [dayjs().subtract(365, "days"), dayjs()];

// 获取区间内所有时间
const getFullDate = ([start, end]) => {
  const res = [];
  let current = start.clone();

  while (current.isBefore(end)) {
    res.push(current.format("YYYY-MM-DD"));
    current = current.add(1, "day");
  }

  return res;
};

const BodyIndex = () => {
  const [date, setDate] = useState(DEFAULT_DATE);

  const { data } = useGetStatsBodyIndexQuery({
    search: { names: getFullDate(date) },
  });

  return (
    <Card
      bordered={false}
      title="身体体征曲线图"
      className={scss.card}
      extra={
        <DatePicker.RangePicker
          bordered={false}
          onChange={setDate}
          defaultValue={DEFAULT_DATE}
        />
      }
    >
      <ECharts data={data?.diaries.list ?? []} />
    </Card>
  );
};

export default memo(BodyIndex);
