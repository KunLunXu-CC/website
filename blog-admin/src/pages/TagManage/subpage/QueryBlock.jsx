import React from 'react';
import { Form, Card, Input, Button } from 'antd';
import { filterObject } from '@utils/helper';

const useStateHook = ({ listHook }) => {
  // 查询
  const onSearch = () => {
    const params = filterObject(form.getFieldsValue(), [null, undefined]);
    listHook.setConds(params);
  };
  return {onSearch};
}

const QueryBlock = (props) => {
  const { onSearch } = useStateHook(props);
  return (
    <Card className="block_first">
      <Form layout="inline">
        <Form.Item>
          {props.form.getFieldDecorator('name')(
            <Input placeholder="标签名" size="large" onPressEnter={onSearch}/>
          )}
        </Form.Item>
        <Form.Item>
          <Button size="large" type="primary" onClick={onSearch} >
            查询
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
export default Form.create({})(QueryBlock);
