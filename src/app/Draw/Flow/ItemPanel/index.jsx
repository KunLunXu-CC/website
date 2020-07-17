import React from 'react';
import scss from './index.module.scss';
import config from './config';
import { Item, ItemPanel } from 'gg-editor';

export default () => (
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
);
