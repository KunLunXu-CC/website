import React from 'react';
import Panel from './Panel';
import Command from './Command';
import scss from './index.module.scss';
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
    <Panel/>
  </GGEditor>
);
