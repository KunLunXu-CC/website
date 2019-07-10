import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
} from 'react';
import _ from 'lodash';
import { useObserver } from "mobx-react-lite";
import { useStore } from '@store/index';
import { Modal } from '@components';
import scss from '../index.module.scss';

const useStateHook = (props, store) => {

}

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
