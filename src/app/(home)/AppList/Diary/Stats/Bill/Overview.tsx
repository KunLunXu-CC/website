import scss from "./overview.module.scss";

import { FC, memo, useMemo } from "react";
import { DiaryStatsBillQuery } from "@/gql/graphql";

interface IOverviewProps {
  data?: DiaryStatsBillQuery["statsBill"]["stats"];
}

const Overview: FC<IOverviewProps> = ({ data }) => {
  // 总览
  const overview = useMemo(() => {
    const income = data?.income ?? 0;
    const expend = data?.expend ?? 0;

    return [
      { label: "总收入", value: income },
      { label: "总支出", value: expend },
      { label: "总盈余", value: income - expend },
    ];
  }, [data]);

  return (
    <div className={scss.overview}>
      {overview.map((v) => (
        <div key={v.label} className={scss["overview-item"]}>
          <div className={scss["overview-label"]}>{v.label}</div>
          <div className={scss["overview-value"]}>
            ¥{(v.value || 0).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(Overview);
