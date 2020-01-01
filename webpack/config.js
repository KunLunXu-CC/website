const path = require('path');

// 自动加载 配置
module.exports.providePlugin = {
  _: 'lodash',
  lodash: 'lodash',
};

/* 路径别名配置 */
module.exports.alias = {
  '@app': path.resolve(__dirname, '../src/app'),
  '@api': path.resolve(__dirname, '../src/api'),
  '@hook': path.resolve(__dirname, '../src/hook'),
  '@store': path.resolve(__dirname, '../src/store'),
  '@pages': path.resolve(__dirname, '../src/pages'),
  '@utils': path.resolve(__dirname, '../src/utils'),
  '@config': path.resolve(__dirname, '../src/config'),
  '@assets': path.resolve(__dirname, '../src/assets'),
}

/* 全局变量 */
module.exports.globalConsts = {
  // 生产环境配置
  production: {
    _DEV_: false,
    PUBLICKEY: JSON.stringify(`-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhBbcOufk176dZ54e/Zgc
    vu+vG6kKTUI5/dj77iX04b+u9sUfmnIxX7s9nsDGWe12aCNBrJt4+DcYTtUQOdjk
    ZIuLCOo/0Ui/QUYYYKWkfUUzPK8ZGOQoRb2/T+cLp5BAUaNzVf73RvlaLK4RWjN2
    LDPlGmetns+gunjBKLgcea0DtU8AFEmgtDJ98EQDvbncZ/LBtjjCXfb4NOI5+yDB
    0eLu4sytX+tF+IjKInzs1eOPmbr4s3bLk6KJY5fxxgswE563Pz4g5UZXC9Nqs6UX
    x3e1I6Rps1iamMlBEd4A66BFOnwABBOf+0PbDqhQXrfsZDZXSPe7Gxcoondykbyb
    KwIDAQAB
    -----END PUBLIC KEY-----`),
    GLOBAL_SERVICE: {
      HOST: JSON.stringify('http://www.qianyin925.com:4000'),
      GRAPHQL_URL: JSON.stringify('/graphql'),
    },
  },

  // 开发环境配置
  development: {
    _DEV_: true,
    PUBLICKEY: JSON.stringify(`-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoWATfIA97hbj8rbtZBPo
    T+gR7iK5IV1weysfOSJcE1CoqJt9bePHkQeBLj1cWbM9m5wvkB2WQN3YCKDHzqVd
    9pQ6AHOkx7cCxMrjBm8QEV7ACU+NN/2MBRmOHiuRq+PdDfV+V6b/RYCn8hMmVkTU
    SGGyYkSou8bigBkCwv56x7I0AkdSkCQ1oYgWqfbW9Ms6QTIxmeCO2sI4mr/ABYDi
    oVHY0hIBM9nR8Dcb4u/faXRh2nwhBgpSm09CXaKzFv2WmYxWgul3i6zlzAhziO6s
    ogueSeM9qOIZhWn2uAd8pHsK3KHUA91EPphQvR+ReFJV6J1t5a7Cy5+I9sz62jIz
    JwIDAQAB
    -----END PUBLIC KEY-----`),
    GLOBAL_SERVICE: {
      HOST: JSON.stringify('http://localhost:4000'),
      GRAPHQL_URL: JSON.stringify('/graphql'),
    },
  },
}
