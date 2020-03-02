import React, {
  Fragment,
} from 'react';
import Cell from './Cell';
import Header from './Header';
import Editor from './Editor';
import scss from './index.module.scss';

import { Calendar } from 'antd';
import { useDispatch } from 'react-redux';
import { DIARY_EDITOR_DIARY } from '../consts';

const useStateHook = () => {
  const dispatch = useDispatch();

  // 选择日期时
  const onSelect = date => {
    dispatch({
      date,
      type: 'modal/openModal',
      code: DIARY_EDITOR_DIARY,
    });
  };

  return { onSelect };
};

export default () => {
  const state = useStateHook();

  return (
    <Fragment>
      <Calendar
        onSelect={state.onSelect}
        className={scss.calendar}
        dateFullCellRender={date => <Cell date={date}/>}
        headerRender={params => (<Header {... params}/>)}
      />
      <Editor/>
    </Fragment>
  );
};
