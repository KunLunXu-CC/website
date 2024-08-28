import { Dayjs } from "dayjs";
import Line from "./Line";
import scss from "./index.module.scss";
import useStatsBodyIndex from "../../hooks/useStatsBodyIndex";

import { memo } from "react";
import { DatePicker, Card } from "antd";

const BodyIndex = () => {
  const { diaries, date, setDate } = useStatsBodyIndex();

  return (
    <Card
      bordered={false}
      title="身体体征曲线图"
      className={scss.card}
      extra={
        <DatePicker.RangePicker
          value={date}
          bordered={false}
          onChange={(dates) => setDate(dates as [Dayjs, Dayjs])}
        />
      }
    >
      <Line data={diaries?.list ?? []} />
    </Card>
  );
};

export default memo(BodyIndex);
