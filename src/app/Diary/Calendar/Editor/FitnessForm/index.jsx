import React, {
  Fragment,
} from 'react';
import Item from './Item';

import {
  Form,
  Empty,
} from 'antd';
import { Icon } from 'qyrc';

export default props => {
  const { tools: Tools } = props;

  return (
    <Form.List name="fitness">
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
          {fields.length === 0 ? <Empty/> : null}
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
