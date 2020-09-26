/**
 * 退出全屏
 */
export const exitFullscreen = () => [
  'exitFullscreen',
  'mozCancelFullScreen',
  'webkitExitFullscreen',
].find(key => {
  document[key] && document[key]();
  return document[key];
});

/**
 * 全屏
 * @param {DOM} element 待全屏 dom
 */
export const requestFullscreen = element => [
  'requestFullscreen',
  'msRequestFullscreen',
  'mozRequestFullScreen',
  'webkitRequestFullscreen',
].find(key => {
  element[key] && element[key]();
  return element[key];
});

/**
 * 是否已开启全屏
 */
export const isFullscreen = () => [
  document.fullScreenElement,
  document.msFullscreenElement,
  document.mozFullScreenElement,
  document.webkitFullscreenElement,
].find(v => v);
