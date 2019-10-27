// 打印特定内容
const consolePrint = () => {
  if (_DEV_){return false;}
  console.info(
    `%cGitHub%c https://github.com/qianyin925`, 
    'padding: 2px 5px; border-radius: 4px;background: #1890ff; color: #fff;',
    ''
  );
}

// 修改 console: 生产环境下禁止 console 打印特定内容, 后门: console = $console
const setConsole = () => {
  if (_DEV_){return false;}
  window.$console = window.console;
  window.console = {
    ...window.console,
    log: () => {},
    info: () => {},
    group: () => {},
    groupEnd: () => {},
  }
}

export default () => {
  consolePrint();
  setConsole();
};
