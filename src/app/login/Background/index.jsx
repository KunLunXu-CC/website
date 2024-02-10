import Error from './Error';
import Loading from './Loading';
import scss from './index.module.scss';

import { getOssUrl } from '@/utils';
import { Image } from '@kunlunxu/brick';

export default (props) => (
  <Image
    error={<Error />}
    loading={<Loading />}
    className={scss.background}
    src={getOssUrl('pro.d2FsbGhhdmVuLWV5cmc1ay5qcGcxNTc3ODc0NzIxMjUz.jpg')}>
    {props.children}
  </Image>
);
