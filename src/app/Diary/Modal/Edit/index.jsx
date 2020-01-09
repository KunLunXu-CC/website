import React, {
  useMemo,
} from 'react';
import Title from './Title';
import BaseForm from './BaseForm';
import DietForm from './DietForm';
import BillForm from './BillForm';
import FitnessForm from './FitnessForm';
import scss from './index.module.scss';

import { Scroll } from 'qyrc';
import { Drawer, Form } from 'antd';
import { useStore } from '../../store';
import { DIARY_EDIT_FORM } from '../consts';
import { useObserver } from 'mobx-react-lite';

const useStateHook = store => {
  const modal = useMemo(() => (
    store.global.modal.modals[DIARY_EDIT_FORM]
  ), [store.global.modal.modals]);

  const onCancel = () => {
    store.global.modal.close(DIARY_EDIT_FORM);
  };

  return { modal, onCancel };
};

export default Form.create()(props => {
  const store = useStore();
  return useObserver(() => {
    const state = useStateHook(store);
    return (
      <Drawer
        width="90%"
        closable={false}
        placement="right"
        getContainer={false}
        visible={!!state.modal}
        className={scss.drawer}
        onClose={state.onCancel}
        style={{ position: 'absolute' }}
        title={<Title form={props.form}/>}
      >
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
});
