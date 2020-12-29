import React from 'react';

import { Markdown } from 'qyrc';

export default props => (
  <Markdown>
    {props.data || ''}
  </Markdown>
);
