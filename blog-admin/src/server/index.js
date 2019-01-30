import axios from 'axios';
export * from './tag';

export default axios.create({
  headers: {'Content-Type':' application/json'},
  baseURL: GLOBAL_BLOG_SERVER,
  timeout: 1000,
});
