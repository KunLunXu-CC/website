const files = require.context('../', true, /.*\.item\.js/);

export default files.keys().reduce(
  (total, key) => [... total, files(key).default],
  []
);
