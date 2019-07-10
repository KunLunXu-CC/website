import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
} from 'react';
import _ from 'lodash';
import { useObserver } from "mobx-react-lite";
import { useStore } from '@store/index';
import scss from '../index.module.scss';

const useStateHook = (props) => {

}

const AppBlock = (props) => useObserver(() => {
  const store = useStore();
  return (
    <div className={scss['app-block']}>
      {
        store.app.list.map( v => {
          const App = v.app;
          return (<App key={v.url} route={v}/>);
        })
      }
    </div>
  );
});

export default AppBlock;
