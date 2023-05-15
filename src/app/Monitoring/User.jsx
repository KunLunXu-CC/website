import { actions } from '@store';
import { useEffect } from 'react';
import { useGetUserListQuery } from '@store/graphql';
import { useSelector, useDispatch } from 'react-redux';

import classNames from 'classnames';
import scss from './user.module.scss';

export default () => {
  const dispatch = useDispatch();
  const { data } = useGetUserListQuery();

  const { list, active } = useSelector((state) => state.monitoring.user);

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
            })}>
            {user.name}
          </div>
        ))}
      </div>
      <div className={scss.detail}>
        1
      </div>
    </div>
  );
};
