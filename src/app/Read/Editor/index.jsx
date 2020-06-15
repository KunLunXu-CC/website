import React from 'react';
import scss from './index.module.scss';

// import { useDispatch } from 'react-redux';
import { VariableContainer, CodeEditor } from 'qyrc';

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
  // const dispatch = useDispatch();

  // 保存(ctr + s): 提交修改、发布
  const onSave = async ({ value }) => {
    console.log('----------->>>', value);
    // dispatch({
    //   content,
    //   id: article.id,
    //   type: 'editor/updateArticleContent',
    // });
  };

  return { onSave };
};

export default () => {
  const state = useStateHook();

  return (
    <VariableContainer
      margin={{ top: 20 }}
      operationList={['top']}
      constraintSize={{ height: 100 }}
      style={{ width: '100%', transform: 'translate(0px, 0px)' }}>
      <div className={scss.editor}>
        <CodeEditor
          options={OPTIONS}
          onSave={state.onSave}
        />
      </div>
    </VariableContainer>
  );
};
