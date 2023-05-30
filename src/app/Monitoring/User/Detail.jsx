import { Select } from 'antd';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { APP_SETTING } from '@config/constants';
import { useGetRolesQuery } from '@store/graphql';

import scss from './detail.module.scss';

export default () => {
  const { data: roleList } = useGetRolesQuery();
  const { active } = useSelector((state) => state.monitoring.user);

  const selectOptions = useMemo(() => roleList?.roles.list.map((r) => ({
    value: r.id,
    label: r.name,
  })), [roleList]);

  const role = useMemo(() => {
    if (!active) {
      return null;
    }

    return {
      ...active.role,
      authList: Object.values(APP_SETTING).filter(
        (ele) => active.role.auth.some((r) => r.code === ele.code),
      ),
    };
  }, [active]);

  if (!active) {
    return null;
  }

  return (
    <div className={scss.detail}>
      <div className={scss.title}>
        <Select
          value={role.id}
          options={selectOptions}
          className={scss['select-role']}
          popupClassName={scss['select-role-popup']}
        />
      </div>
      <div className={scss['auth-list']}>
        {role.authList.map((v) => (
          <div className={scss['auth-item']}>
            <img
              src={v.icon}
              alt="应用图标"
            />
            {v.name}
          </div>
        ))}
      </div>
    </div>
  );
};
