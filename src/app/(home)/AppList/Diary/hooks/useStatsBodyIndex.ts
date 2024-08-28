import dayjs, { Dayjs } from "dayjs";
import client from "@/gql/client";

import { graphql } from "@/gql";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DiaryStatsBodyIndexQuery } from "@/gql/graphql";

// 获取区间内所有时间
const getFullDate = (date: [Dayjs, Dayjs]) => {
  const res = [];
  const end = date[1].clone();
  let current = date[0].clone();

  while (current.isBefore(end)) {
    res.push(current.format("YYYY-MM-DD"));
    current = current.add(1, "day");
  }

  return res;
};

// 默认日期
const DEFAULT_DATE = [dayjs().subtract(365, "days"), dayjs()] as [Dayjs, Dayjs];

const DiaryStatsBodyIndexDocument = graphql(`
  query DiaryStatsBodyIndex($search: DiarySearch) {
    diaries(search: $search) {
      list {
        name
        bodyIndex {
          weight
          muscle
          moistureContent
          bodyfat
          bim
        }
      }
    }
  }
`);

const useStatsBodyIndex = () => {
  const [date, setDate] = useState<[Dayjs, Dayjs]>(DEFAULT_DATE);

  const { data } = useQuery<DiaryStatsBodyIndexQuery>({
    queryKey: ["diaryStatsBodyIndex", date],
    queryFn: () =>
      client.request(DiaryStatsBodyIndexDocument, {
        search: { names: getFullDate(date) },
      }),
  });

  return {
    date,
    setDate,
    diaries: data?.diaries,
  };
};

export default useStatsBodyIndex;
