import React, {
  useRef,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import codeMirror from 'codemirror';
import scss from './index.module.scss';

import { useDispatch } from 'react-redux';
import { uploadPhotos } from '../../model/services';
import { SPIN_CODE, PHOTO_TYPE } from '@config/consts';

import 'codemirror/mode/markdown/markdown.js';    // 引入 codemirror 模式
import './theme';                                 // 引入 codemirror 主题(样式)

// 阻止默认行为
const preventDefault = e => {
  e.preventDefault();
};

const useStateHook = props => {
  const dispatch = useDispatch();

  const editorBodyRef = useRef(null);

  const immutable = useMemo(() => ({
    codeMirror: null,
  }), []);

  // 保存
  const onSave = async () => {
    const { id } = props.data;
    const content = immutable.codeMirror.getValue();
    dispatch({
      id,
      body: { content },
      type: 'editor/updateArticle',
    });
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
    const data = await uploadPhotos({
      files: [file],
      payload: props.data.id,
      spin: SPIN_CODE.APP_EDITOR,
      type: PHOTO_TYPE.ARTICLE.VALUE,
    });
    const url = _.get(data, '[0].url', '');
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

  // 内容改变
  const onChange = useCallback(() => {
    const content = immutable.codeMirror.getValue();
    console.log('---------------->>>', content);
  }, []);

  // 初始化 codeMirror
  useEffect(() => {
    if (!immutable.codeMirror) {
      immutable.codeMirror = codeMirror(editorBodyRef.current, {
        tabSize: 2,
        indentUnit: 2,
        mode: 'markdown',
        lineNumbers: true,
        lineWrapping: true,
        theme: 'oceanic-next',
        cursorScrollMargin: 200, // 该参数受限于 .CodeMirror-lines padding 值
        value: props.data.content || '',
      });
      immutable.codeMirror.on('change', onChange);
    }
  }, [props.data, immutable, onChange]);

  return { editorBodyRef, onKeyDown, onPaste, onDrop };
};

export default props => {
  const state = useStateHook(props);

  return (
    <div
      onDrop={state.onDrop}
      className={scss.editor}
      onPaste={state.onPaste}
      ref={state.editorBodyRef}
      onDragOver={preventDefault}
      onKeyDown={state.onKeyDown}
    />
  );
};
