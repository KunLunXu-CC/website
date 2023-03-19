import { Input } from 'antd';

import scss from './index.module.scss';
import List from './List';


// 参考: https://dribbble.com/shots/20298059-Messenger-UI
export default () => (
  <div className={scss.chat}>
    <List />
    <div className={scss.main}>
      <div className={scss.header}>
        header
      </div>
      <div className={scss.session}>
        <div className={scss.view}>
          预览
        </div>
        <Input.TextArea rows={1} />
      </div>
    </div>
  </div>
);
