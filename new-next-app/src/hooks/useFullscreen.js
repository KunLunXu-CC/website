import { useCallback, useState, useEffect } from 'react';

export default (dom) => {
  const [fulled, setFulled] = useState(false);

  // 手动切换切换全屏状态
  const onToggle = useCallback(() => setFulled((pre) => !pre), []);

  // 监听快捷键 ctrl + shift + f 切换全屏
  useEffect(() => {
    const listener = (event) => {
      const { shiftKey, ctrlKey, metaKey, keyCode } = event;

      if (shiftKey && (ctrlKey || metaKey) && keyCode === 70) {
        event.preventDefault();
        event.stopPropagation();

        setFulled((pre) => !pre);
      }
    };

    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, []);

  // 监听状态, 切换全屏、退出全屏
  useEffect(() => {
    // 全屏
    if (fulled && dom) {
      dom.requestFullscreen();
    }

    // 退出全屏
    if (document.fullscreenElement === dom && !fulled) {
      document.exitFullscreen();
    }
  }, [dom, fulled]);

  return { onToggle, fulled, setFulled };
};
