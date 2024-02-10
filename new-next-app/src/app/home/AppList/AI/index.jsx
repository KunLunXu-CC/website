import Chat from './Chat';
import scss from './index.module.scss';

// 参考: https://dribbble.com/shots/19397699-Widget-For-Communication
// https://dribbble.com/shots/16507884-Chatbot
export default () => (
  <div className={scss.layout}>
    <div className={scss['layout-side']} />
    <div className={scss['layout-main']}>
      <Chat />
    </div>
  </div>
);
