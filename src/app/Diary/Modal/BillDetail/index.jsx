import React from 'react';

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
      ... ele.bill,
    ]), []);
    console.log('bill ---------->>>>', bill);
  }, [modal]);

  // 取消
  const onCancel = () => dispatch({
    code: STATS_BILL_DETAIL,
    type: 'modal/closeModal',
  });

  return { modal, onCancel, data };
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
      111111
    </Modal>
  );
};
