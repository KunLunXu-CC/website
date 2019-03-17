import React, { useEffect } from 'react';

export const useLoggerHook = ({name, listenter}) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development'){return false; }
    console.log('\n');
    console.group(`%c---------- 通用 ${name} hook 日志打印 start ----------`, 'color: #87D068');
    for( let key in listenter ){
      console.log(`%c${key}`, 'color: #108EE9' , listenter[key]);
    }
    console.groupEnd();
    console.log('\n');
  }, Object.values(listenter));
}
