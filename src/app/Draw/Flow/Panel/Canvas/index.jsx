import React from 'react';

import { Card } from 'antd';
import { DetailPanel, withEditorContext } from 'gg-editor';


export default DetailPanel.create('canvas')(withEditorContext(() => (
  <Card title="画布设置" bordered={false}>
    canvas
  </Card>
)));
