import { applyMiddleware } from 'redux';

// 1. 日志插件
import logger from 'redux-logger';

export default applyMiddleware(
  logger
);
