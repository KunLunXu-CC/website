import React from 'react';

import { Markdown } from 'qyrc';
import { SERVICE_STATIC_IMAGE_URL } from '@config/consts';

const options = {
  overrides: {
    img: {
      component: props => (<img src={ /http/.test(props.src)
        ? props.src
        : `${SERVICE_STATIC_IMAGE_URL}${props.src}`
      }/>),
    },
  },
};

export default props => (
  <Markdown options={options}>
    {props.data || ''}
  </Markdown>
);
