'use client';
import { memo } from 'react';
import { Window } from '@kunlunxu/brick';

import scss from './index.module.scss';
import useAppStore from '@/store/useAppStore';
import apps from '@/app/(home)/AppList/config';

const AppList = () => {
  const { opens, closeApp, minimizeApp, maximizeApp, stickApp } = useAppStore();

  return (
    <div className={scss['app-block']}>
      {opens.map((app) => {
        const { component: Component, modalProps } = apps[app.code];
        return (
          // @ts-ignore
          <Window
            key={app.code}
            isMin={app.isMin}
            onMin={minimizeApp.bind(null, app)}
            onMax={maximizeApp.bind(null, app)}
            onClose={closeApp.bind(null, app)}
            onMouseDown={stickApp.bind(null, app)}
            minParams={{ width: 0, height: 0, offsetX: 0, offsetY: 0 }}
            {...modalProps}>
            <Component />
          </Window>
        );
      })}
    </div>
  );
};

export default memo(AppList);
