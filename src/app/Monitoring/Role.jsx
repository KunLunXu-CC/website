import classNames from 'classnames';
import scss from './role.module.scss';

import { Checkbox } from 'antd';
import { APP_SETTING } from '@config/constants';
import { useGetRolesQuery } from '@store/graphql';
import { useCallback, useEffect, useState } from 'react';

export default () => {
  const { data } = useGetRolesQuery();
  const [activeRole, setActiveRole] = useState();

  const handleChangeAuth = useCallback((values) => {
    const auth = Object.values(APP_SETTING)
      .filter((v) => values.includes(v.code))
      .map((v) => ({ code: v.code, name: v.name, readable: 1, writable: 1 }));

    setActiveRole((pre) => ({ ...pre, auth }));
  }, []);

  // 初始化 activeRole
  useEffect(() => {
    if (!activeRole) {
      setActiveRole(data?.roles?.list[0]);
    }
  }, [data, activeRole]);

  return (
    <div className={scss.role}>
      <div className={scss['role-list']}>
        {data?.roles?.list.map((role) => (
          <div
            key={role.id}
            className={classNames(scss['role-item'], {
              [scss.active]: activeRole?.id === role.id,
            })}
            onClick={setActiveRole.bind(null,  role)}>
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
        value={activeRole?.auth.map((v) => v.code)}
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
