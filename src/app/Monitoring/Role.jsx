import classNames from 'classnames';
import scss from './role.module.scss';

import { actions } from '@store';
import { Checkbox, Progress } from 'antd';
import { APP_SETTING } from '@config/constants';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect, useState, useRef } from 'react';
import { useGetRolesQuery, useUpdateRolesMutation } from '@store/graphql';

export const BottomBtn = () => {
  const loadingRef = useRef(false);
  const [percent, setPercent] = useState(100);
  const [updateRoles] = useUpdateRolesMutation();
  const { active } = useSelector((state) => state.monitoring.role);

  const animation = useCallback(() => {
    if (!loadingRef.current) {
      setPercent(100);
      return;
    }

    setPercent((pre) =>  (pre === 100 ? 0 : pre + ((100 - pre) / 2)));

    window.requestAnimationFrame(animation);
  }, []);

  const handleSave = useCallback(async () => {
    if (!active) {
      return false;
    }

    animation();
    loadingRef.current = true;
    await updateRoles({
      conds: { id: active.id },
      body: { auth: active.auth },
    });
    loadingRef.current = false;
  }, [active, updateRoles, animation]);

  return (
    <div
      onClick={handleSave}
      className={scss.save}>
      <Progress
        type="circle"
        percent={percent}
        format={() => '保存'}
        strokeColor="#fb8da7"
        trailColo="rgba(0, 0, 0, 0)"
      />
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
    dispatch(actions.monitoring.setActiveRole(activeRole));
  }, [dispatch]);

  // 初始化 activeRole
  useEffect(() => {
    if (data?.roles) {
      dispatch(actions.monitoring.setRoleList(data.roles.list));
      dispatch(actions.monitoring.setActiveRole(data.roles.list[0]));
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
