import React, { useEffect } from 'react';

import Editor from 'tui-editor'; /* ES6 */


import 'tui-editor/dist/tui-editor.css';          // editor's ui
import 'tui-editor/dist/tui-editor-contents.css'; // editor's content
import 'codemirror/lib/codemirror.css';           // codemirror
// import 'highlight.js/styles/github.css';       // code block highlight
import 'highlight.js/styles/atom-one-dark.css';

import 'tui-chart/dist/tui-chart.css';

export default () => {

  useEffect(() => {
    const editor = new Editor({
      el: document.querySelector('#editSection'),
      height: '300px',
      language: 'zh_CN',
      previewStyle: 'tab',
      initialValue: '### title',
      initialEditType: 'markdown',
      hooks: {
        addImageBlobHook: (file, cb, source) => {
          cb ('http://b-ssl.duitang.com/uploads/item/201508/26/20150826221548_x3SAJ.jpeg', '网络图片');
        },
      },
    });
  }, []);

  return (
    <div>
      <div id="editSection"></div>
    </div>
  );
};
