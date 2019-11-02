import React, { useEffect, useRef } from 'react';
import { Scroll } from 'qyrc';
import CodeMirror from "codemirror";

import md from './test.md';

import scss from './index.module.scss';

// 引入模式
// import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/markdown/markdown.js';

// 基础样式
import 'codemirror/lib/codemirror.css';

// 引入主题
import './theme/rubyblue';

const theme = [
  'bespin',
  'blackboard',
  'mbo',
  'midnight',
  'oceanic-next',
  'paraiso-dark',
  'yonce',
];

export default () => {

  const ref = useRef(null);

  useEffect(() => {
    const myCodeMirror = CodeMirror(ref.current, {
      value: md,
      mode:  "markdown",
      indentUnit: 2,
      tabSize: 2,
      lineNumbers: true,
      lineWrapping: true,
      theme: theme[4],
    });
  }, []);

  return (
    <Scroll className={scss['editor']}>
      <div ref={ref} />
    </Scroll>
  );
}
