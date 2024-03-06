import Error from './Error';
import Loading from './Loading';
import scss from './index.module.scss';

import { useMemo } from 'react';
import { getOssUrl } from '@/utils';
import { Image } from '@kunlunxu/brick';
import { useSelector } from 'react-redux';

const useStateHook = () => {
  const photos = useSelector((state) => (
    state.photos?.desktop ?? []
  ));

  const bg = useMemo(() => {
    const index = Math.floor(Math.random() * photos.length);
    return photos.length > 0
      ? getOssUrl(photos[index].name)
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
