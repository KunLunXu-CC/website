import Card from '../Card';
import scss from './index.module.scss';

import { getOssUrl } from '@/utils';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { Image, Icon } from '@kunlunxu/brick';

const useStateHook = () => {
  const router = useRouter()
  // 退出
  const signOut = useCallback(() => {
    router.push('/login');
  }, [router]);

  const { avatars, user  } = useSelector((state) => ({
    user: state.user,
    avatars: state.photos?.avatar ?? [],
  }));

  // 随机头像
  const avatar = useMemo(() => {
    const index = Math.floor(Math.random() * avatars.length);
    return avatars.length > 0
      ? getOssUrl(avatars[index].name)
      : '';
  }, [avatars]);

  return { avatar, user, signOut };
};

const User = () => {
  const state = useStateHook();
  return (
    <Card className={scss.user}>
      <div className={scss.avatar}>
        <Image src={state.avatar} alt="head"/>
      </div>
      <div className={scss.name}>
        { state.user.name || '---'}
      </div>
      <div className={scss.motto}>
        { state.user.bio || '这个人很懒什么都没写'}
      </div>
      <Icon
        type="icon-tuichu"
        onClick={state.signOut}
        className={scss['sign-out']}
      />
    </Card>
  );
}

export default User;

