import { useSelector } from 'react-redux';
import scss from './history.module.scss';

export default () => {
  const activeChat = useSelector((state) => state.ai.chat.active);
  return (
    <div className={scss.history}>
      {activeChat?.messages.map((v, index) => (
        <div
          key={index}
          className={scss[v.role]}>
          {v.content}
        </div>
      ))}
    </div>
  );
};
