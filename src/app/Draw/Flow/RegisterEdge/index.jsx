import React from 'react';
import { RegisterEdge } from 'gg-editor';

const files = require.context('./edges/', true, /.*\.js/);
const configs = files.keys().reduce((total, key) => [
  ... total,
  files(key).default,
], []);

export default () => (
  <React.Fragment>
    {configs.map(v => (
      <RegisterEdge {... v} key={v.name}/>
    ))}
  </React.Fragment>
);
