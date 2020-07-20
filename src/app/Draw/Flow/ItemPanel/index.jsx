import React from 'react';
import scss from './index.module.scss';
import config from './config';

import { Card } from 'antd';
import { Item, ItemPanel } from 'gg-editor';

export default () => (
  <Card title="节点选择" bordered={false}>
    <ItemPanel className={scss['item-panel']}>
      {config.map(({ icon, ... rest }, index) => (
        <Item
          {... rest}
          key={index}
          className={scss.item}>
          <img src={icon} draggable={false}/>
        </Item>
      ))}
    </ItemPanel>
  </Card>
);
