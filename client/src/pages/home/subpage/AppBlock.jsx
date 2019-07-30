import React from 'react';
import { useObserver } from "mobx-react-lite";
import { useStore } from '@store';
import { Modal } from 'qyrc';

import scss from '../index.module.scss';

const Item = (props) => {
  const App = props.data.app;
  const onMin = (e, isMin) => {
    props.minimize(props.data, isMin)
  };

  return (
    <Modal 
      isMin={props.data.isMin} 
      onMin={onMin} 
      minParams={{ width: 0, height: 0, offsetX: 0, offsetY: 0 }}>
      <App />
    </Modal>
  );
};

export default (props) => useObserver(() => {
  const store = useStore();
  return (
    <div className={scss['app-block']}>
      {store.app.list.map(v => (
        <Item key={v.url} data={v} minimize={store.app.minimize}/>
      ))}
    </div>
  );
});
