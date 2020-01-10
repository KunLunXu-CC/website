import axios from '@utils/request';

export const login = async ({
  spin,
  account,
  password,
}) => {
  const res = await axios({
    spin,
    url: GLOBAL_SERVICE.GRAPHQL_URL,
    method: 'post',
    data: {
      variables: { account, password },
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
            message
          }
        }`,
    },
  });
  return res.data.data.login;
};

export const logout = async () => {};
