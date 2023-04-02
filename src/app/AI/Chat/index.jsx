import List from './List';
import History from './History';
import TextArea from './TextArea';
import scss from './index.module.scss';

export default () => (
  <div className={scss.chat}>
    <List />
    <div className={scss.session}>
      <History />
      <TextArea />
    </div>
  </div>
);
