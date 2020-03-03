import React, {
  Fragment,
} from 'react';
import Item from './Item';

import { Icon } from 'qyrc';
import { Form } from 'antd';

export default props => {
  const { tools: Tools } = props;

  return (
    <Form.List name="bill">
      {(fields, { add, remove }) => (
        <Fragment>
          {fields.map(field => (
            <Item
              field={field}
              remove={remove}
              key={field.key}
              form={props.form}
            />
          ))}
          {props.showTools ?
            <Tools>
              <Icon
                type="icon-xinzeng"
                onClick={add.bind(null, null)}
              />
            </Tools> : null}
        </Fragment>
      )}
    </Form.List>
  );
};
