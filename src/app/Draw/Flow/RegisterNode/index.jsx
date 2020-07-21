import React from 'react';
import { RegisterNode } from 'gg-editor';

const files = require.context('./nodes/', true, /.*\.js/);
const configs = files.keys().reduce((total, key) => [
  ... total,
  files(key).default,
], []);

export default () => (
  <React.Fragment>
    {configs.map(v => (
      <RegisterNode {... v} key={v.name}/>
    ))}
  </React.Fragment>
);
