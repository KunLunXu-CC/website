import React from 'react';
import MoveArticle from './MoveArticle';
import ThumbSetting from './ThumbSetting';
import RevokeConfirm from './RevokeConfirm';
import ReleaseConfirm from './ReleaseConfirm';
import scss from './index.module.scss';

export default () => (
  <div className={scss.modal}>
    <ThumbSetting/>
    <RevokeConfirm/>
    <ReleaseConfirm/>
    <MoveArticle/>
  </div>
);
