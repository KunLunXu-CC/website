import React, { Fragment } from 'react';
import ThumbSetting from './ThumbSetting';
import RevokeConfirm from './RevokeConfirm';
import ReleaseConfirm from './ReleaseConfirm';

export default () => (
  <Fragment>
    <ReleaseConfirm/>
    <RevokeConfirm/>
    <ThumbSetting/>
  </Fragment>
);
