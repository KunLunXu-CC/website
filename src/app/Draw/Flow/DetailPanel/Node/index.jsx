import React from 'react';
import ColorPicker from '../../../ColorPicker';

import { Card, Input, Form, Slider } from 'antd';
import { DetailPanel, withEditorContext } from 'gg-editor';

const useStateHook = props => {
  // 修改 model
  const onUpdateModel = model => {
    const { nodes, executeCommand } = props;
    executeCommand('update', {
      id: nodes[0].get('id'),
      updateModel: model,
    });
  };

  // 修改 label
  const onChangeLabel = event => {
    onUpdateModel({ label: event.target.value });
  };

  // 修改颜色
  const onChangeColor = color => {
    onUpdateModel({ color });
  };

  // 修改大小
  const onChangeSize = (key, value) => {
    onUpdateModel({ [key]: value });
  };

  return { onChangeLabel, onChangeColor, onChangeSize };
};

export default DetailPanel.create('node')(withEditorContext(props => {
  const state = useStateHook(props);
  const { model = {}, id } = props.nodes[0] ?. _cfg ?? {};
  return (
    <Card title="节点设置" bordered={false} key={id}>
      <Form.Item label="宽度">
        <Slider
          min={20}
          max={300}
          defaultValue={model.width}
          onChange={state.onChangeSize.bind(null, 'width')}
        />
      </Form.Item>
      <Form.Item label="高度">
        <Slider
          min={20}
          max={300}
          defaultValue={model.height}
          onChange={state.onChangeSize.bind(null, 'height')}
        />
      </Form.Item>
      <Form.Item label="文字">
        <Input
          defaultValue={model.label}
          onBlur={state.onChangeLabel}
        />
      </Form.Item>
      <Form.Item label="颜色">
        <ColorPicker
          defaultColor={model.color}
          onChange={state.onChangeColor}
        />
      </Form.Item>
    </Card>
  );
}));
