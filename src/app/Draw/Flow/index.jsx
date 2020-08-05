import React from 'react';
import Command from './Command';
import ItemPanel from './ItemPanel';
import scss from './index.module.scss';
import DetailPanel from './DetailPanel';
import RegisterNode from './RegisterNode';
import GGEditor, { Flow } from 'gg-editor';
import G6 from '@antv/g6';

const data = {
  nodes: [

  ],
  edges: [

  ],
};

export default () => (
  <GGEditor className={scss.flow} grid="line">
    <div className={scss.main}>
      <Command/>
      <div className={scss.work}>
        <Flow
          data={data}
          graphConfig={{
            plugins: [new G6.Grid()],
          }}
          className={scss.content}/>
      </div>
    </div>
    <div className={scss.detail}>
      <DetailPanel/>
      <ItemPanel/>
    </div>
    <RegisterNode/>
  </GGEditor>
);
