import React from 'react';
import Move from './Move';
import ThumbSetting from './ThumbSetting';
import RevokeConfirm from './RevokeConfirm';
import ReleaseConfirm from './ReleaseConfirm';
import scss from './index.module.scss';

export default () => (
  <div className={scss.modal}>
    <ThumbSetting/>
    <RevokeConfirm/>
    <ReleaseConfirm/>
    <Move/>
  </div>
);
