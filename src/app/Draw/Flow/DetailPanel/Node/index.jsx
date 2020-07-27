import React from 'react';
import ColorPicker from './ColorPicker';

import { Card, Input } from 'antd';
import { DetailPanel, withEditorContext } from 'gg-editor';

const useStateHook = props => {
  // 修改 model
  const onUpdateModel = model => {
    const { nodes, executeCommand } = props;
    console.log(nodes)
    executeCommand('update', {
      id: nodes[0].get('id'),
      updateModel: model,
    });
  };

  // 修改 label
  const onChangeLabel = () => {
    onUpdateModel({ label: 'user' });
  };

  // 修改颜色
  const onChangeColor = color => {
    onUpdateModel({ color });
  };

  return { onChangeLabel, onChangeColor };
};

export default DetailPanel.create('node')(withEditorContext(props => {
  const state = useStateHook(props);

  return (
    <Card title="节点设置" bordered={false}>
      <Input onBlur={state.onChangeLabel}/>
      <ColorPicker
        onChange={state.onChangeColor}
        defaultColor={props.nodes[0]?._cfg.model.color}/>
    </Card>
  );
}));
