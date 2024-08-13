import { useCallback, useState, useEffect } from "react";

const useFullscreen = () => {
  const [fulled, setFulled] = useState(false);

  // 手动切换切换全屏状态
  const onToggle = useCallback(() => setFulled((pre) => !pre), []);

  // 监听快捷键 ctrl + shift + f 切换全屏
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      const { shiftKey, ctrlKey, metaKey, key } = event;

      if (shiftKey && (ctrlKey || metaKey) && key === "f") {
        event.preventDefault();
        event.stopPropagation();

        setFulled((pre) => !pre);
      }
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, []);

  // 监听状态, 切换全屏、退出全屏
  useEffect(() => {
    const target = document.body;

    // 1. 全屏
    if (fulled && target) {
      target.requestFullscreen();
    }

    // 2. 退出全屏
    if (document.fullscreenElement === target && !fulled) {
      document.exitFullscreen();
    }
  }, [fulled]);

  return { onToggle, fulled, setFulled };
};

export default useFullscreen;
