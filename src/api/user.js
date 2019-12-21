import axios from '@utils/request';
import { rsa } from '@utils';

export const login = async ({
  account,
  password,
}) => {
  const res = await axios({
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: {
        account,
        password: password ? rsa(password) : void 0,
      },
      query: `
        mutation(
          $account: String,
          $password: String,
        ){
          login(
            account: $account,
            password: $password,
          ){
            user {
              id
              sex
              name
              status
              account
              role { id desc auth name }
            }
            rescode
            message
          }
        }`,
    },
  });
  return res.data.data.login;
};

export const logout = async () => {};
