import React from 'react';

import { Card } from 'antd';
import { DetailPanel, withEditorContext } from 'gg-editor';


export default DetailPanel.create('multi')(withEditorContext(() => (
  <Card title="节点设置" bordered={false}>
    multi
  </Card>
)));
