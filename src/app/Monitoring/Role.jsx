import classNames from 'classnames';
import scss from './role.module.scss';

import { Checkbox } from 'antd';
import { actions } from '@store';
import { useCallback, useEffect } from 'react';
import { APP_SETTING } from '@config/constants';
import { useGetRolesQuery } from '@store/graphql';
import { useSelector, useDispatch } from 'react-redux';

export const BottomBtn = () => {
  const handleSave = useCallback(() => {
    //
  }, []);

  return (
    <div
      onClick={handleSave}
      className={scss.save}>
      保存
    </div>
  );
};

export default () => {
  const dispatch = useDispatch();
  const { data } = useGetRolesQuery();

  const { list, active } = useSelector((state) => state.monitoring.role);

  const handleChangeAuth = useCallback((values) => {
    const auth = Object.values(APP_SETTING)
      .filter((v) => values.includes(v.code))
      .map((v) => ({ code: v.code, name: v.name, readable: 1, writable: 1 }));
    dispatch(actions.monitoring.setActiveRoleAuth(auth));
  }, [dispatch]);

  const handleChangeActive = useCallback((activeRole) => {
    dispatch(actions.monitoring.setRole({
      active: activeRole,
    }));
  }, [dispatch]);

  // 初始化 activeRole
  useEffect(() => {
    if (data?.roles) {
      dispatch(actions.monitoring.setRole({
        list: data.roles.list,
        active: data.roles.list[0],
      }));
    }
  }, [data, dispatch]);

  return (
    <div className={scss.role}>
      <div className={scss['role-list']}>
        {list.map((role) => (
          <div
            key={role.id}
            className={classNames(scss['role-item'], {
              [scss.active]: active?.id === role.id,
            })}
            onClick={handleChangeActive.bind(null,  role)}>
            {role.name}
            <span>
              {role.auth.length}
            </span>
          </div>
        ))}
      </div>
      <Checkbox.Group
        onChange={handleChangeAuth}
        className={scss['auth-list']}
        value={active?.auth.map((v) => v.code)}
        options={Object.values(APP_SETTING).map((item) => ({
          value: item.code,
          label: (
            <div className={scss['auth-item']}>
              <img src={item.icon} />
              {item.name}
            </div>
          ),
        }))}
      />
    </div>
  );
};
