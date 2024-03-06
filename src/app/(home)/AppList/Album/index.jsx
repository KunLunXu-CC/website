import Body from './Body';
import Tips from './Tips';
import Side from './Side';
import Upload from './Upload';
import scss from './index.module.scss';

export default () => (
  <div className={scss.layout}>
    <div className={scss['layout-side']}>
      <Side />
    </div>
    <div className={scss['layout-body']}>
      <Body />
      <Upload />
    </div>
    <Tips />
  </div>
);
