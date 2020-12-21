import React from 'react';
import BillDetail from './BillDetail';
import EditorCalendar from './EditorCalendar';
import scss from './index.module.scss';

export default () => (
  <div className={scss.modal}>
    <EditorCalendar/>
    <BillDetail/>
  </div>
);
