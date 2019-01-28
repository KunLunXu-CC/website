import axios from 'axios';
export * from './tag';

export default axios.create({
  headers: {'Content-Type':' application/json'},
  baseURL: 'http://localhost:4000',
  timeout: 1000,
});
