import App from './App';
import React from 'react';
import StoreProvider from './store';

export default () => (
  <StoreProvider>
    <App />
  </StoreProvider>
);
