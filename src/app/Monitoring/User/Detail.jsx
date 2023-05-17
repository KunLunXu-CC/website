import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { APP_SETTING } from '@config/constants';

import scss from './detail.module.scss';

export default () => {
  const { active } = useSelector((state) => state.monitoring.user);


  const role = useMemo(() => {
    if (!active) {
      return null;
    }

    return {
      name: active.role.name,
      authList: Object.values(APP_SETTING).filter(
        (ele) => active.role.auth.some((r) => r.code === ele.code),
      ),
    };
  }, [active]);

  if (!active) {
    return null;
  }

  console.log('%c [ role ]-28', 'font-size:13px; background:pink; color:#bf2c9f;', role);
  return (
    <div className={scss.detail}>
      <div>
        角色:
        { role.name }
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
