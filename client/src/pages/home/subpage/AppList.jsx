import React from 'react';
import { useObserver } from "mobx-react-lite";
import { useStore } from '@store';
import { Modal } from 'qyrc';

import scss from '../index.module.scss';

const Application = (props) => {
  const { component: Component } = props.app;
  return (
    <Modal 
      isMin={props.app.isMin}
      onClose={props.store.app.close.bind(null, v)}
      onMin={props.store.app.minimize.bind(null, v)}
      minParams={{ width: 100, height: 100, offsetX: 0, offsetY: 0 }}
    >
      <Component />
    </Modal>
  );
};

export default (props) => useObserver(() => {
  const store = useStore();
  return (
    <div className={scss['app-block']}>
      {store.app.list.map(v => {
        return (
          <Application key={v.url} app={v} store={store} />
        );
      })}
    </div>
  );
});
