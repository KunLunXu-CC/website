import React from 'react';
import scss from './index.module.scss';

import { VariableContainer, CodeEditor } from 'qyrc';
import { useDispatch, useSelector } from 'react-redux';

// 初始默认 options
const OPTIONS = {
  tabSize: 2,                 // tab 大小
  fontSize: 14,               // 字体大小
  wordWrap: 'on',             // 自动换行
  language: 'markdown',       // 语言设置
  theme: 'one-dark-pro',      // 主题设置
  fontFamily: 'monospace, \'Droid Sans Mono\', \'Droid Sans Fallback\'',
};

const useStateHook = () => {
  const dispatch = useDispatch();
  const editor = useSelector(state => state.read.editor);


  // 保存(ctr + s): 提交修改、发布
  const onSave = async ({ value: content  }) => {
    if (!content) {
      return false;
    }
    dispatch({ type: 'read/onSave' });
  };

  const onChange = ({ value: content }) => {
    dispatch({
      type: 'read/setEditor',
      editor: { current: {
        ... editor.current,
        content,
      } },
    });
  };

  return { onSave, editor, onChange };
};

export default () => {
  const state = useStateHook();

  return state.editor.show ? (
    <VariableContainer
      margin={{ top: 20 }}
      operationList={['top']}
      constraintSize={{ height: 100 }}
      style={{ width: '100%', transform: 'translate(0px, 0px)' }}>
      <div className={scss.editor}>
        <CodeEditor
          options={OPTIONS}
          onSave={state.onSave}
          onChange={state.onChange}
          value={state.editor.current ?. content ?? ''}
        />
      </div>
    </VariableContainer>
  ) : null;
};
