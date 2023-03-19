import React, {
  useMemo,
} from 'react';
import Error from './Error';
import Loading from './Loading';
import scss from './index.module.scss';

import { Image } from '@kunlunxu/brick';
import { useSelector } from 'react-redux';
import { SERVICE_STATIC_IMAGE_URL } from '@config/constants';

const useStateHook = () => {
  const photos = useSelector((state) => (
    state.photos?.desktop ?? []
  ));

  const bg = useMemo(() => {
    const index = Math.floor(Math.random() * photos.length);
    return photos.length > 0
      ? `${SERVICE_STATIC_IMAGE_URL}${photos[index].name}`
      : '';
  }, [photos]);

  return { bg };
};

export default (props) => {
  const state = useStateHook();
  return (
    <Image
      src={state.bg}
      error={<Error />}
      loading={<Loading />}
      className={scss.background}>
      {props.children}
    </Image>
  );
};
