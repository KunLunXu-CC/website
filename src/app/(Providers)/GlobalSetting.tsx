'use client';
import { FC, ReactNode, useEffect } from 'react';

const GlobalSetting: FC<{ children: ReactNode }> = ({ children }) => {
  // 禁用所有快捷键, ARC 下没效果
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    window.addEventListener('keydown', handler);
    window.addEventListener('keyup', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      window.removeEventListener('keyup', handler);
    };
  }, []);

  return <>{children}</>;
};

export default GlobalSetting;
