import client from "@/gql/client";

import { graphql } from "@/gql";
import { STATS_SPAN_VALUE } from "../types";
import { useCallback, useState } from "react";
import { STATS_SPAN_OPTS } from "../constants";
import { useQuery } from "@tanstack/react-query";
import { DiaryStatsBillQuery } from "@/gql/graphql";

const DiaryStatsBillDocument = graphql(`
  query DiaryStatsBill($search: StatsBillSearch) {
    statsBill(search: $search) {
      stats {
        income
        expend
      }
      groupWithName {
        name
        income
        expend
        diaries {
          name
          bill {
            desc
            income
            expend
            tag
          }
        }
      }
    }
  }
`);

const useBillStats = () => {
  const [span, setSpan] = useState<STATS_SPAN_VALUE>(STATS_SPAN_VALUE.MONTH);

  const { data } = useQuery<DiaryStatsBillQuery>({
    queryKey: ["diaryStatsBill", span],
    queryFn: () =>
      client.request(DiaryStatsBillDocument, {
        search: { span, name: STATS_SPAN_OPTS[span].conds },
      }),
  });

  const onToggleSpan = useCallback((span: STATS_SPAN_VALUE) => {
    setSpan(span);
  }, []);

  return {
    span,
    onToggleSpan,
    statsBill: data?.statsBill,
  };
};

export default useBillStats;
