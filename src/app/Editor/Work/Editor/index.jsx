import _ from 'lodash';
import React, {
  useRef,
  useMemo,
  useEffect,
} from 'react';
import { Scroll } from 'qyrc';
import CodeMirror from "codemirror";
import { useObserver } from 'mobx-react-lite';

import { useStore } from '../../store';
import scss from './index.module.scss';
import 'codemirror/mode/markdown/markdown.js';    // 引入 codemirror 模式
import './theme';                                 // 引入 codemirror 主题(样式)

const useStateHook = (props, store) => {
  const editorBodyRef = useRef(null);
  const immutable = useMemo(() => ({
    codeMirror: null,
  }), []);

  // change 事件
  const onChange = () => {
    const { id } = props.data.article;
    store.article.setChange(id, true);
  }

  const createCodeMirror = () => {
    immutable.codeMirror = CodeMirror(editorBodyRef.current, {
      tabSize: 2,
      indentUnit: 2,
      lineNumbers: true,
      mode:  "markdown",
      lineWrapping: true,
      theme: 'oceanic-next',
      value: _.get(props, 'data.article.content') || '',
    });
    immutable.codeMirror.on('change', onChange);
  }

  // 保存
  const onSave = () => {
    const { id } = props.data.article;
    store.article.setChange(id, false);
    store.article.updateArticle({
      id,
      body: { content: immutable.codeMirror.getValue() },
    });
  }

  // 监听 ctrl + s
  const onKeyDown = (event) => {
    if (event.keyCode !== 83 && !event.ctrlKey && !event.metaKey){return false;}
    event.preventDefault();
    onSave();
  }

  useEffect(() => {
    createCodeMirror();
  }, []);

  return { editorBodyRef, onKeyDown };
}

export default (props) => {
  const store = useStore();
  const state = useStateHook(props, store);

  return (
    <Scroll className={scss['editor']}>
      <div
        onKeyDown={state.onKeyDown}
        ref={state.editorBodyRef}
        className={scss['editor-body']}/>
    </Scroll>
  );
}
