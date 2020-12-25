import React from 'react';

import { Echart } from 'qyrc';
import { Modal, Button } from 'antd';
import { STATS_BILL_DETAIL } from '../../consts';
import { useDispatch, useSelector } from 'react-redux';

const useStateHook = () => {
  const dispatch = useDispatch();
  // 弹窗
  const modal = useSelector(state => state.modal[STATS_BILL_DETAIL]);

  // 数据
  const data = React.useMemo(() => {
    const bill = modal?.diaries.reduce((total, ele) => ([
      ... total,
      ... ele.bill.filter(v => v.expend),
    ]), []);
    const gloup = _.groupBy(bill, 'tag.name');
    const res = [];
    for (const name in gloup) {
      res.push({
        name,
        value: gloup[name].reduce(
          (total, ele) => Math.round(total + ele.expend), 0
        ),
      });
    }
    return res;
  }, [modal]);

  // echart 配置
  const option = React.useMemo(() => ({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      right: 10,
      orient: 'vertical',
      data: data.map(v => v.name),
    },
    series: [
      {
        data,
        type: 'pie',
        name: '账单详情',
        radius: ['60%', '90%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            formatter: '{nameStyle|{b}}\n{valueStyle|{c}}',
            rich: {
              nameStyle: {
                fontSize: 14,
                color: 'rgba(0, 0, 0, 0.6)',
              },
              valueStyle: {
                fontSize: 20,
                padding: [8, 0, 0, 0],
                color: 'rgba(0, 0, 0, 0.8)',
              },
            },
          },
        },
        labelLine: {
          show: false,
        },
      },
    ],
  }), [data]);

  // 取消
  const onCancel = () => dispatch({
    code: STATS_BILL_DETAIL,
    type: 'modal/closeModal',
  });

  return { modal, onCancel, data, option };
};

export default () => {
  const state = useStateHook();
  return (
    <Modal
      width="50%"
      title="账单详情"
      destroyOnClose
      closable={false}
      getContainer={false}
      visible={!!state.modal}
      footer={<Button onClick={state.onCancel} type="primary">关闭</Button>}>
      <Echart height={300} option={state.option}/>
    </Modal>
  );
};
