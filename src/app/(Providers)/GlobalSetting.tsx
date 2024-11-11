'use client';
import getOssUrl from '@/utils/getOssUrl';
import { FC, ReactNode, useEffect } from 'react';

const GlobalSetting: FC<{ children: ReactNode }> = ({ children }) => {
  // 禁用所有快捷键, ARC 下没效果
  // useEffect(() => {
  // const handler = (e: KeyboardEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  // };
  // window.addEventListener('keydown', handler);
  // window.addEventListener('keyup', handler);
  // return () => {
  //   window.removeEventListener('keydown', handler);
  //   window.removeEventListener('keyup', handler);
  // };
  // }, []);

  // 监听复制行为
  useEffect(() => {
    const handler = (e: ClipboardEvent) => {
      if (!e.clipboardData) return;

      // 1. 获取剪切板内容
      const text = e.clipboardData.getData('text');

      // 2. 匹配内容中的图片链接, 处理非 OSS 链接的图片链接
      const copyText = text.replace(/(!\[.*?\])\((.*?)\)/g, (match, p1, p2) => {
        if (!p2.trim().startsWith('http')) {
          return `${p1}(${getOssUrl(p2)})`;
        }

        return match;
      });

      // 3. 将处理后的内容写入剪切板
      e.clipboardData.setData('text', copyText);
    };

    document.addEventListener('copy', handler);
    return () => document.removeEventListener('copy', handler);
  }, []);

  return <>{children}</>;
};

export default GlobalSetting;
