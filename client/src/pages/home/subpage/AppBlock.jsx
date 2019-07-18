import React from 'react';
import { useObserver } from "mobx-react-lite";
import { useStore } from '@store';
import { Modal } from '@components';

import scss from '../index.module.scss';

const AppBlock = (props) => useObserver(() => {
  const store = useStore();
  return (
    <div className={scss['app-block']}>
      {
        store.app.list.map( v => {
          const App = v.app;
          return (
            <Modal
              app={v}
              key={v.url}
              onClose={store.app.close.bind(null, v)}
              onToggle={store.app.toggle.bind(null, v)}
              onMinimize={store.app.minimize.bind(null, v)}
              onMaximize={store.app.maximize.bind(null, v)}
            >
              <App />
            </Modal>
          );
        })
      }
    </div>
  );
});

export default AppBlock;
