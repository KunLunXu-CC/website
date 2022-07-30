import Item from './Item';

import { Icon } from '@kunlunxu/brick';
import { Form, Empty } from 'antd';

export default (props) => {
  const { tools: Tools } = props;

  return (
    <Form.List name="bill">
      {(fields, { add, remove }) => (
        <>
          {fields.map((field) => (
            <Item
              field={field}
              remove={remove}
              key={field.key}
              form={props.form}
            />
          ))}
          {fields.length === 0 ? <Empty /> : null}
          {props.showTools ? (
            <Tools>
              <Icon
                type="icon-xinzeng"
                onClick={add.bind(null, null)}
              />
            </Tools>
          ) : null}
        </>
      )}
    </Form.List>
  );
};
