import React from 'react';

import { Card } from 'antd';
import { DetailPanel, withEditorContext } from 'gg-editor';


export default DetailPanel.create('edge')(withEditorContext(() => (
  <Card title="连线设置" bordered={false}>
    edge
  </Card>
)));
