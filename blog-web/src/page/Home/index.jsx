import React from 'react';
import { Modal } from '@components';

const Home = (props) => {
  return (
    <div style={{
      boxSizing: 'border-box',
      width: '100%',
      padding: '50px',
      overflow: 'hidden'
    }}>
      <div style={{height: '800px', background: '#eee', overflow: 'hidden', position: 'relative'}}>
        <Modal width={1000}/>
      </div>
    </div>
  );
}

export default Home;
