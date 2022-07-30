import Menu from './Menu';
import Body from './Body';
import Tips from './Tips';
import Modal from './Modal';
import scss from './index.module.scss';

export default () => (
  <div className={scss.layout}>
    <Menu />
    <Body />
    <Modal />
    <Tips />
  </div>
);
