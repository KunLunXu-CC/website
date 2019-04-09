import React from 'react';
import { Modal } from '@components';

const Home = (props) => {
  return (
    <div style={{
      boxSizing: 'border-box',
      background: '#eee',
      height: '800px',
      width: '100%',
      border: '50px solid #fff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Modal width={1000}/>
    </div>
  );
}

export default Home;
