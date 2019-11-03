import React, {
  useRef,
  useMemo,
  useEffect,
} from 'react';
import { Scroll } from 'qyrc';
import CodeMirror from "codemirror";

import md from './test.md';

import scss from './index.module.scss';
import 'codemirror/mode/markdown/markdown.js';    // 引入 codemirror 模式
import './theme';                                 // 引入 codemirror 主题(样式)

const useStateHook = () => {
  const editorBodyRef = useRef(null);
  const immutable = useMemo(() => ({
    codeMirror: null,
  }), []);

  const createCodeMirror = () => {
    immutable.codeMirror = CodeMirror(editorBodyRef.current, {
      value: md,
      tabSize: 2,
      indentUnit: 2,
      lineNumbers: true,
      mode:  "markdown",
      lineWrapping: true,
      theme: 'oceanic-next',
    });
  }

  useEffect(() => {
    createCodeMirror();
  }, []);

  return { editorBodyRef };
}

export default () => {
  const state = useStateHook();

  return (
    <Scroll className={scss['editor']}>
      <div
        ref={state.editorBodyRef}
        className={scss['editor-body']}/>
    </Scroll>
  );
}
