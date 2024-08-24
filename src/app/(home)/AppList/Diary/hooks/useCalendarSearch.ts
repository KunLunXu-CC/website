import dayjs from "dayjs";
import client from "@/gql/client";
import useCalendarStore from "./useCalendarStore";

import { graphql } from "@/gql";
import { useQuery } from "@tanstack/react-query";
import { CalendarDiariesQuery } from "@/gql/graphql";
import { useEffect } from "react";

graphql(`
  fragment DiaryItem on Diary {
    id
    name
    getUp
    toRest
    informalEssay
    diet {
      type
      desc
    }
    fitness {
      type
      place
    }
    bill {
      tag
      desc
      income
      expend
    }
    bodyIndex {
      bim
      weight
      muscle
      bodyfat
      moistureContent
    }
  }
`);

const CalendarDiariesDocument = graphql(`
  query CalendarDiaries($search: DiarySearch) {
    diaries(search: $search) {
      list {
        ...DiaryItem
      }
    }
  }
`);

// 获取区间内所有时间
const getFullDate = (value: string) => {
  const res = [];

  let start = dayjs(value).startOf("month").subtract(6, "day");

  const end = dayjs(value).endOf("month").add(6, "day");

  while (start.isBefore(end)) {
    start = start.add(1, "day");
    res.push(start.format("YYYY-MM-DD"));
  }

  return res;
};

const useCalendarSearch = () => {
  const { setDiaries, currentMonth } = useCalendarStore();

  const { data } = useQuery<CalendarDiariesQuery>({
    queryKey: ["calendarDiaries", currentMonth],
    queryFn: () =>
      client.request(CalendarDiariesDocument, {
        search: { names: getFullDate(currentMonth) },
      }),
  });

  useEffect(() => {
    setDiaries(data?.diaries.list || []);
  }, [data?.diaries.list, setDiaries]);
};

export default useCalendarSearch;
