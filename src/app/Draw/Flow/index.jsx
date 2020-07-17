import React from 'react';
import Command from './Command';
import ItemPanel from './ItemPanel';
import scss from './index.module.scss';
import DetailPanel from './DetailPanel';
import GGEditor, { Flow } from 'gg-editor';

const data = {
  nodes: [
    {
      id: '0',
      label: 'Node',
      x: 55,
      y: 55,
    },
    {
      id: '1',
      label: 'Node',
      x: 55,
      y: 255,
    },
  ],
  edges: [
    {
      label: 'Label',
      source: '0',
      target: '1',
    },
  ],
};

export default () => (
  <GGEditor className={scss.flow}>
    <div className={scss.main}>
      <Command/>
      <div className={scss.work}>
        <Flow data={data} className={scss.content}/>
      </div>
    </div>
    <DetailPanel><ItemPanel/></DetailPanel>
  </GGEditor>
);
