import { Select } from 'antd';
import { actions } from '@store';
import { useCallback, useMemo } from 'react';
import { APP_SETTING } from '@config/constants';
import { useSelector, useDispatch } from 'react-redux';
import { useGetRolesQuery, useUpdateUserMutation } from '@store/graphql';

import scss from './detail.module.scss';

export default () => {
  const dispatch = useDispatch();
  const [updateUser] = useUpdateUserMutation();
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

  const handleChangeRole = useCallback(async (value) => {
    // 1. 调用更新接口
    const res = await updateUser({
      body: {
        role: value,
      },
      conds: {
        id: active.id,
      },
    });

    // 2. 修改当前角色信息
    const currentRole = res.data.updateUsers.change[0].role;
    dispatch(actions.monitoring.setActiveUserRole(currentRole));
  }, [updateUser, active, dispatch]);


  if (!active) {
    return null;
  }

  return (
    <div className={scss.detail}>
      <div className={scss.title}>
        <Select
          value={role.id}
          options={selectOptions}
          onChange={handleChangeRole}
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
