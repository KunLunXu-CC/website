import React, {
  useEffect,
} from 'react';

import Form from './Form';
import Background from './Background';

const useStateHook = () => {
  useEffect(() => {
    localStorage.setItem('authorization', null);
  }, []);
};

export default () => {
  useStateHook();
  return (
    <Background>
      <Form/>
    </Background>
  );
};
