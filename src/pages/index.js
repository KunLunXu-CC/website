export { default as Home } from './Home';
export { default as Login } from './Login';
import { login } from '@api';
import { rsa } from '@utils/encryption';

const account = "admin";
const password = rsa('123456');

login({ account, password }).then(res => {
  console.log('=====================', res);
});
