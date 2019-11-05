/**
 * 生产环境下屏蔽 console
 * 1. 如果需要可以将 `window.console = window.$console` 复制到控制台开启 console 功能
 */
const setting = () => {

  window.$console = window.console;
  if (_DEV_){

    return false;

  }
  window.console = {
    ... window.console,
    log: () => {},
    info: () => {},
    group: () => {},
    groupEnd: () => {},
  }

}

setting();
