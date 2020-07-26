import React from 'react';
import SketchPicker from './SketchPicker';

import { Card, Input } from 'antd';
import { DetailPanel, withEditorContext } from 'gg-editor';

const useStateHook = props => {
  const onHandleSubmit = () => {
    const { type, nodes, edges, executeCommand } = props;

    executeCommand('update', {
      id: nodes[0].get('id'),
      updateModel: {
        label: 'user',
        color: 'red',
      },
    });
  };

  return { onHandleSubmit };
};

export default DetailPanel.create('node')(withEditorContext(props => {
  const state = useStateHook(props);

  return (
    <Card title="节点设置" bordered={false}>
      <Input onBlur={state.onHandleSubmit}/>
      <SketchPicker />
    </Card>
  );
}));
