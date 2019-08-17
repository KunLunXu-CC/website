import _ from 'lodash';
import React from 'react';
import { Markdown } from 'qyrc';

import textMd from './test.md';
import scss from './index.module.scss';

export default () => {
  return (
    <div className={scss['list-box']}>
      <Markdown style={{ width: '100%' }}>
        {textMd}
      </Markdown>
    </div>
  );
};
