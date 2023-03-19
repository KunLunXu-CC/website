import Chat from './Chat';
import scss from './index.module.scss';

// 参考: https://dribbble.com/shots/20298059-Messenger-UI
export default () => (
  <div className={scss.layout}>
    <div className={scss['layout-side']} />
    <div className={scss['layout-main']}>
      <Chat />
    </div>
  </div>
);
