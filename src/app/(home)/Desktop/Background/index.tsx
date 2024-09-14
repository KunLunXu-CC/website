import Error from './Error';
import Loading from './Loading';
import scss from './index.module.scss';
import usePhotosStore from '@/store/usePhotosStore';

import { getOssUrl } from '@/utils';
import { Image } from '@kunlunxu/brick';
import { FC, memo, ReactNode, useMemo } from 'react';

const Background: FC<{ children?: ReactNode }> = (props) => {
  const { desktop } = usePhotosStore();

  const bgSrc = useMemo(() => {
    const index = Math.floor(Math.random() * desktop.length);
    return desktop.length > 0 ? getOssUrl(desktop[index].name) : '';
  }, [desktop]);

  return (
    <Image
      src={bgSrc}
      alt="background"
      error={<Error />}
      loading={<Loading />}
      className={scss.background}>
      {props.children}
    </Image>
  );
};

export default memo(Background);
