import _ from 'lodash';
import React from 'react';
import { Markdown, Scroll } from 'qyrc';

import textMd from './test.md';
import scss from './index.module.scss';

export default () => {
  return (
    <Scroll className={scss['list-box']}>
      <Markdown style={{ width: '100%' }} theme="dark">
        {textMd}
      </Markdown>
    </Scroll>
  );
};
