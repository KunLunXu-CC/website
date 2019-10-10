import React, { useEffect } from 'react';
import scss from './index.module.scss';
// import highlight from 'highlight';
// https://www.cnblogs.com/wangzhihui/articles/7004826.html
export default () => {
  return (
    <div className={scss['editor']}>
      <textarea name="" id="mdedttor" cols="100" rows="20"></textarea>
    </div>
  );
};
