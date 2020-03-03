import React, {
  Fragment,
} from 'react';
import Cell from './Cell';
import Header from './Header';
import Editor from './Editor';
import scss from './index.module.scss';

import { Calendar } from 'antd';

export default () => (
  <Fragment>
    <Calendar
      className={scss.calendar}
      dateFullCellRender={date => <Cell date={date}/>}
      headerRender={params => (<Header {... params}/>)}
    />
    <Editor/>
  </Fragment>
);
