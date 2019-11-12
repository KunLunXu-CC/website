import React, {
  useRef,
  useMemo,
  useEffect,
} from 'react';
import _ from 'lodash';
import { Scroll } from 'qyrc';
import codeMirror from 'codemirror';

import { useStore } from '../../store';
import scss from './index.module.scss';
import 'codemirror/mode/markdown/markdown.js';    // 引入 codemirror 模式
import './theme';                                 // 引入 codemirror 主题(样式)

// 阻止默认行为
const preventDefault = e => {
  e.preventDefault();
};

const useStateHook = (props, store) => {
  const editorBodyRef = useRef(null);
  const immutable = useMemo(() => ({
    codeMirror: null,
  }), []);

  // 保存
  const onSave = async () => {
    const { article: { id } } = props.data;
    const content = immutable.codeMirror.getValue();
    await store.article.updateArticle({
      id,
      body: { content },
    });
    store.article.toggleStatusWithChange(id, content);
  };

  // 监听 ctrl + s
  const onKeyDown = event => {
    const downCtrrl = event.ctrlKey || event.metaKey;
    if (event.keyCode !== 83 || !downCtrrl) {
      return false;
    }
    event.preventDefault();
    onSave();
  };

  // 上传图片
  const uploadPhone = async ({ file }) => {
    const url = await store.article.uploadPhone({
      article: props.data.article.id,
      file,
    });
    url && immutable.codeMirror.replaceSelection(`![插入图片](${url})`);
  };

  // 上传： 统一处理上传操作
  const onUpload = file => {
    const handlers = [
      { test: /^image\/.*/ig, fun: uploadPhone },
    ];
    const hande = handlers.find(v => (v.test.test(file.type)));
    hande && hande.fun({ file });
  };

  // 监听粘贴动作: 实现图片的粘贴上传
  const onPaste = event => {
    if (!event.clipboardData || !event.clipboardData.items) {
      return false;
    }
    const [item] = event.clipboardData.items;
    item.kind === 'file' && onUpload(item.getAsFile());
  };

  // 监听拖动事件(注意和 onDrap 区分开)：实现图片的粘贴拖拽上传
  const onDrop = event => {
    event.preventDefault();
    const file = _.get(event, 'dataTransfer.files.[0]', null);
    file && onUpload(file);
  };

  // 初始化 codeMirror
  useEffect(() => {
    if (!immutable.codeMirror) {
      immutable.codeMirror = codeMirror(editorBodyRef.current, {
        tabSize: 2,
        indentUnit: 2,
        lineNumbers: true,
        mode: 'markdown',
        lineWrapping: true,
        theme: 'oceanic-next',
        value: props.data.article.content || '',
      });
      immutable.codeMirror.on('change', () => {
        const { id } = props.data.article;
        const content = immutable.codeMirror.getValue();
        store.article.toggleStatusWithChange(id, content);
      });
    }
  }, [props.data.article, immutable, store]);

  return { editorBodyRef, onKeyDown, onPaste, onDrop };
};

export default props => {
  const store = useStore();
  const state = useStateHook(props, store);
  return (
    <Scroll className={scss.editor}>
      <div
        onDrop={state.onDrop}
        onPaste={state.onPaste}
        ref={state.editorBodyRef}
        onDragOver={preventDefault}
        onKeyDown={state.onKeyDown}
        className={scss['editor-body']}/>
    </Scroll>
  );
};
