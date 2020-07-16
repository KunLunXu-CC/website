import React from 'react';
import scss from './index.module.scss';

import { Command } from 'gg-editor';
import { Divider, Tooltip } from 'antd';
import { FLOW_COMMAND_LIST, IconFont } from './config';

export default () => (
  <div className={scss.body}>
    {FLOW_COMMAND_LIST.map(({ name, title }, index) => (name === '|' ?
      <Divider key={index} type="vertical" /> :
      <Command
        key={name}
        name={name}
        className={scss.command}
        disabledClassName={scss['command-disabled']}>
        <Tooltip title={title}>
          <IconFont type={`icon-${name}`} />
        </Tooltip>
      </Command>
    ))}
  </div>
);
