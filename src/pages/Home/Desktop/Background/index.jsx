import React, {
  useMemo,
} from 'react';
import _ from 'lodash';
import Error from './Error';
import Loading from './Loading';
import scss from './index.module.scss';

import { Image } from 'qyrc';
import { useSelector } from 'react-redux';

const useStateHook = () => {
  const photos = useSelector(state => (
    _.get(state, 'photos.desktop') || []
  ));

  const bg = useMemo(() => {
    const index = Math.floor(Math.random() * photos.length);
    return photos.length > 0 ? _.get(photos, `[${index}].url`, '') : '';
  }, [photos]);

  return { bg };
};

export default props => {
  const state = useStateHook();
  return (
    <Image
      src={state.bg}
      error={<Error/>}
      loading={<Loading/>}
      className={scss.background}>
      {props.children}
    </Image>
  );
};
