import React from 'react';
import { Icon } from 'qyrc';
import { Dropdown } from 'antd';

import Overlay from './Overlay';
import scss from './index.module.scss';

export default () => (
  <Dropdown
    trigger={['click']}
    overlay={<Overlay/>}>
    <span className={scss.dropown}>
      <Icon type="icon-caidan"/>
    </span>
  </Dropdown>
);
