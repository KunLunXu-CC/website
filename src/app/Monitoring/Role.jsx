import classNames from 'classnames';
import scss from './role.module.scss';

import { useState } from 'react';
import { useGetRolesQuery } from '@store/graphql';


// console.log('%c [ app ]-10', 'font-size:13px; background:pink; color:#bf2c9f;', app);

export default () => {
  const { data } = useGetRolesQuery();

  const [activeRole, setActiveRole] = useState();

  console.log('%c [ data ]-5', 'font-size:13px; background:pink; color:#bf2c9f;', data);

  return (
    <div className={scss.role}>
      <div className={scss['role-list']}>
        {data?.roles?.list.map((role) => (
          <div
            key={role.id}
            className={classNames(scss['role-item'], {
              [scss.active]: activeRole === role.id,
            })}
            onClick={setActiveRole.bind(null,  role.id)}>
            {role.name}
            {role.auth.length}
          </div>
        ))}
      </div>

      <div className={scss['auth-list']}>
        {/* {app.map((v) => (
          <div key={v.code}>
            {v.name}
          </div>
        ))} */}
        1
      </div>
    </div>
  );
};
