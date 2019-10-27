Object.defineProperty(window, 'test', {
  get: () => {
    $console.log('你输入了 test');
  }
});