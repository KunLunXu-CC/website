import React from 'react';

import { Card } from 'antd';
import { DetailPanel, withEditorContext } from 'gg-editor';


export default DetailPanel.create('node')(withEditorContext(() => (
  <Card title="节点设置" bordered={false}>
    node
  </Card>
)));
