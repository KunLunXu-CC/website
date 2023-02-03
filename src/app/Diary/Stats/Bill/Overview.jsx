import scss from './overview.module.scss';

import { useMemo } from 'react';

export default ({ data = {} }) => {
  // 总览
  const overview = useMemo(() => [
    { label: '总收入', value: data.income },
    { label: '总支出', value: data.expend },
    { label: '总盈余', value: data.income - data.expend },
  ], [data]);

  return (
    <div className={scss.overview}>
      {overview.map((v) => (
        <div
          key={v.label}
          className={scss['overview-item']}>
          <div className={scss['overview-label']}>
            {v.label}
          </div>
          <div className={scss['overview-value']}>
            ¥
            {(v.value || 0).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};
