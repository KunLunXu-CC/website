import React, { Fragment } from 'react';
import ReleaseConfirm from './ReleaseConfirm';
import RevokeConfirm from './RevokeConfirm';
import ThumbSetting from './ThumbSetting';

export default () => (
  <Fragment>
    <ReleaseConfirm/>
    <RevokeConfirm/>
    <ThumbSetting/>
  </Fragment>
);
