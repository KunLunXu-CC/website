import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
} from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import scss from '../index.module.scss';

const useStateHook = (props) => {
  
}

const AppBlock = (props) => {
  return (
    <div className={scss['app-block']}>
      {
        props.routes.map( v => {
          const App = v.app;
          return (<App key={v.url}/>);
        })
      }
    </div>
  );
}

export default connect((state) => ({
  routes: state.routes
}), null)(AppBlock);
