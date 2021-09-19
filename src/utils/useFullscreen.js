import React from 'react';

/**
 * 退出全屏
 */
const exitFullscreen = () => [
  'exitFullscreen',
  'mozCancelFullScreen',
  'webkitExitFullscreen',
].find((key) => {
  document[key] && document[key]();
  return document[key];
});

/**
 * 全屏
 * @param {DOM} element 待全屏 dom
 */
const requestFullscreen = (element) => [
  'requestFullscreen',
  'msRequestFullscreen',
  'mozRequestFullScreen',
  'webkitRequestFullscreen',
].find((key) => {
  element[key] && element[key]();
  return element[key];
});

/**
 * 是否已开启全屏
 */
const isFullscreen = () => [
  document.fullScreenElement,
  document.msFullscreenElement,
  document.mozFullScreenElement,
  document.webkitFullscreenElement,
].find((v) => v);

export default (dom) => {
  const [fulled, setFulled] = React.useState(false);

  // 切换全屏状态
  const onToggle = React.useCallback(setFulled.bind(null, !fulled), [fulled]);

  // 监听 fulled 触发事件
  React.useEffect(() => {
    dom.dispatchEvent(new CustomEvent(
      fulled ? 'requestFullscreen' : 'exitFullscreen',
    ));
  }, [fulled]);

  // 监听 ctrl + shift + f 切换全屏
  React.useEffect(() => {
    const listener = (event) => {
      const { shiftKey, ctrlKey, metaKey, keyCode } = event;

      if (shiftKey && (ctrlKey || metaKey) && keyCode === 70) {
        event.preventDefault();
        event.stopPropagation();
        setFulled(!fulled);
      }
    };

    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [fulled]);

  // 监听、取消监听自定义事件: exitFullscreen、requestFullscreen
  React.useEffect(() => {
    if (dom) {
      const onExitFullscreen = () => isFullscreen() && exitFullscreen();
      const onSrequestFullscreen = () => requestFullscreen(dom);

      dom.addEventListener('exitFullscreen', onExitFullscreen);
      dom.addEventListener('requestFullscreen', onSrequestFullscreen);

      return () => {
        dom.removeEventListener('exitFullscreen', onExitFullscreen);
        dom.removeEventListener('requestFullscreen', onSrequestFullscreen);
      };
    }
  }, [dom]);

  return { onToggle, fulled, setFulled };
};
