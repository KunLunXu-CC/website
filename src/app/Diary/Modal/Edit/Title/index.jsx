import React, {
  useMemo,
} from 'react';
import _ from 'lodash';
import scss from './index.module.scss';

import { Button } from 'antd';
import { useStore } from '../../../store';
import { DIARY_EDIT_FORM } from '../../consts';
import { useObserver } from 'mobx-react-lite';

const useStateHook = (props, store) => {
  const modal = useMemo(() => (
    store.global.modal.modals[DIARY_EDIT_FORM]
  ), [store.global.modal.modals]);

  // 取消亦或关闭
  const onCancel = () => {
    store.global.modal.close(DIARY_EDIT_FORM);
  };

  // 保存
  const onSave = () => {
    props.form.validateFieldsAndScroll((error, values) => {
      if (error) {
        return false;
      }
      console.log('-------------->>>>>', values);
    });
  };

  return { modal, onCancel, onSave };
};

export default props => {
  const store = useStore();
  return useObserver(() => {
    const state = useStateHook(props, store);
    return (
      <div className={scss.title}>
        <div className={scss.text}>
          {_.get(state, 'modal.title')}
        </div>
        <Button type="primary" onClick={state.onSave}>保存</Button>
        <Button onClick={state.onCancel}>关闭</Button>
      </div>
    );
  });
};
