import Role from './Role';
import scss from './index.module.scss';

export default () => (
  <div className={scss.logger}>
    <div className={scss.side}>
      side
    </div>
    <div className={scss.body}>
      <Role />
    </div>
  </div>
);
