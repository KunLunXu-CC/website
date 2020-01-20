import React from 'react';
import Title from './Title';
import BaseForm from './BaseForm';
import DietForm from './DietForm';
import BillForm from './BillForm';
import FitnessForm from './FitnessForm';
import scss from './index.module.scss';

import { Scroll } from 'qyrc';
import { Drawer, Form } from 'antd';
import { DIARY_EDIT_FORM } from '../consts';
import { useDispatch, useSelector } from 'react-redux';

const useStateHook = props => {
  const dispatch = useDispatch();

  const modal = useSelector(
    state => _.get(state, `modal.${DIARY_EDIT_FORM}`)
  );

  const onCancel = () => {
    dispatch({
      type: 'modal/closeModal',
      code: DIARY_EDIT_FORM,
    });
    props.form.resetFields();
  };

  return { modal, onCancel };
};

export default Form.create()(props => {
  const state = useStateHook(props);
  return (
    <Drawer
      width="90%"
      destroyOnClose
      closable={false}
      placement="right"
      getContainer={false}
      visible={!!state.modal}
      className={scss.drawer}
      onClose={state.onCancel}
      style={{ position: 'absolute' }}
      title={<Title form={props.form} />}>
      <div className={scss['drawer-content']}>
        <Scroll className={scss.scroll}>
          <BaseForm modal={state.modal} form={props.form}/>
          <DietForm modal={state.modal} form={props.form}/>
          <FitnessForm modal={state.modal} form={props.form}/>
          <BillForm modal={state.modal} form={props.form}/>
          <br/><br/>
        </Scroll>
      </div>
    </Drawer>
  );
});
