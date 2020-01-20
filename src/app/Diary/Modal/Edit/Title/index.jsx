import React from 'react';
import scss from './index.module.scss';

import { Button } from 'antd';
import { DIARY_EDIT_FORM } from '../../consts';
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

  // 获取 body
  const getBody = values => {
    const {
      name,
      getUp,
      toRest,
      bodyIndex,
      bill = [],
      diet = [],
      fitness = [],
    } = values;
    return {
      getUp,
      toRest,
      bodyIndex,
      bill: bill.filter(v => v),
      diet: diet.filter(v => v),
      fitness: fitness.filter(v => v),
      name: name.format('YYYY-MM-DD'),
    };
  };

  // 保存
  const onSave = () => {
    props.form.validateFieldsAndScroll(async (error, values) => {
      if (error) {
        return false;
      }
      const id = _.get(modal, 'data.id');
      const body = getBody(values);
      dispatch({
        id,
        body,
        type: id ? 'diary/updateDiaries' : 'diary/createDiarie',
      });
      onCancel();
    });
  };

  return { modal, onCancel, onSave };
};

export default props => {
  const state = useStateHook(props);
  return (
    <div className={scss.title}>
      <div className={scss.text}>
        {_.get(state, 'modal.title')}
      </div>
      <Button type="primary" onClick={state.onSave}>保存</Button>
      <Button onClick={state.onCancel}>关闭</Button>
    </div>
  );
};
