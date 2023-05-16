import { actions } from '@store';
import { getOssUrl } from '@utils';
import { useEffect, useCallback } from 'react';
import { useGetUserListQuery } from '@store/graphql';
import { useSelector, useDispatch } from 'react-redux';
import { DEFAULT_USER_AVATAR } from '@config/constants';

import classNames from 'classnames';
import scss from './user.module.scss';

export default () => {
  const dispatch = useDispatch();
  const { data } = useGetUserListQuery();

  const { list, active } = useSelector((state) => state.monitoring.user);

  const getAvatar = useCallback((avatar) => {
    if (/^http/.test(avatar)) {
      return avatar;
    }

    return getOssUrl(avatar ?? DEFAULT_USER_AVATAR);
  }, []);

  const handleChangeActive = useCallback((activeUser) => {
    dispatch(actions.monitoring.setActiveUser(activeUser));
  }, [dispatch]);

  // 初始化 activeRole
  useEffect(() => {
    if (data?.users) {
      dispatch(actions.monitoring.setActiveUser(data.users.list[0]));
      dispatch(actions.monitoring.setUserList(data.users.list));
    }
  }, [data, dispatch]);

  return (
    <div className={scss.wrapper}>
      <div className={scss['user-list']}>
        {list.map((user) => (
          <div
            key={user.id}
            className={classNames(scss.user, {
              [scss.active]: active?.id === user.id,
            })}
            onClick={handleChangeActive.bind(null, user)}>
            <img
              alt="用户头像"
              className={scss.avatar}
              src={getAvatar(user.avatar)}
            />
            <div className={scss['user-name']}>
              <span>
                {user.name}
              </span>
              <span>
                {user.bio}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className={scss.detail}>
        1
      </div>
    </div>
  );
};
