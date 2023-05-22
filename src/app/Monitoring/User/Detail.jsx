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

  return (
    <div className={scss.detail}>
      <div className={scss.title}>
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
