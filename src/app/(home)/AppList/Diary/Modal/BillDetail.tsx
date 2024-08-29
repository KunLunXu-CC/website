import useBillDetailModalStore from "../hooks/useBillDetailModalStore";

import { groupBy } from "lodash";
import { ECharts } from "@kunlunxu/brick";
import { DiaryItemFragment } from "@/gql/graphql";
import { FC, memo, RefObject, useMemo } from "react";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";

interface IBillDetailProps {
  modalRef: RefObject<HTMLDivElement>;
}

const BillDetail: FC<IBillDetailProps> = (props) => {
  const { modalRef } = props;

  const { data: diaries, onOpenChange, isOpen } = useBillDetailModalStore();

  // TODO: 处理数据
  const data = useMemo(() => {
    const bill = diaries?.reduce<DiaryItemFragment["bill"]>(
      (total, ele) => [...total, ...ele.bill.filter((v) => v.expend)],
      [],
    );

    const group = groupBy(bill, "tag.name");
    const res = [];

    for (const name in group) {
      res.push({
        name,
        value: group[name].reduce(
          (total, ele) => Math.round(total + ele.expend),
          0,
        ),
      });
    }

    return res;
  }, [diaries]);

  // echarts 配置
  const option = useMemo(
    () => ({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        right: 10,
        orient: "vertical",
        data: data.map((v) => v.name),
      },
      series: [
        {
          data,
          type: "pie",
          name: "账单详情",
          radius: ["40%", "70%"],
          center: ["50%", "50%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              formatter: "{nameStyle|{b}}\n{valueStyle|{c}}",
              rich: {
                nameStyle: {
                  fontSize: 14,
                  color: "rgba(0, 0, 0, 0.6)",
                },
                valueStyle: {
                  fontSize: 20,
                  padding: [8, 0, 0, 0],
                  color: "rgba(0, 0, 0, 0.8)",
                },
              },
            },
          },
          labelLine: {
            show: false,
          },
        },
      ],
    }),
    [data],
  );

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      portalContainer={modalRef.current!}
      classNames={{
        wrapper: "absolute !size-full",
        backdrop: "absolute !size-full",
      }}
    >
      <ModalContent>
        <ModalBody>
          <ECharts height={300} option={option} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default memo(BillDetail);
