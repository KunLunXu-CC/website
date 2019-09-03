import React from 'react';
import Layout from './Layout';
import Body from './Body';
import Side from './Side';
import Tags from './Tags';

export default (props) => {
  return (
    <Layout 
      body={<Body/>}
      side={<Side/>}
      tags={<Tags/>}
    />
  );
}

