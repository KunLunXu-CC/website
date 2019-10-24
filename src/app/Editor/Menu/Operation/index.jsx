import React, {
  useState,
  Fragment,
  useEffect, 
} from 'react';

import { useStore } from '../../store';
import scss from './index.module.scss';

const useStateHook = (props, store) => {

  return { };
}

export default (props) => {
  const store = useStore();
  const state = useStateHook(props, store);

  return (
    <div className={scss['operation']}>
      1111
    </div>
  );
}
