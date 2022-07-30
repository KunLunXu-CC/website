import List from './List';
import Header from './Header';
import scss from './index.module.scss';

export default () => (
  <div className={scss.body}>
    <Header />
    <List />
  </div>
);
