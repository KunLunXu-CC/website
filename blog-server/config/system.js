/* 系统配置 */
const setting = {
  development: {                      // 开发阶段环境配置
    port: 4000,                       // 系统应用端口
    mongo: {                          // mongo 配置
      debug: true,                    // 是否启用 debug
      port: 27017,                    // 端口号
      host: '127.0.0.1',              // 主机
      database: 'blog',               // 数据库名
    }
  },
  production: {}
}
module.exports = setting[(process.env.NODE_ENV || 'development')];