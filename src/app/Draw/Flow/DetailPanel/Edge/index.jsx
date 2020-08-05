import React from 'react';

import { Card, Form, Input } from 'antd';
import { DetailPanel, withEditorContext } from 'gg-editor';

const useStateHook = props => {
  // 修改 model
  const onUpdateModel = model => {
    const { edges, executeCommand } = props;
    executeCommand('update', {
      id: edges[0].get('id'),
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

  return { onChangeLabel, onChangeColor };
};


export default DetailPanel.create('edge')(withEditorContext(props => {
  const state = useStateHook(props);
  const { model = {}, id } = props.edges[0] ?. _cfg ?? {};

  return (
    <Card title="连线设置" bordered={false} key={id}>
      <Form.Item label="文字">
        <Input
          defaultValue={model.label}
          onBlur={state.onChangeLabel}
        />
      </Form.Item>
    </Card>
  );
}));
