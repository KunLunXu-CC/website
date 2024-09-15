Object.defineProperty(window, 'test', {
  get: () => {
    // @ts-ignore
    $console.log('你输入了 test');
    return '自定义了东西';
  },
});
