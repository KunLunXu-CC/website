import React, {
  useMemo,
  useEffect,
} from 'react';
import Error from './Error';
import Loading from './Loading';
import scss from './index.module.scss';
import { useDispatch } from 'react-redux'
import { Image } from 'qyrc';

const useStateHook = store => {
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch({ type: 'TO_LOGIN_OUT' });

  }, []);

  // const bg = useMemo(() => {
  //   const index = Math.floor(Math.random() * store.desktop.bgList.length);
  //   return store.desktop.bgList.length > 0
  //     ? _.get(store.desktop.bgList, `[${index}].url`, '')
  //     : '';
  // }, [store.desktop.bgList]);
  // return { bg };
};

export default props => {
  const state = useStateHook();
  return (
    <Image
      src={null}
      error={<Error/>}
      loading={<Loading/>}
      className={scss.background}>
      {props.children}
    </Image>
  );
};
